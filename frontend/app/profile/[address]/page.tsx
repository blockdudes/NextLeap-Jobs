"use client";
import UserProfile from "@/components/UserProfile";
import { User } from "@/contracts/DecentralisedJobMarketplace";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import { Address } from "@ton/core";
import React, { useEffect, useState } from "react";

const ProfilePage = ({ params }: { params: { address: string } }) => {
  const userAddress = decodeURIComponent(params.address);
  const { getUser } = useDecentralisedJobMarketplaceContract()!;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = (await getUser(Address.parse(userAddress))) || null;
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return <UserProfile user={user} />;
};

export default ProfilePage;
