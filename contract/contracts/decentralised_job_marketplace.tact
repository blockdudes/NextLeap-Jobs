import "@stdlib/deploy";
import "./message.tact";

contract DecentralisedJobMarketplace with Deployable {
    // Mapping of job IDs to job details
    jobs: map<Int, Job>;
    jobCounter: Int;

    // Mapping of post IDs to post details
    posts: map<Int, Post>;
    postCounter: Int;

    // Address of the NFT collection
    nftCollection: Address;

    // Mapping to track reputation
    reputation: map<Address, Reputation>;

    init(nftCollection: Address){
        self.jobCounter = 0;
        self.postCounter = 0;
        self.nftCollection = nftCollection;
    }

    receive(msg: CreateJob){
        require(msg.title != "", "Title cannot be empty");
        require(msg.description != "", "Description cannot be empty");
        require(context().value == msg.compensation, "Incorrect value sent");
        
        let employer = context().sender;
        let jobId = self.jobCounter;
        self.jobCounter = self.jobCounter + 1;
        self.jobs.set(jobId, 
            Job{
                title: msg.title,
                description: msg.description,
                compensation: msg.compensation,
                employer: employer, 
                isAcceptingApplicants: true, 
                applicants: emptyMap(), 
                numberOfApplicants: 0, 
                createdAt: now(), 
            }
        );
    }

    receive(msg: ApplyForJob){
        let job: Job? = self.jobs.get(msg.job_id);
        require(job != null, "Job does not exist");
        require(job!!.isAcceptingApplicants, "Job is not accepting applicants");
        require(job!!.worker == null, "Job already assigned");

        let applicant = context().sender;
        let updatedApplicants = job!!.applicants;
        updatedApplicants.set(job!!.numberOfApplicants, applicant);
        let updatedJob = Job{
            title: job!!.title,
            description: job!!.description,
            compensation: job!!.compensation,
            employer: job!!.employer,
            worker: job!!.worker,
            isAcceptingApplicants: job!!.isAcceptingApplicants,
            isCompleted: job!!.isCompleted,
            applicants: updatedApplicants,
            numberOfApplicants: job!!.numberOfApplicants + 1,
            createdAt: job!!.createdAt,
            completedAt: job!!.completedAt,
        };
        self.jobs.set(msg.job_id, updatedJob);
    }

    receive(msg: AcceptApplicant){
        let job = self.jobs.get(msg.job_id);
        require(job != null, "Job does not exist");
        require(job!!.employer == context().sender, "Only employer can accept applicant");
        let updatedJob = Job{
            title: job!!.title,
            description: job!!.description,
            compensation: job!!.compensation,
            employer: job!!.employer,
            worker: msg.applicant,
            isAcceptingApplicants: false,
            isCompleted: false,
            applicants: job!!.applicants,
            numberOfApplicants: job!!.numberOfApplicants,
            createdAt: job!!.createdAt,
            completedAt: job!!.completedAt,
        };
        self.jobs.set(msg.job_id, updatedJob);
    }

    receive(msg: CompleteJob){
        let job = self.jobs.get(msg.job_id);
        require(job != null, "Job does not exist");
        require(job!!.worker == context().sender, "Only worker can complete job");
        require(job!!.isCompleted == false, "Job is already completed");

        let updatedJob = Job{
            title: job!!.title,
            description: job!!.description,
            compensation: job!!.compensation,
            employer: job!!.employer,
            worker: job!!.worker,
            isAcceptingApplicants: job!!.isAcceptingApplicants,
            isCompleted: job!!.isCompleted,
            worker_rating: job!!.worker_rating,
            worker_review: job!!.worker_review,
            applicants: job!!.applicants,
            numberOfApplicants: job!!.numberOfApplicants,
            createdAt: job!!.createdAt,
            completedAt: now(),
        };
        self.jobs.set(msg.job_id, updatedJob);
        let reputation = self.reputation.get(job!!.employer);
        if(reputation == null){
            reputation = Reputation{
                ratings: emptyMap(),
                reviews: emptyMap(),
                numberOfRatings: 0,
            };
        }
        let updatedRatings = reputation!!.ratings;
        updatedRatings.set(reputation!!.numberOfRatings, msg.employer_rating);
        let updatedReviews = reputation!!.reviews;
        let reviewBuilder = beginString();
        reviewBuilder.append(msg.employer_review);
        updatedReviews.set(reputation!!.numberOfRatings, reviewBuilder.toCell());
        self.reputation.set(job!!.employer, Reputation{
            ratings: updatedRatings,
            reviews: updatedReviews,
            numberOfRatings: reputation!!.numberOfRatings + 1,
        });
    }

    receive(msg: MarkJobCompleted){
        let job = self.jobs.get(msg.job_id);
        require(job != null, "Job does not exist");
        require(job!!.worker != null, "Job is not assigned");
        require(job!!.employer == context().sender, "Only employer can complete job");
        require(job!!.isAcceptingApplicants == false, "Job is still accepting applicants");
        require(job!!.isCompleted == false, "Job is already completed");
        require(job!!.completedAt != null, "Job is not completed by worker");
        require(msg.worker_rating >= 1 && msg.worker_rating <= 5, "Worker rating must be between 1 and 5");
        let updatedJob = Job{
            title: job!!.title,
            description: job!!.description,
            compensation: job!!.compensation,
            employer: job!!.employer,
            worker: job!!.worker,
            isAcceptingApplicants: job!!.isAcceptingApplicants,
            isCompleted: true,
            worker_rating: msg.worker_rating,
            worker_review: msg.worker_review,
            applicants: job!!.applicants,
            numberOfApplicants: job!!.numberOfApplicants,
            createdAt: job!!.createdAt,
            completedAt: now(),
        };
        self.jobs.set(msg.job_id, updatedJob);
        let reputation = self.reputation.get(job!!.worker!!);
        if(reputation == null){
            reputation = Reputation{
                ratings: emptyMap(),
                reviews: emptyMap(),
                numberOfRatings: 0,
            };
        }
        let updatedRatings = reputation!!.ratings;
        updatedRatings.set(reputation!!.numberOfRatings, msg.worker_rating);
        let updatedReviews = reputation!!.reviews;
        let reviewBuilder = beginString();
        reviewBuilder.append(msg.worker_review);
        updatedReviews.set(reputation!!.numberOfRatings, reviewBuilder.toCell());
        self.reputation.set(job!!.worker!!, Reputation{
            ratings: updatedRatings,
            reviews: updatedReviews,
            numberOfRatings: reputation!!.numberOfRatings + 1,
        });

        send(SendParameters{
            to: self.nftCollection,
            value: ton("0.05"),
            mode: 0,
            body: Mint{
                recipient: job!!.worker!!,
                individual_content: msg.nft_metadata,
            }.toCell(),
        });

        if(job!!.compensation != null && job!!.compensation!! > 0){
            send(SendParameters{
                to: job!!.worker!!,
                value: job!!.compensation!!,
                mode: 0,
            });
        }
    }

    receive(msg: CreatePost){
        let postId = self.postCounter;
        self.postCounter = self.postCounter + 1;
        self.posts.set(postId, Post{
            id: postId,
            title: msg.title,
            content: msg.content,
            comments: emptyMap(),
            numberOfComments: 0,
            upvotes: 0,
            downvotes: 0,
            author: context().sender,
            createdAt: now(),
        });
    }

    receive(msg: CreateComment){
        let post = self.posts.get(msg.post_id);
        require(post != null, "Post does not exist");
        let commentId = post!!.numberOfComments;
        let updatedComments = post!!.comments;
        updatedComments.set(commentId, Comment{
            author: context().sender,
            content: msg.content,
            upvotes: 0,
            downvotes: 0,
        });
        self.posts.set(msg.post_id, Post{
            id: post!!.id,
            title: post!!.title,
            content: post!!.content,
            author: post!!.author,
            comments: updatedComments,
            numberOfComments: post!!.numberOfComments + 1,
            upvotes: post!!.upvotes,
            downvotes: post!!.downvotes,
            createdAt: post!!.createdAt,
        });
    }

    receive(msg: UpvotePost){
        let post = self.posts.get(msg.post_id);
        require(post != null, "Post does not exist");
        let updatedPost = Post{
            id: post!!.id,
            title: post!!.title,
            content: post!!.content,
            author: post!!.author,
            comments: post!!.comments,
            numberOfComments: post!!.numberOfComments,
            upvotes: post!!.upvotes + 1,
            downvotes: post!!.downvotes,
            createdAt: post!!.createdAt,
        };
        self.posts.set(msg.post_id, updatedPost);
    }

    receive(msg: DownvotePost){
        let post = self.posts.get(msg.post_id);
        require(post != null, "Post does not exist");
        let updatedPost = Post{
            id: post!!.id,
            title: post!!.title,
            content: post!!.content,
            author: post!!.author,
            comments: post!!.comments,
            numberOfComments: post!!.numberOfComments,
            upvotes: post!!.upvotes,
            downvotes: post!!.downvotes + 1,
            createdAt: post!!.createdAt,
        };
        self.posts.set(msg.post_id, updatedPost);
    }

    receive(msg: ArchivePost){
        let post = self.posts.get(msg.post_id);
        require(post != null, "Post does not exist");
        let updatedPost = Post{
            id: post!!.id,
            title: post!!.title,
            content: post!!.content,
            author: post!!.author,
            comments: post!!.comments,
            numberOfComments: post!!.numberOfComments,
            upvotes: post!!.upvotes,
            downvotes: post!!.downvotes,
            createdAt: post!!.createdAt,
            archivedAt: now(),
        };
        self.posts.set(msg.post_id, updatedPost);
    }

    receive(msg: UpvoteComment){
        let post = self.posts.get(msg.post_id);
        require(post != null, "Post does not exist");
        let comment = post!!.comments.get(msg.comment_id);
        require(comment != null, "Comment does not exist");
        let updatedComment = Comment{
            author: comment!!.author,
            content: comment!!.content,
            upvotes: comment!!.upvotes + 1,
            downvotes: comment!!.downvotes,
        };
        let updatedComments = post!!.comments;
        updatedComments.set(msg.comment_id, updatedComment);
        self.posts.set(msg.post_id, Post{
            id: post!!.id,
            title: post!!.title,
            content: post!!.content,
            author: post!!.author,
            comments: updatedComments,
            numberOfComments: post!!.numberOfComments,
            upvotes: post!!.upvotes,
            downvotes: post!!.downvotes,
            createdAt: post!!.createdAt,
        });
    }

    receive(msg: DownvoteComment){
        let post = self.posts.get(msg.post_id);
        require(post != null, "Post does not exist");
        let comment = post!!.comments.get(msg.comment_id);
        require(comment != null, "Comment does not exist");
        let updatedComment = Comment{
            author: comment!!.author,
            content: comment!!.content,
            upvotes: comment!!.upvotes,
            downvotes: comment!!.downvotes + 1,
        };
        let updatedComments = post!!.comments;
        updatedComments.set(msg.comment_id, updatedComment);
        self.posts.set(msg.post_id, Post{
            id: post!!.id,
            title: post!!.title,
            content: post!!.content,
            author: post!!.author,
            comments: updatedComments,
            numberOfComments: post!!.numberOfComments,
            upvotes: post!!.upvotes,
            downvotes: post!!.downvotes,
            createdAt: post!!.createdAt,
        });
    }

    get fun nftCollection(): Address {
        return self.nftCollection;
    }

    get fun jobs(): map<Int, Job> {
        return self.jobs;
    }

    get fun job_count(): Int {
        return self.jobCounter;
    }

    get fun job(job_id: Int): Job? {
        return self.jobs.get(job_id);
    }

    get fun reputation(worker: Address): Reputation {
        let workerReputation = self.reputation.get(worker);
        if(workerReputation == null){
            workerReputation = Reputation{
                ratings: emptyMap(),
                reviews: emptyMap(),
                numberOfRatings: 0,
            };
        }
        return workerReputation!!;
    }

    get fun posts(): map<Int, Post> {
        return self.posts;
    }

    get fun post_count(): Int {
        return self.postCounter;
    }

    get fun post(post_id: Int): Post? {
        return self.posts.get(post_id);
    }
}
