import React from "react";
import Sidebar from "../components/Sidebar";
import Post from "../components/MyPostComponents/Post";
// import RightSection from "../components/RightSection";

const MyPost = () => {
  return (
    <div className="flex w-full h-[calc(100vh-70px)]">
      <Sidebar />
      <Post/>
    </div>
  );
};

export default MyPost;
