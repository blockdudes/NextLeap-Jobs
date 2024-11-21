import { Address, beginCell, Cell, toNano } from '@ton/core';
import { NftCollection } from '../wrappers/NftCollection';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const owner: Address | undefined = provider.sender().address;
    if (!owner) {
        throw new Error('Owner address is undefined');
    }
    const collectionContent: Cell = beginCell()
        .storeUint(0x01, 8)
        .storeStringRefTail('https://dummyjson.com/c/c39a-415f-4fdb-a403')
        .endCell();
    const nftCollection = provider.open(await NftCollection.fromInit(owner, collectionContent));

    await nftCollection.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        },
    );

    await provider.waitForDeploy(nftCollection.address);

    // run methods on `nftCollection`
}
