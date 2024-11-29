"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { EmployerJobStatus, WorkerJobStatus } from "@/types/types";
import { useTonWallet } from "@tonconnect/ui-react";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import { Job } from "@/contracts/DecentralisedJobMarketplace";
import { Address } from "@ton/core";

const MyJobs = () => {
  const wallet = useTonWallet();
  const { user, jobs } = useDecentralisedJobMarketplaceContract()!;
  const [activeTab, setActiveTab] = useState<
    WorkerJobStatus | EmployerJobStatus
  >();

  useEffect(() => {
    if (user) {
      setActiveTab(user.isEmployer ? "posted" : "applied");
    }
  }, [user]);

  if (!wallet) {
    return <div>Please connect your wallet</div>;
  }

  if (!user) {
    return <div>Please create a profile to view your jobs</div>;
  }

  if (!jobs) {
    return <div>Loading...</div>;
  }

  let filteredJobs: Record<WorkerJobStatus | EmployerJobStatus, Job[] | null>;

  if (user.isEmployer) {
    filteredJobs = {
      posted: [] as Job[],
      accepted: [] as Job[],
      completed: [] as Job[],
      history: [] as Job[],
      ongoing: null,
      applied: null,
    };
    jobs.forEach((job) => {
      if (job.employer.equals(Address.parse(wallet.account.address))) {
        if (job.isCompleted) {
          filteredJobs["history"]!.push(job);
        } else if (job.completedAt !== null) {
          filteredJobs["completed"]!.push(job);
        } else if (job.worker !== null) {
          filteredJobs["accepted"]!.push(job);
        } else if (job.isAcceptingApplicants) {
          filteredJobs["posted"]!.push(job);
        }
      }
    });
  } else {
    filteredJobs = {
      applied: [] as Job[],
      ongoing: [] as Job[],
      completed: [] as Job[],
      history: [] as Job[],
      posted: null,
      accepted: null,
    };
    jobs.forEach((job) => {
      if (job.worker?.equals(Address.parse(wallet.account.address))) {
        if (job.completedAt !== null) {
          if (!job.isCompleted) {
            filteredJobs["completed"]!.push(job);
          } else {
            filteredJobs["history"]!.push(job);
          }
        } else {
          filteredJobs["ongoing"]!.push(job);
        }
      } else if (
        !!job.applicants
          .values()
          .find((applicant) =>
            applicant.equals(Address.parse(wallet.account.address))
          )
      ) {
        filteredJobs["applied"]!.push(job);
      }
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Jobs</h1>
      <div className="flex justify-center rounded-2xl truncate mb-4">
        {Object.keys(filteredJobs).map((status) => {
          if (!filteredJobs[status as WorkerJobStatus | EmployerJobStatus]) {
            return null;
          }
          return (
            <button
              key={status}
              onClick={() =>
                setActiveTab(status as WorkerJobStatus | EmployerJobStatus)
              }
              className={`px-4 py-2 text-sm ${activeTab === status ? "bg-blue-900 text-white" : "bg-gray-400/20"}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        {filteredJobs[activeTab as keyof typeof filteredJobs] &&
        filteredJobs[activeTab as keyof typeof filteredJobs]!.length > 0 ? (
          filteredJobs[activeTab as keyof typeof filteredJobs]!.map(
            (job, index) => (
              <Link
                key={index}
                href={`/job/${job.id}`}
                className="mb-2 p-2 rounded-xl shadow-sm shadow-white"
              >
                {job.title}
                <div className="text-xs text-gray-400">
                  {job.isCompleted
                    ? `Completed At: ${
                        new Date(
                          Number(job.completedAt) * 1000
                        ).toLocaleDateString() +
                        " " +
                        new Date(
                          Number(job.completedAt) * 1000
                        ).toLocaleTimeString()
                      }`
                    : `Created At: ${new Date(Number(job.createdAt) * 1000).toLocaleDateString() + " " + new Date(Number(job.createdAt) * 1000).toLocaleTimeString()}`}
                </div>
              </Link>
            )
          )
        ) : (
          <div>No jobs found</div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
