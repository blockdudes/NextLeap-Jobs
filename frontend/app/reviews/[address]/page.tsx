import React from "react";
import Reviews from "@/components/Reviews";

const ReviewsPage = ({ params }: { params: { address: string } }) => {
  return <Reviews userAddress={decodeURIComponent(params.address)} />;
};

export default ReviewsPage;
