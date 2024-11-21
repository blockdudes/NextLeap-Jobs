import { address, Address, toNano } from '@ton/core';
import { DecentralisedJobMarketplace } from '../wrappers/DecentralisedJobMarketplace';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const nftCollection: Address = address('EQDOmi6Uj8Cmi_ztvcRUFsux5F9SPqh52gG05woVVm3dBYbb');
    const decentralisedJobMarketplace = provider.open(await DecentralisedJobMarketplace.fromInit(nftCollection));

    await decentralisedJobMarketplace.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(decentralisedJobMarketplace.address);

    // run methods on `decentralisedJobMarketplace`
}
