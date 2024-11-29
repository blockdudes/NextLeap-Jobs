"use client";
import CreateProfile from "@/components/CreateProfile";
import UserProfile from "@/components/UserProfile";
import { useDecentralisedJobMarketplaceContract } from "@/lib/useDecentralisedJobMarketplaceContract";
import { useTonWallet } from "@tonconnect/ui-react";

const ProfilePage = () => {
  const wallet = useTonWallet();
  const { user } = useDecentralisedJobMarketplaceContract()!;

  console.log(user);

  if (!wallet) {
    return <div>Please connect your wallet</div>;
  }

  if (!user) {
    return <CreateProfile />;
  }

  return <UserProfile user={user} />;
};

export default ProfilePage;
