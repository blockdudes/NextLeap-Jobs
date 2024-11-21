import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, toNano } from '@ton/core';
import { DecentralisedJobMarketplace } from '../wrappers/DecentralisedJobMarketplace';
import '@ton/test-utils';
import { NftCollection } from '../wrappers/NftCollection';
import { NftItem } from '../build/NftCollection/tact_NftItem';

describe('DecentralisedJobMarketplace', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nftCollection: SandboxContract<NftCollection>;
    let decentralisedJobMarketplace: SandboxContract<DecentralisedJobMarketplace>;

    const OFFCHAIN_CONTENT_PREFIX = 0x01;
    const CONTENT_URL = 'https://dummyjson.com/c/c39a-415f-4fdb-a403'; // Replace with your actual content URL

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');

        const contentCell = beginCell().storeUint(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(CONTENT_URL).endCell();
        nftCollection = blockchain.openContract(await NftCollection.fromInit(deployer.address, contentCell));
        const deployNFTResult = await nftCollection.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );
        expect(deployNFTResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftCollection.address,
            deploy: true,
            success: true,
        });

        decentralisedJobMarketplace = blockchain.openContract(
            await DecentralisedJobMarketplace.fromInit(nftCollection.address),
        );

        const deployDJMResult = await decentralisedJobMarketplace.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployDJMResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: decentralisedJobMarketplace.address,
            deploy: true,
            success: true,
        });
    });

    const createJob = async (employer: SandboxContract<TreasuryContract>) => {
        const jobsBefore = await decentralisedJobMarketplace.getJobs();
        const createJobResult = await decentralisedJobMarketplace.send(
            employer.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'CreateJob',
                title: 'Job 1',
                description: 'Job 1 Description',
                compensation: toNano('1'),
            },
        );
        expect(createJobResult.transactions).toHaveTransaction({
            from: employer.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const jobsAfter = await decentralisedJobMarketplace.getJobs();
        expect(jobsAfter.size - jobsBefore.size).toBe(1);
        const job = jobsAfter.get(BigInt(jobsAfter.size) - 1n);
        expect(job!!.title).toBe('Job 1');
        expect(job!!.description).toBe('Job 1 Description');
        expect(job!!.compensation).toBe(toNano('1'));
    };

    it('should create a new job', async () => {
        const employer = await blockchain.treasury('employer');
        await createJob(employer);
    });

    const applyForJob = async (jobId: bigint, worker: SandboxContract<TreasuryContract>) => {
        const jobBefore = await decentralisedJobMarketplace.getJob(jobId);
        const applyForJobResult = await decentralisedJobMarketplace.send(
            worker.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'ApplyForJob',
                job_id: jobId,
            },
        );
        expect(applyForJobResult.transactions).toHaveTransaction({
            from: worker.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const jobAfter = await decentralisedJobMarketplace.getJob(jobId);
        expect(jobAfter!!.applicants.size - jobBefore!!.applicants.size).toBe(1);
        expect(jobAfter!!.applicants.values().find((applicant) => applicant.equals(worker.address))).toBeTruthy();
    };

    it('should let applicants apply for a job', async () => {
        const employer = await blockchain.treasury('employer');
        await createJob(employer);
        const worker = await blockchain.treasury('worker');
        await applyForJob(0n, worker);
    });

    const acceptApplicant = async (employer: SandboxContract<TreasuryContract>, jobId: bigint, applicant: Address) => {
        const acceptApplicantResult = await decentralisedJobMarketplace.send(
            employer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'AcceptApplicant',
                job_id: jobId,
                applicant: applicant,
            },
        );

        expect(acceptApplicantResult.transactions).toHaveTransaction({
            from: employer.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const job = await decentralisedJobMarketplace.getJob(jobId);
        expect(job!.worker!.equals(applicant)).toBeTruthy();
    };

    it('should let the employer accept an applicant', async () => {
        const employer = await blockchain.treasury('employer');
        await createJob(employer);
        const worker1 = await blockchain.treasury('worker:1');
        await applyForJob(0n, worker1);
        const worker2 = await blockchain.treasury('worker:2');
        await applyForJob(0n, worker2);
        const worker3 = await blockchain.treasury('worker:3');
        await applyForJob(0n, worker3);
        await acceptApplicant(employer, 0n, worker2.address);
    });

    const completeJob = async (worker: SandboxContract<TreasuryContract>, jobId: bigint) => {
        const completeJobResult = await decentralisedJobMarketplace.send(
            worker.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'CompleteJob',
                job_id: jobId,
                employer_rating: 5n,
                employer_review: 'Good employer',
            },
        );
        expect(completeJobResult.transactions).toHaveTransaction({
            from: worker.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const job = await decentralisedJobMarketplace.getJob(jobId);
        expect(Number(job!.completedAt)).toBeCloseTo(Math.floor(Date.now() / 1000));
    };

    it('should let the worker complete a job', async () => {
        const employer = await blockchain.treasury('employer');
        await createJob(employer);
        const worker = await blockchain.treasury('worker');
        await applyForJob(0n, worker);
        await acceptApplicant(employer, 0n, worker.address);
        await completeJob(worker, 0n);
    });

    const markJobComplete = async (employer: SandboxContract<TreasuryContract>, jobId: bigint) => {
        const completeJobResult = await decentralisedJobMarketplace.send(
            employer.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'MarkJobCompleted',
                job_id: jobId,
                worker_rating: 5n,
                worker_review: 'Good worker',
                nft_metadata: beginCell().endCell(),
            },
        );
        expect(completeJobResult.transactions).toHaveTransaction({
            from: employer.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const job = await decentralisedJobMarketplace.getJob(jobId);
        expect(job!.isCompleted).toBeTruthy();
    };

    it('should let the employer mark a job as completed', async () => {
        const employer = await blockchain.treasury('employer');
        await createJob(employer);
        const worker = await blockchain.treasury('worker');
        await applyForJob(0n, worker);
        await acceptApplicant(employer, 0n, worker.address);
        await completeJob(worker, 0n);
        const workerBalanceBefore = await worker.getBalance();
        await markJobComplete(employer, 0n);
        const workerBalanceAfter = await worker.getBalance();
        expect(workerBalanceAfter).toBeGreaterThan(workerBalanceBefore);
    });

    it('should mint an SBT to the worker upon job completion', async () => {
        const employer = await blockchain.treasury('employer');
        await createJob(employer);
        const worker = await blockchain.treasury('worker');
        await applyForJob(0n, worker);
        await acceptApplicant(employer, 0n, worker.address);
        await completeJob(worker, 0n);
        await markJobComplete(employer, 0n);
        const nftCollectionAddress = await decentralisedJobMarketplace.getNftCollection();
        expect(nftCollectionAddress).toEqualAddress(nftCollection.address);
        const nftAddress = await nftCollection.getNftAddressByIndex(0n);
        expect(nftAddress).not.toBeNull();
    });

    const createPost = async (author: SandboxContract<TreasuryContract>) => {
        const postsBefore = await decentralisedJobMarketplace.getPosts();
        const createPostResult = await decentralisedJobMarketplace.send(
            author.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'CreatePost',
                title: 'Post 1',
                content: 'Post 1 Content',
            },
        );
        expect(createPostResult.transactions).toHaveTransaction({
            from: author.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const postsAfter = await decentralisedJobMarketplace.getPosts();
        expect(postsAfter.size - postsBefore.size).toBe(1);
        const post = postsAfter.get(BigInt(postsAfter.size) - 1n);
        expect(post!!.title).toBe('Post 1');
        expect(post!!.content).toBe('Post 1 Content');
    };

    it('should let users create posts', async () => {
        const author = await blockchain.treasury('author');
        await createPost(author);
    });

    const upvotePost = async (postId: bigint, voter: SandboxContract<TreasuryContract>) => {
        const postBefore = await decentralisedJobMarketplace.getPost(postId);
        const upvotePostResult = await decentralisedJobMarketplace.send(
            voter.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'UpvotePost',
                post_id: postId,
            },
        );
        expect(upvotePostResult.transactions).toHaveTransaction({
            from: voter.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const postAfter = await decentralisedJobMarketplace.getPost(postId);
        expect(postAfter!!.upvotes - postBefore!!.upvotes).toBe(1n);
    };

    const downvotePost = async (postId: bigint, voter: SandboxContract<TreasuryContract>) => {
        const postBefore = await decentralisedJobMarketplace.getPost(postId);
        const downvotePostResult = await decentralisedJobMarketplace.send(
            voter.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'DownvotePost',
                post_id: postId,
            },
        );
        expect(downvotePostResult.transactions).toHaveTransaction({
            from: voter.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const postAfter = await decentralisedJobMarketplace.getPost(postId);
        expect(postAfter!!.downvotes - postBefore!!.downvotes).toBe(1n);
    };

    it('should let users vote on posts', async () => {
        const author = await blockchain.treasury('author');
        await createPost(author);
        const voter1 = await blockchain.treasury('voter:1');
        await upvotePost(0n, voter1);
        const voter2 = await blockchain.treasury('voter:2');
        await downvotePost(0n, voter2);
    });

    const createComment = async (postId: bigint, author: SandboxContract<TreasuryContract>) => {
        const postBefore = await decentralisedJobMarketplace.getPost(postId);
        const createCommentResult = await decentralisedJobMarketplace.send(
            author.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'CreateComment',
                post_id: postId,
                content: 'Comment 1 Content',
            },
        );
        expect(createCommentResult.transactions).toHaveTransaction({
            from: author.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const postAfter = await decentralisedJobMarketplace.getPost(postId);
        expect(postAfter!!.comments.size - postBefore!!.comments.size).toBe(1);
    };

    it('should let users comment on posts', async () => {
        const author = await blockchain.treasury('author');
        await createPost(author);
        const commenter = await blockchain.treasury('commenter');
        await createComment(0n, commenter);
    });

    const upvoteComment = async (postId: bigint, commentId: bigint, voter: SandboxContract<TreasuryContract>) => {
        const postBefore = await decentralisedJobMarketplace.getPost(postId);
        const commentBefore = postBefore!!.comments.get(commentId);
        const upvoteCommentResult = await decentralisedJobMarketplace.send(
            voter.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'UpvoteComment',
                post_id: postId,
                comment_id: commentId,
            },
        );
        expect(upvoteCommentResult.transactions).toHaveTransaction({
            from: voter.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const postAfter = await decentralisedJobMarketplace.getPost(postId);
        const commentAfter = postAfter!!.comments.get(commentId);
        expect(commentAfter!!.upvotes - commentBefore!!.upvotes).toBe(1n);
    };

    const downvoteComment = async (postId: bigint, commentId: bigint, voter: SandboxContract<TreasuryContract>) => {
        const postBefore = await decentralisedJobMarketplace.getPost(postId);
        const commentBefore = postBefore!!.comments.get(commentId);
        const downvoteCommentResult = await decentralisedJobMarketplace.send(
            voter.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'DownvoteComment',
                post_id: postId,
                comment_id: commentId,
            },
        );
        expect(downvoteCommentResult.transactions).toHaveTransaction({
            from: voter.address,
            to: decentralisedJobMarketplace.address,
            success: true,
        });
        const postAfter = await decentralisedJobMarketplace.getPost(postId);
        const commentAfter = postAfter!!.comments.get(commentId);
        expect(commentAfter!!.downvotes - commentBefore!!.downvotes).toBe(1n);
    };

    it('should let users vote on comments', async () => {
        const author = await blockchain.treasury('author');
        await createPost(author);
        const commenter = await blockchain.treasury('commenter');
        await createComment(0n, commenter);
        const voter1 = await blockchain.treasury('voter:1');
        await upvoteComment(0n, 0n, voter1);
        const voter2 = await blockchain.treasury('voter:2');
        await downvoteComment(0n, 0n, voter2);
    });
});
