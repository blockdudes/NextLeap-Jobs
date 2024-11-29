"use client";
import React from "react";
import Reviews from "@/components/Reviews";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

const ReviewsPage = () => {
  const wallet = useTonWallet();

  if (!wallet) {
    return <div>Please connect your wallet</div>;
  }
  
  return <Reviews userAddress={wallet.account.address} />;
};

export default ReviewsPage;
