"use client";
import React, { useEffect, useState } from "react";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import { Address } from "@ton/core";
import { User } from "@/contracts/DecentralisedJobMarketplace";

const Reviews = ({ userAddress }: { userAddress: string }) => {
  const { getUser } = useDecentralisedJobMarketplaceContract()!;
  const [user, setUser] = useState<User | null>(null);
  const [reputations, setReputations] = useState<
    {
      rating: number;
      review: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = (await getUser(Address.parse(userAddress))) || null;
      console.log("user", user);
      setUser(user);
      if (user)
        setReputations(
          user.reputations.values().map((reputation) => {
            let ratingCellToString = reputation.review
              .beginParse()
              .loadStringTail();
            return {
              rating: Number(reputation.rating),
              review: ratingCellToString,
            };
          })
        );
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  const filteredReviews = filter
    ? reputations.filter((rep) => rep.rating === filter)
    : reputations;

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-4xl font-bold text-center">
        {user.name.split(" ")[0]}'s Reviews
      </h1>
      <div className="flex flex-col items-center">
        <p className="text-lg mb-2 text-gray-400">Filter Reviews by Rating:</p>
        <select
          onChange={(e) =>
            setFilter(e.target.value ? Number(e.target.value) : null)
          }
          value={filter || ""}
          className="bg-white text-gray-800 border-r-8 border-transparent rounded-md p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">All Ratings</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rep, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-md shadow-md transition-transform transform hover:scale-105"
            >
              <p className="font-semibold">Rating: {rep.rating}</p>
              <p>Review: {rep.review}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
