"use client";
import React, { useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreatePostPage = () => {
  const wallet = useTonWallet();
  const router = useRouter();
  const { user, createPost } = useDecentralisedJobMarketplaceContract()!;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!wallet) {
    return <div>Please connect your wallet</div>;
  }

  if (!user) {
    return <div>Please create a profile to create a post.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(title, content).then(() => {
      toast.success("Post created successfully");
      router.push("/community");
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <textarea
            rows={2}
            name="title"
            placeholder="Write your post title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded text-black"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            rows={10}
            placeholder="Your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 border rounded text-black"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
