"use client";
import React, { useEffect, useState } from "react";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import Link from "next/link";
import { Job, Reputation, User } from "@/contracts/DecentralisedJobMarketplace";
import { Address, Dictionary } from "@ton/core";
import { useTonWallet } from "@tonconnect/ui-react";

const ApplicantsPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const wallet = useTonWallet();
  const { jobs, getUser, shortlistApplicant } =
    useDecentralisedJobMarketplaceContract()!;
  const [job, setJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getJobData = async () => {
      const jobData = jobs?.[Number(id)] ?? null;
      setJob(jobData);
      if (jobData) {
        const applicantAddresses = jobData.applicants.values();
        const applicantsData = await Promise.all(
          applicantAddresses.map(async (address) => await getUser(address))
        ).then((users) => users.filter((user) => !!user));
        console.log("applicantsData", applicantsData);
        setApplicants(applicantsData);
        setIsLoading(false);
      }
    };
    getJobData();
  }, [params.id, jobs]);

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  if (!wallet) {
    return <p className="p-4">Please connect your wallet</p>;
  }

  if (!job) {
    return <p className="p-4">Job not found</p>;
  }

  if (!job.employer.equals(Address.parse(wallet.account.address))) {
    return <p className="p-4">You are not the employer of this job</p>;
  }

  if (!job.isAcceptingApplicants) {
    return <p className="p-4">This job is not accepting applicants</p>;
  }

  const handleShortlistApplicant = async (address: Address) => {
    setIsLoading(true);
    await shortlistApplicant(id, address);
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Applicants for {job.title}</h1>
      <div className="flex flex-col gap-4">
        {applicants.map((applicant, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 border p-4 rounded-xl bg-black/20"
          >
            <h2 className="text-xl font-semibold">{applicant.name}</h2>
            <Link
              href={`/profile/${applicant.address.toString()}`}
              className="text-blue-500 break-all text-sm"
            >
              {applicant.address.toString()}
            </Link>

            <div className="flex flex-wrap gap-1 my-2">
              {applicant.skills
                .values()
                .slice(0, 2)
                .map((skill) => skill.beginParse().loadStringRefTail())
                .map((skill, index) => (
                  <div
                    key={index}
                    className="px-4 py-1 border border-gray-300 rounded-full text-xs"
                  >
                    {skill}
                  </div>
                ))}
              {applicant.skills.size > 2 && (
                <div className="flex-1 max-w-16 py-1 flex justify-center items-center border border-gray-300 rounded-full text-xs">
                  +{Number(applicant.skills.size) - 2}
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 flex gap-1">
              Email:
              <Link
                href="#"
                target="_blank"
                className="text-blue-500"
                onClick={() => {
                  (window as any).location.href = `mailto:${applicant.email}`;
                }}
              >
                {applicant.email}
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              Reputation: {calculateReputation(applicant.reputations)}
            </p>
            <p className="text-sm text-gray-500">
              Completed Jobs: {Number(applicant.numberOfReputations || 0)}
            </p>

            <button
              onClick={() => handleShortlistApplicant(applicant.address)}
              className="w-full bg-blue-500 text-white rounded-md p-2 mt-2"
            >
              Shortlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const calculateReputation = (reputations: Dictionary<bigint, Reputation>) => {
  if (reputations.size === 0) return "N/A";
  const totalRating = reputations
    .values()
    .reduce((acc, curr) => acc + Number(curr.rating), 0);
  return (totalRating / reputations.size).toFixed(2);
};

export default ApplicantsPage;
