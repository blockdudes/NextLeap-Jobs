"use client";
import { Comment } from "@/contracts/DecentralisedJobMarketplace";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useTonWallet } from "@tonconnect/ui-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CommunityPost = ({ postId }: { postId: string }) => {
  const {
    user,
    getUser,
    posts,
    upvotePost,
    downvotePost,
    upvoteComment,
    downvoteComment,
    commentOnPost,
  } = useDecentralisedJobMarketplaceContract()!;
  const wallet = useTonWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<
    (Comment & { authorName: string })[]
  >([]);
  const [newComment, setNewComment] = useState("");

  const post = posts
    ? posts.find((post) => Number(post.id) === Number(postId))
    : null;

  const fetchCommentAuthorNames = async () => {
    if (!post) return;

    const commentsWithAuthorNames = await Promise.all(
      post.comments.values().map(async (comment) => {
        return {
          ...comment,
          authorName:
            (await getUser(comment.author))?.name || comment.author.toString(),
        };
      })
    );
    setComments(commentsWithAuthorNames);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCommentAuthorNames();
  }, [post]);

  if (!posts || isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleUpvote = async () => {
    if (!wallet) {
      toast.error("Connect your wallet to upvote");
      return;
    }
    if (!user) {
      toast.error("Create an account to upvote");
      return;
    }
    await upvotePost(BigInt(postId));
  };

  const handleDownvote = async () => {
    if (!wallet) {
      toast.error("Connect your wallet to downvote");
      return;
    }
    if (!user) {
      toast.error("Create an account to downvote");
      return;
    }
    await downvotePost(BigInt(postId));
  };

  const handleUpvoteComment = async (commentId: bigint) => {
    if (!wallet) {
      toast.error("Connect your wallet to upvote");
      return;
    }
    if (!user) {
      toast.error("Create an account to upvote");
      return;
    }
    await upvoteComment(BigInt(postId), commentId);
  };

  const handleDownvoteComment = async (commentId: bigint) => {
    if (!wallet) {
      toast.error("Connect your wallet to downvote");
      return;
    }
    if (!user) {
      toast.error("Create an account to downvote");
      return;
    }
    await downvoteComment(BigInt(postId), commentId);
  };

  const handleComment = async () => {
    if (!wallet) {
      toast.error("Connect your wallet to comment");
      return;
    }
    if (!user) {
      toast.error("Create an account to comment");
      return;
    }
    await commentOnPost(BigInt(postId), newComment);
  };

  return (
    <div className="relative">
      <h1 className="text-xl font-bold break-words">{post.title}</h1>
      <p className="text-xs text-gray-500 mb-4 break-all">
        by {post.author.toString()} at{" "}
        {new Date(Number(post.createdAt) * 1000).toLocaleString()}
      </p>
      <p
        className="text-sm mb-4 break-words"
        dangerouslySetInnerHTML={{
          __html: post.content.replaceAll("\n", "<br/><br/>"),
        }}
      />
      <div className="flex justify-around items-center border-t border-b border-gray-200 py-4">
        <div className="w-full grid grid-cols-2 justify-center items-center border rounded-2xl py-2">
          <button
            onClick={handleUpvote}
            className="text-white flex justify-center items-center gap-4 border-r"
          >
            <HandThumbUpIcon className="w-6 h-6" />{" "}
            {(Number(post.upvotes) ?? 0) - (Number(post.downvotes) ?? 0)}
          </button>
          <button
            onClick={handleDownvote}
            className="text-white flex justify-center items-center"
          >
            <HandThumbDownIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4 pb-16">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-2 border rounded shadow"
            >
              <h1 className="text-lg font-semibold">{comment.authorName}</h1>
              <Link
                href={`/profile/${comment.author}`}
                className="text-xs font-semibold break-all text-blue-500"
              >
                {comment.author.toString()}
              </Link>
              <p className="text-sm">{comment.content}</p>
              <div className="flex justify-around items-center p-2">
                <div className="w-full grid grid-cols-2 justify-center items-center border rounded-2xl py-2">
                  <button
                    onClick={() => handleUpvoteComment(comment.id)}
                    className="text-white flex justify-center items-center gap-4 border-r"
                  >
                    <HandThumbUpIcon className="w-6 h-6" />{" "}
                    {(Number(comment.upvotes) ?? 0) - (Number(comment.downvotes) ?? 0)}
                  </button>
                  <button
                    onClick={() => handleDownvoteComment(comment.id)}
                    className="text-white flex justify-center items-center"
                  >
                    <HandThumbDownIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-20 flex justify-center items-center text-center text-gray-500">
            Be the first to comment!
          </div>
        )}
      </div>
      <div className="max-w-[450px] mx-auto fixed bottom-0 left-0 right-0 p-4 pb-20 backdrop-blur-sm">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border rounded-xl p-2 pr-10 text-black"
            rows={1}
            placeholder="Add a comment..."
          />
          <button
            className="absolute z-10 right-2 top-1/2 -translate-y-2/3 -rotate-[25deg]"
            onClick={handleComment}
          >
            <PaperAirplaneIcon className="w-6 h-6 text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
