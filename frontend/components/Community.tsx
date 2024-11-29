"use client";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import {
  ChatBubbleBottomCenterTextIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { useTonWallet } from "@tonconnect/ui-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const Community = () => {
  const { user, posts, upvotePost, downvotePost } =
    useDecentralisedJobMarketplaceContract()!;
  const wallet = useTonWallet();

  if (!posts) {
    return <div>Loading...</div>;
  }

  const handleUpvote = async (postId: bigint) => {
    if (!wallet) {
      toast.error("Connect your wallet to upvote");
      return;
    }
    if (!user) {
      toast.error("Create an account to upvote");
      return;
    }
    await upvotePost(postId);
  };

  const handleDownvote = async (postId: bigint) => {
    if (!wallet) {
      toast.error("Connect your wallet to downvote");
      return;
    }
    if (!user) {
      toast.error("Create an account to downvote");
      return;
    }
    await downvotePost(postId);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Community Posts</h1>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="mb-4 p-4 bg-black/20 rounded-2xl shadow-md shadow-white"
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-xs text-gray-500 mb-2 break-all">
              by {post.author.toString()} at{" "}
              {new Date(Number(post.createdAt) * 1000).toLocaleString()}
            </p>
            <p className="text-sm mb-4 break-words line-clamp-5">
              {post.content}
            </p>
            <div className="grid grid-cols-3 py-1 justify-center items-center border rounded-2xl">
              <button
                onClick={() => handleUpvote(post.id)}
                className="text-white flex gap-4 justify-center items-center border-r"
              >
                <HandThumbUpIcon className="w-6 h-6" />
                {(Number(post.upvotes) ?? 0) - (Number(post.downvotes) ?? 0)}
              </button>
              <button
                onClick={() => handleDownvote(post.id)}
                className="text-white flex flex-col justify-center items-center border-r"
              >
                <HandThumbDownIcon className="w-6 h-6" />
              </button>
              <Link
                href={`/community/${post.id}`}
                className="flex justify-center items-center gap-4 p-2 text-white"
              >
                <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Community;
