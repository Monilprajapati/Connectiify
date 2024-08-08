import React from "react";
import Posts from "./Posts";

const Post = () => {
  return (
    <div className="flex-1 h-full w-full  flex flex-col gap-6 overflow-y-auto px-[210px] pt-8">
      <Posts />
    </div>
  );
};

export default Post;
