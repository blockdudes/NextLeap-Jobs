import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/decentralised_job_marketplace.tact',
    options: {
        debug: true,
    },
};
