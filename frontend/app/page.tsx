"use client";
import React from "react";
import Link from "next/link";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";

const Home = () => {
  const { jobs } = useDecentralisedJobMarketplaceContract()!;

  if (jobs === null || jobs === undefined) {
    return <div>Jobs not loaded</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <Link href={`/job/${index}`} key={index}>
              <li className="mb-4 p-4 bg-black/20 rounded-2xl shadow-md shadow-white">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <div className="flex flex-wrap gap-1 my-2">
                  {job.skills
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
                  {job.numberOfSkills > 2 && (
                    <div className="flex-1 max-w-16 py-1 flex justify-center items-center border border-gray-300 rounded-full text-xs">
                      +{Number(job.numberOfSkills) - 2}
                    </div>
                  )}
                </div>
                <p className="text-sm">
                  Compensation:{" "}
                  <span className="text-gray-400">{job.compensation} TON</span>
                </p>
                <p className="text-sm">
                  Created At:{" "}
                  <span className="text-gray-400">
                    {new Date(
                      Number(job.createdAt) * 1000
                    ).toLocaleDateString() +
                      " " +
                      new Date(Number(job.createdAt) * 1000).toLocaleTimeString()}
                  </span>
                </p>
              </li>
            </Link>
          ))
        ) : (
          <div>No jobs found</div>
        )}
      </ul>
    </div>
  );
};

export default Home;
