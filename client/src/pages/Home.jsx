import React from "react";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";

const Home = () => {
  return (
    <div className="flex w-full h-[calc(100vh-70px)]">
      <Sidebar />
      <Post/>
    </div>
  );
};

export default Home;
