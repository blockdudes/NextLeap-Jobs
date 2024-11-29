"use client";
import React, { useState } from "react";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import toast from "react-hot-toast";

const CreateProfile = () => {
  const wallet = useTonWallet();
  const { createUser } = useDecentralisedJobMarketplaceContract()!;
  const [name, setName] = useState("");
  const [role, setRole] = useState("worker");
  const [email, setEmail] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  if (!wallet) {
    return <div>Please connect your wallet</div>;
  }

  const handleSubmit = async () => {
    try {
      await createUser(name, email, skills, role === "employer");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create profile");
    }
  };

  const handleAddSkill = () => {
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

  return (
    <div className="flex flex-col p-4 gap-4">
      <TonConnectButton />
      <h1 className="text-3xl font-bold">Create Profile</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-800 border border-gray-300 p-2 rounded placeholder:text-gray-400 text-white"
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-800 border border-gray-300 p-2 rounded placeholder:text-gray-400 text-white"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-gray-800 border border-gray-300 p-2 rounded placeholder:text-gray-400 text-white"
      >
        <option value="worker">Worker</option>
        <option value="employer">Employer/Company</option>
      </select>
      <div className="flex justify-between items-center gap-2">
        <input
          type="text"
          placeholder="Add a skill/domain"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddSkill();
          }}
          className="bg-gray-800 border border-gray-300 p-2 rounded-md placeholder:text-gray-400 text-white"
        />
        <button
          onClick={handleAddSkill}
          className=" bg-blue-500 text-white rounded-md p-2"
        >
          Add Skill
        </button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Skills:</h2>
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
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white rounded-md p-2"
      >
        Create Profile
      </button>
    </div>
  );
};

export default CreateProfile;
