import CommunityPost from "@/components/CommunityPost";
import React from "react";

const CommunityPostPage = ({ params }: { params: { id: string } }) => {
  return <CommunityPost postId={params.id} />;
};

export default CommunityPostPage;
