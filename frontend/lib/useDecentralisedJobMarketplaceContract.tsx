"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import DecentralisedJobMarketplace, {
  Job,
  Post,
  User,
} from "../contracts/DecentralisedJobMarketplace";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { Address, beginCell, Cell, Dictionary, toNano } from "@ton/core";
import { useTonWallet } from "@tonconnect/ui-react";

type DecentralisedJobMarketplaceContextType = {
  jobs: Job[] | null;
  posts: Post[] | null;
  user: User | null;
  getUser: (userAddress: Address) => Promise<User | undefined>;
  createUser: (
    name: string,
    email: string,
    skills: string[],
    isEmployer: boolean
  ) => Promise<void>;
  updateUserRole: (isEmployer: boolean) => Promise<void>;
  updateUserSkills: (skills: string[]) => Promise<void>;
  applyForJob: (id: string) => Promise<void>;
  completeJob: (
    id: string,
    employerRating: number,
    employerReview: string
  ) => Promise<void>;
  shortlistApplicant: (jobId: string, address: Address) => Promise<void>;
  markJobAsCompleted: (
    jobId: string,
    workerRating: number,
    workerReview: string,
    nftMetadata: Cell
  ) => Promise<void>;
  createJob: (jobData: {
    title: string;
    description: string;
    compensation: number;
    skills: string[];
  }) => Promise<void>;
  createPost: (title: string, content: string) => Promise<void>;
  upvotePost: (postId: bigint) => Promise<void>;
  downvotePost: (postId: bigint) => Promise<void>;
  commentOnPost: (postId: bigint, content: string) => Promise<void>;
  upvoteComment: (postId: bigint, commentId: bigint) => Promise<void>;
  downvoteComment: (postId: bigint, commentId: bigint) => Promise<void>;
};

const DecentralisedJobMarketplaceContext =
  createContext<DecentralisedJobMarketplaceContextType | null>(null);

export const DecentralisedJobMarketplaceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const client = useTonClient();
  const decentralisedJobMarketplaceContract = client.open(
    new DecentralisedJobMarketplace(
      Address.parse("EQB3BeXZ3o2GxNt5GP_f6zLMVd3fvFKBcIl88PNDs7bkoQ7t")
    )
  );
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<null | Job[]>(null);
  const [posts, setPosts] = useState<null | Post[]>(null);
  const tonConnect = useTonConnect();
  const wallet = useTonWallet();

  const getUser = async (): Promise<void> => {
    if (user) {
      console.log("user already exists");
      return;
    }
    if (!wallet) {
      console.log("wallet not initialized");
      return;
    }

    const _user = await decentralisedJobMarketplaceContract.getUser(
      Address.parse(wallet.account.address)
    );
    console.log("_user", _user);
    if (_user.name === "" && _user.email === "") {
      setUser(null);
    } else {
      setUser(_user);
    }
  };

  const getJobs = async () => {
    const _jobs = await decentralisedJobMarketplaceContract.getJobs();
    console.log("jobs", _jobs.values());
    setJobs(_jobs.values());
  };

  const getPosts = async () => {
    const posts = await decentralisedJobMarketplaceContract.getPosts();
    console.log("posts", posts.values());
    setPosts(posts.values());
  };

  useEffect(() => {
    if (user) return;
    getUser();
  }, [wallet, user]);

  useEffect(() => {
    getJobs();
    getPosts();
  }, []);

  return (
    <DecentralisedJobMarketplaceContext.Provider
      value={{
        jobs,
        posts,
        user,
        getUser: (userAddress: Address) => {
          return decentralisedJobMarketplaceContract.getUser(userAddress);
        },
        createUser: (
          name: string,
          email: string,
          skills: string[],
          isEmployer: boolean
        ) => {
          if (!wallet) throw new Error("Sender not initialized");

          const skillsCellDictionary = Dictionary.empty<bigint, Cell>();
          skills.forEach((skill, index) => {
            let cell = beginCell()
              .storeUint(0x01, 8)
              .storeStringRefTail(skill)
              .endCell();
            skillsCellDictionary.set(BigInt(index), cell);
          });

          return decentralisedJobMarketplaceContract?.send(
            tonConnect.sender,
            {
              value: toNano(0.05),
            },
            {
              $$type: "CreateUser",
              name,
              email,
              skills: skillsCellDictionary,
              isEmployer,
              address: Address.parse(wallet.account.address),
            }
          );
        },
        updateUserRole: (isEmployer: boolean) => {
          if (!wallet) throw new Error("Sender not initialized");

          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            {
              value: toNano(0.05),
            },
            {
              $$type: "UpdateUserRole",
              isEmployer,
              address: Address.parse(wallet.account.address),
            }
          );
        },
        updateUserSkills: (skills: string[]) => {
          if (!wallet) throw new Error("Sender not initialized");

          const skillsCellDictionary = Dictionary.empty<bigint, Cell>();
          skills.forEach((skill, index) => {
            let cell = beginCell()
              .storeUint(0x01, 8)
              .storeStringRefTail(skill)
              .endCell();
            skillsCellDictionary.set(BigInt(index), cell);
          });

          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            {
              value: toNano(0.05),
            },
            {
              $$type: "UpdateUserSkills",
              skills: skillsCellDictionary,
              address: Address.parse(wallet.account.address),
            }
          );
        },
        applyForJob: (id: string) => {
          console.log("id", id);
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            {
              value: toNano(0.05),
            },
            {
              $$type: "ApplyForJob",
              job_id: BigInt(Number(id)),
            }
          );
        },
        completeJob: (
          id: string,
          employerRating: number,
          employerReview: string
        ) => {
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            {
              value: toNano(0.05),
            },
            {
              $$type: "CompleteJob",
              job_id: BigInt(Number(id)),
              employer_rating: BigInt(employerRating),
              employer_review: employerReview,
            }
          );
        },
        shortlistApplicant: (jobId: string, applicantAddress: Address) => {
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            {
              value: toNano(0.05),
            },
            {
              $$type: "AcceptApplicant",
              job_id: BigInt(Number(jobId)),
              applicant: applicantAddress,
            }
          );
        },
        markJobAsCompleted: (
          jobId: string,
          workerRating: number,
          workerReview: string,
          nftMetadata: Cell
        ) => {
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            {
              value: toNano(0.05),
            },
            {
              $$type: "MarkJobCompleted",
              job_id: BigInt(Number(jobId)),
              worker_rating: BigInt(workerRating),
              worker_review: workerReview,
              nft_metadata: nftMetadata,
            }
          );
        },
        createJob: ({
          title,
          description,
          compensation,
          skills,
        }: {
          title: string;
          description: string;
          compensation: number;
          skills: string[];
        }) => {
          const skillsCellDictionary = Dictionary.empty<bigint, Cell>();
          skills.forEach((skill, index) => {
            let cell = beginCell()
              .storeUint(BigInt(index.toString(16)), 8)
              .storeStringRefTail(skill)
              .endCell();
            skillsCellDictionary.set(BigInt(index), cell);
          });

          console.log("skillsCellDictionary", skillsCellDictionary);

          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            {
              value: toNano(compensation),
            },
            {
              $$type: "CreateJob",
              title: title,
              description: description,
              compensation: toNano(compensation),
              skills: skillsCellDictionary,
              numberOfSkills: BigInt(skills.length),
            }
          );
        },
        createPost: (title: string, content: string) => {
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            { value: toNano(0.05) },
            { $$type: "CreatePost", title, content }
          );
        },
        upvotePost: (postId: bigint) => {
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            { value: toNano(0.05) },
            { $$type: "UpvotePost", post_id: postId }
          );
        },
        downvotePost: (postId: bigint) => {
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            { value: toNano(0.05) },
            { $$type: "DownvotePost", post_id: postId }
          );
        },
        commentOnPost: (postId: bigint, content: string) => {
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            { value: toNano(0.05) },
            { $$type: "CreateComment", post_id: postId, content }
          );
        },
        upvoteComment: (postId: bigint, commentId: bigint) => {
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            { value: toNano(0.05) },
            { $$type: "UpvoteComment", post_id: postId, comment_id: commentId }
          );
        },
        downvoteComment: (postId: bigint, commentId: bigint) => {
          return decentralisedJobMarketplaceContract.send(
            tonConnect.sender,
            { value: toNano(0.05) },
            {
              $$type: "DownvoteComment",
              post_id: postId,
              comment_id: commentId,
            }
          );
        },
      }}
    >
      {children}
    </DecentralisedJobMarketplaceContext.Provider>
  );
};

// Custom hook to use the context
export const useDecentralisedJobMarketplaceContract = () => {
  return useContext(DecentralisedJobMarketplaceContext);
};
