"use client";
import React, { useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PostJobPage = () => {
  const wallet = useTonWallet();
  const router = useRouter();
  const { user, jobs, createJob } = useDecentralisedJobMarketplaceContract()!;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [compensation, setCompensation] = useState<string>("0");
  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState<string>("");

  if (!wallet) {
    return <div>Please connect your wallet</div>;
  }

  if (!user) {
    return <div>Please create a profile to post a job.</div>;
  }

  if (!user.isEmployer) {
    return (
      <div>
        You are not eligible to post a job. Please create a profile as an
        employer.
      </div>
    );
  }

  const handleAddSkill = () => {
    console.log("Skills", skills);
    if (skill === "") {
      alert("Please enter a skill");
    } else if (skills.includes(skill)) {
      alert("Skill already added");
    } else if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jobs === null) {
      toast.error("No jobs found");
      return;
    }
    try {
      await createJob({
        title,
        description,
        compensation: Number(compensation),
        skills,
      }).then(() => {
        toast.success("Job posted successfully");
        router.push("/");
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to post job");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <div className="flex flex-col gap-4">
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded text-black placeholder:text-gray-400"
          required
        />
        <label htmlFor="description">Job Description</label>
        <textarea
          name="description"
          rows={5}
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded text-black placeholder:text-gray-400"
          required
        />
        <label htmlFor="compensation">Compensation</label>
        <input
          type="number"
          min={0}
          step={0.000000001}
          name="compensation"
          placeholder="Compensation"
          value={compensation}
          onChange={(e) => setCompensation(e.target.value)}
          className="p-2 border rounded text-black placeholder:text-gray-400"
          required
        />
        <h2 className="text-lg font-semibold">Skills:</h2>
        <div className="grid grid-cols-7 justify-between items-center gap-2">
          <input
            type="text"
            placeholder="Add a skill/domain"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddSkill();
              }
            }}
            className="col-span-5 border border-gray-300 p-2 rounded-md placeholder:text-gray-400 text-black"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="col-span-2 bg-blue-500 text-white rounded-md p-2"
          >
            Add Skill
          </button>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            {skills.length > 0 ? (
              skills.map((s, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-white border p-2 rounded-md"
                >
                  {s}
                  <button
                    onClick={() => handleRemoveSkill(s)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <li className="text-white">No skills added</li>
            )}
          </ul>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default PostJobPage;
