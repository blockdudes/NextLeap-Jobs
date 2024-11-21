import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano, beginCell } from '@ton/core';
import { NftCollection } from '../wrappers/NftCollection';
import '@ton/test-utils';
import { NftItem } from '../build/NftCollection/tact_NftItem';

declare global {
    interface BigInt {
        toJSON(): Number;
    }
}

BigInt.prototype.toJSON = function () {
    return Number(this);
};

describe('NftCollection', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nftCollection: SandboxContract<NftCollection>;
    let owner: SandboxContract<TreasuryContract>;
    const NFT_PRICE = toNano('0.5');
    const OFFCHAIN_CONTENT_PREFIX = 0x01;
    const CONTENT_URL = 'https://dummyjson.com/c/c39a-415f-4fdb-a403'; // Replace with your actual content URL
    const INDIVIDUAL_CONTENT_URL = 'https://dummyjson.com/c/7595-c396-4602-80d7'; // Replace with your actual content URL

    beforeEach(async () => {
        // Initialize the blockchain and treasury accounts
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        owner = await blockchain.treasury('owner');

        // Prepare the content cell
        const contentCell = beginCell().storeUint(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(CONTENT_URL).endCell();
        const individualContentCell = beginCell()
            .storeUint(OFFCHAIN_CONTENT_PREFIX, 8)
            .storeStringRefTail(INDIVIDUAL_CONTENT_URL)
            .endCell();

        // Initialize the NftCollection contract with the owner, content cell, and NFT price
        nftCollection = blockchain.openContract(await NftCollection.fromInit(deployer.address, contentCell));

        const deployResult = await nftCollection.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftCollection.address,
            deploy: true,
            success: true,
        });

        await nftCollection.send(
            owner.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'Mint',
                recipient: owner.address,
                individual_content: individualContentCell,
            },
        );
    });

    it('should deploy and mint the first NFT upon the first Mint message', async () => {
        // Verify the state after deployment and initial mint
        const collectionData = await nftCollection.getCollectionData();
        expect(collectionData.next_item_index).toEqual(1n); // Should be 1 after minting the first NFT
    });

    it('should return correct collection data', async () => {
        const collectionData = await nftCollection.getCollectionData();

        expect(collectionData.owner_address.toString()).toEqual(deployer.address.toString());
        expect(collectionData.next_item_index).toEqual(1n); // After the initial mint
        expect(collectionData.collection_content).toBeDefined();
    });

    it('should increment next_item_index after each mint', async () => {
        const individualContentCell = beginCell()
            .storeUint(OFFCHAIN_CONTENT_PREFIX, 8)
            .storeStringRefTail(INDIVIDUAL_CONTENT_URL)
            .endCell();

        // Mint second NFT
        await nftCollection.send(
            owner.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'Mint',
                recipient: owner.address,
                individual_content: individualContentCell,
            },
        );

        let collectionData = await nftCollection.getCollectionData();
        expect(collectionData.next_item_index).toEqual(2n);

        // Mint third NFT
        await nftCollection.send(
            owner.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'Mint',
                recipient: owner.address,
                individual_content: individualContentCell,
            },
        );

        collectionData = await nftCollection.getCollectionData();
        expect(collectionData.next_item_index).toEqual(3n);
    });

    it('should not allow transferring SBT (Soulbound Token)', async () => {
        // Assuming the first NFT has already been minted in beforeEach

        // Get the NFT address by index
        const nftAddress = await nftCollection.getNftAddressByIndex(0n);
        console.log('nftAddress', nftAddress);
        expect(nftAddress).not.toBeNull();

        if (nftAddress === null) {
            throw new Error('NFT address is null');
        }

        const nftItem = blockchain.openContract(NftItem.fromAddress(nftAddress));

        const transferResult = await nftItem.send(
            owner.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'Transfer',
                query_id: 0n,
                new_owner: owner.address,
                custom_payload: null,
                forward_amount: 0n,
                forward_payload: beginCell().endCell().beginParse(),
            },
        );

        expect(transferResult.transactions).toHaveTransaction({
            from: owner.address,
            to: nftAddress,
            success: false,
        });
    });

    afterEach(async () => {
        const nftCollectionBalance = (await blockchain.getContract(nftCollection.address)).balance;
        const nftItemAddress = await nftCollection.getNftAddressByIndex(0n);
        if (nftItemAddress === null) {
            throw new Error('NFT item address is null');
        }
        const nftItemBalance = (await blockchain.getContract(nftItemAddress)).balance;
        expect(nftCollectionBalance).toBeLessThanOrEqual(toNano('1'));
        expect(nftItemBalance).toBeLessThanOrEqual(toNano('0.5'));
    });
});
