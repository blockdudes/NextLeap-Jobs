"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { User } from "@/contracts/DecentralisedJobMarketplace";
import { toast } from "react-hot-toast";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import { useTonWallet } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

const UserProfile = ({ user }: { user: User }) => {
  const router = useRouter();
  const wallet = useTonWallet();
  const { updateUserSkills, updateUserRole } =
    useDecentralisedJobMarketplaceContract()!;
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState<string[]>();
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (!user) return;
    setSkills(
      user.skills
        .values()
        .map((skill) => skill.beginParse().loadStringRefTail())
    );
  }, [user]);

  if (!user) {
    return <div>User not found</div>;
  }

  if (!skills) return null;

  if (!wallet) {
    return <div>Please connect your wallet</div>;
  }

  const isMyProfile = Address.parse(wallet.account.address).equals(
    user.address
  );

  const handleChangeRole = async () => {
    try {
      await updateUserRole(!user.isEmployer);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  const handleChangeSkill = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleSave = async () => {
    try {
      await updateUserSkills(skills);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update skills");
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      <h1 className="text-3xl font-bold">{user.name}</h1>
      <p className="break-all ">Address: {user.address.toString()}</p>
      <p className="flex gap-2">
        Role: {user.isEmployer ? "Employer" : "Worker"}{" "}
        <button onClick={handleChangeRole} className="text-blue-500">
          Switch
        </button>
      </p>
      <p>
        Reputation:{" "}
        {user.reputations.size > 0
          ? (
              user.reputations
                .values()
                .reduce((acc, curr) => acc + Number(curr.rating), 0) /
              user.reputations.size
            ).toFixed(2)
          : "N/A"}
      </p>
      <p>Completed Jobs: {user.reputations.size}</p>
      <p>Skills:</p>
      <div className="flex flex-wrap gap-2 -mt-2">
        {isEditing
          ? skills.map((skill, index) => (
              <div className="w-full flex justify-around items-center gap-2">
                <input
                  key={index}
                  value={skill}
                  onChange={(e) => handleChangeSkill(index, e.target.value)}
                  className="w-full px-4 py-1 border border-gray-300 bg-gray-800 rounded-full text-sm"
                />
                <button
                  className="w-7 h-7 aspect-square bg-red-500 rounded-full flex items-center justify-center"
                  onClick={() => handleRemoveSkill(index)}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))
          : skills.map((skill, index) => (
              <p
                key={index}
                className="px-4 py-1 border border-gray-300 rounded-full text-xs"
              >
                {skill}
              </p>
            ))}
      </div>
      {isMyProfile && isEditing && (
        <div className="flex justify-between items-center gap-2">
          <input
            type="text"
            placeholder="Add a skill/domain"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
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
      )}
      {isMyProfile && (
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="mt-2 bg-blue-500 text-white rounded-md p-2"
        >
          {isEditing ? "Save Skills" : "Edit Skills"}
        </button>
      )}
      <button
        onClick={() =>
          isMyProfile
            ? router.push("/reviews")
            : router.push(`/reviews/${user.address.toString()}`)
        }
        className="mt-2 bg-blue-500 text-white rounded-md p-2"
      >
        View Reviews
      </button>
    </div>
  );
};

export default UserProfile;
