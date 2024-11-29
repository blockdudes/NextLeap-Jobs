"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import { Job } from "@/contracts/DecentralisedJobMarketplace";
import { useRouter } from "next/navigation";
import { useTonWallet } from "@tonconnect/ui-react";
import { Address, beginCell } from "@ton/core";
import { pinata } from "@/utils/config";
import toast from "react-hot-toast";

const JobDetails = ({ params }: { params: { id: string } }) => {
  const wallet = useTonWallet();
  const router = useRouter();
  const [job, setJob] = useState<Job | null | undefined>(null);
  const { getUser, jobs, applyForJob, completeJob, markJobAsCompleted } =
    useDecentralisedJobMarketplaceContract()!;
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string | null>(null);
  const [employerEmail, setEmployerEmail] = useState<string | null>(null);
  const [workerEmail, setWorkerEmail] = useState<string | null>(null);
  const id = params.id;
  const [isLoading, setIsLoading] = useState(true);

  const getJobData = async () => {
    if (!jobs) return;
    const jobData = jobs[Number(id)];
    setJob(jobData);
    setIsLoading(false);
  };

  const getEmployerEmail = async () => {
    if (!job) return;
    const employer = await getUser(job.employer);
    if (!employer) return;
    setEmployerEmail(employer.email ?? "N/A");
  };

  const getWorkerEmail = async () => {
    if (!job) return;
    if (!job.worker) return;
    const worker = await getUser(job.worker);
    if (!worker) return;
    setWorkerEmail(worker.email ?? "N/A");
  };

  useEffect(() => {
    getJobData();
  }, [jobs]);

  useEffect(() => {
    if (!job) return;
    getEmployerEmail();
    getWorkerEmail();
  }, [job]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <p className="p-4">Job not found</p>;
  }

  const handleApply = async () => {
    await applyForJob(id);
  };

  const handleWorkerCompleteJob = async () => {
    if (rating === null || review === null) {
      return;
    }
    await completeJob(id, rating!, review!);
    setRating(null);
    setReview(null);
  };

  const handleShortlistApplicant = () => {
    router.push(`/job/applicants/${id}`);
  };

  const handleEmployerCompleteJob = async () => {
    const getMetadataJsonUrl = async (): Promise<string | undefined> => {
      try {
        const uploadRequest = await pinata.upload.json({
          name: "Job Completion SBT",
          description: `A Job Completion SBT issued for successful completion of job ${job.title} by ${job.worker?.toString()} for ${job.compensation} TON. Refer to ${job.id} for more details.`,
          image:
            "https://t4.ftcdn.net/jpg/00/70/20/07/360_F_70200784_lixMCxz2JGTumMnyKHgwVtyiW5mrmEDN.jpg",
          attributes: [
            {
              trait_type: "Job ID",
              value: Number(job.id),
            },
            {
              trait_type: "Job Title",
              value: job.title,
            },
            {
              trait_type: "Job Compensation",
              value: Number(job.compensation),
            },
            {
              trait_type: "Job Worker",
              value: job.worker?.toString(),
            },
            {
              trait_type: "Job Employer",
              value: job.employer.toString(),
            },
            {
              trait_type: "Job Created At",
              value: Number(job.createdAt) * 1000,
            },
            {
              trait_type: "Job Rating",
              value: rating?.toString(),
            },
            {
              trait_type: "Job Review",
              value: review!,
            },
            {
              trait_type: "Job Completion Date",
              value: Date.now(),
            },
          ],
        });
        const ipfsUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/${uploadRequest.IpfsHash}`;
        console.log(ipfsUrl);
        return ipfsUrl;
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong. Try again later.");
      }
    };
    if (rating === null) {
      toast.error("Please rate your worker");
      return;
    }
    if (review === null) {
      toast.error("Please leave a review for your worker");
      return;
    }
    let metadataJsonUrl = await getMetadataJsonUrl();
    if (!metadataJsonUrl) {
      return;
    }
    let nftMetadata = beginCell();
    nftMetadata.storeUint(0x01, 8);
    nftMetadata.storeStringRefTail(metadataJsonUrl);
    await markJobAsCompleted(id, rating!, review!, nftMetadata.endCell());
    setRating(null);
    setReview(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <div className="flex flex-wrap gap-2 my-2">
        {job.skills.values().map((skill, index) => {
          const skillString = skill.beginParse().loadStringRefTail();
          return (
            <div
              key={index}
              className="px-4 py-1 border border-gray-300 rounded-full text-xs"
            >
              {skillString}
            </div>
          );
        })}
      </div>
      <p className="mb-2 text-lg font-semibold">Description:</p>
      <div
        className="mb-2 text-sm"
        onClick={() => {
          const jobDescriptionElement =
            document.querySelector(".job-description");
          jobDescriptionElement?.classList.toggle("line-clamp-none");
          const readMoreElement = document.querySelector(".read-more");
          readMoreElement?.classList.toggle("hidden");
        }}
      >
        <span
          className="job-description line-clamp-[10]"
          dangerouslySetInnerHTML={{
            __html: job.description.replaceAll("\n", "<br/><br/>"),
          }}
        />
        <span className="read-more text-blue-500 cursor-pointer">
          Read more...
        </span>
      </div>
      <div className="mb-2">
        <span className="text-sm font-medium">Compensation: </span>
        <span className="text-sm text-gray-400">{job.compensation} TON</span>
      </div>
      <div className="mb-2">
        <span className="text-sm font-medium">Created At: </span>
        <span className="text-sm text-gray-400">
          {new Date(Number(job.createdAt) * 1000).toLocaleDateString() +
            " " +
            new Date(Number(job.createdAt) * 1000).toLocaleTimeString()}
        </span>
      </div>
      <div className="mb-2">
        <span className="text-sm font-medium">Employer: </span>
        <Link
          href={`/profile/${job.employer}`}
          className="text-sm text-blue-400 break-all"
        >
          {job.employer.toString()}
        </Link>
      </div>
      <div className="mb-2">
        <span className="text-sm font-medium">Worker: </span>
        {job.worker ? (
          <Link
            href={`/profile/${job.worker}`}
            className="text-sm text-blue-400 break-all"
          >
            {job.worker.toString()}
          </Link>
        ) : (
          <span className="text-sm text-gray-400">Not assigned</span>
        )}
      </div>
      {wallet &&
        job.worker &&
        job.worker.equals(Address.parse(wallet.account.address)) && (
          <div className="mb-2">
            <span className="text-sm font-medium">Employer email: </span>
            {employerEmail ? (
              <Link
                href={`mailto:${employerEmail}`}
                className="text-sm text-blue-400 break-all"
              >
                {employerEmail}
              </Link>
            ) : (
              <span className="text-sm text-gray-400">N/A</span>
            )}
          </div>
        )}
      {wallet &&
        job.employer &&
        job.employer.equals(Address.parse(wallet.account.address)) && (
          <div className="mb-2">
            <span className="text-sm font-medium">Worker email: </span>
            {workerEmail ? (
              <Link
                href={`mailto:${workerEmail}`}
                className="text-sm text-blue-400 break-all"
              >
                {workerEmail}
              </Link>
            ) : (
              <span className="text-sm text-gray-400">N/A</span>
            )}
          </div>
        )}

      {wallet ? (
        !job.employer.equals(Address.parse(wallet.account.address)) ? (
          job.isAcceptingApplicants &&
          !job.applicants
            .values()
            .find((applicant) =>
              applicant.equals(Address.parse(wallet.account.address))
            ) ? (
            <button
              onClick={handleApply}
              className="w-full h-16 mt-4 text-center bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              Apply for Job
            </button>
          ) : job.isAcceptingApplicants &&
            job.applicants
              .values()
              .find((applicant) =>
                applicant.equals(Address.parse(wallet.account.address))
              ) ? (
            <div className="w-full h-16 mt-4 flex justify-center items-center bg-gray-400 text-white rounded-xl hover:bg-gray-600 transition">
              Already applied
            </div>
          ) : job.worker?.equals(Address.parse(wallet.account.address)) &&
            job.completedAt === null ? (
            <div className="flex flex-col gap-2 mt-4">
              <p>Please rate your employer</p>
              <select
                value={rating ?? ""}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border border-gray-300 text-black rounded-md p-2"
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <p>Please leave a review for your employer</p>
              <input
                type="text"
                value={review ?? ""}
                onChange={(e) => setReview(e.target.value)}
                className="border border-gray-300 text-black rounded-md p-2"
              />
              <button
                onClick={handleWorkerCompleteJob}
                className="w-full h-16 mt-4 text-center bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
              >
                Complete Job
              </button>
            </div>
          ) : job.worker?.equals(Address.parse(wallet.account.address)) &&
            job.completedAt !== null &&
            !job.isCompleted ? (
            <div className="w-full h-16 mt-4 flex justify-center items-center bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition">
              Awaiting Payment
            </div>
          ) : job.isCompleted ? (
            <div className="w-full h-16 mt-4 flex justify-center items-center bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
              Job Completed
            </div>
          ) : (
            <div className="w-full h-16 mt-4 flex justify-center items-center bg-gray-400 text-white rounded-xl hover:bg-gray-600 transition">
              This job is no longer accepting applications.
            </div>
          )
        ) : job.isAcceptingApplicants ? (
          <button
            onClick={handleShortlistApplicant}
            className="w-full h-16 mt-4 text-center bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Shortlist Applicant ({job.applicants.size} applicants)
          </button>
        ) : job.isCompleted ? (
          <div className="w-full h-16 mt-4 flex justify-center items-center bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
            Job Completed
          </div>
        ) : job.completedAt !== null ? (
          <div className="flex flex-col gap-2 mt-4">
            <p>Please rate your worker</p>
            <select
              value={rating ?? ""}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border border-gray-300 text-black rounded-md p-2"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <p>Please leave a review for your worker</p>
            <input
              type="text"
              value={review ?? ""}
              onChange={(e) => setReview(e.target.value)}
              className="border border-gray-300 text-black rounded-md p-2"
            />
            <button
              onClick={handleEmployerCompleteJob}
              className="w-full h-16 mt-4 flex justify-center items-center bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              Complete Job and Pay Worker
            </button>
          </div>
        ) : job.worker !== null ? (
          <div className="w-full h-16 mt-4 flex justify-center items-center bg-gray-400 text-white rounded-xl hover:bg-gray-600 transition">
            Awaiting Worker's Completion
          </div>
        ) : (
          <div className="w-full h-16 mt-4 flex justify-center items-center bg-gray-400 text-white rounded-xl hover:bg-gray-600 transition">
            This job is no longer accepting applications.
          </div>
        )
      ) : (
        <div className="w-full h-16 mt-4 flex justify-center items-center bg-blue-500 text-white rounded-xl hover:bg-gray-600 transition">
          Connect your wallet to apply for this job
        </div>
      )}
    </div>
  );
};

export default JobDetails;
