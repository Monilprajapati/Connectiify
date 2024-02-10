import React from "react";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import moment from "moment";
const SideSectionPostCard = ({
  description,
  image,
  upvotes,
  downvotes,
  comments,
  owner,
  createdAt
}) => {
  // console.log(description);
  return (
    <div className="border-whitesmoke border-2 pt-3 flex flex-col gap-2 w-full rounded-md bg-white text-black px-2 pb-1 xl:px-4 xl:py-2">
      <div className="flex top gap-2 h-full items-center">
        {image && (
          <img
            src={image}
            alt="post image"
            className="w-24 h-24 object-cover rounded-md border border-white"
          />
        )}
        <div className="text-sm xl:hidden">
          {description &&
            (description.length > 70
              ? description.substring(0, 70) + "..."
              : description)}
        </div>
        <div className="text-sm hidden xl:flex">
          {description &&
            (description.length > 180
              ? description.substring(0, 180) + "..."
              : description)}
        </div>
      </div>
      <div className="user text-sm flex -mb-1 px-1 justify-between">
        <span className="text-sm font-medium hover:underline">
          {user?.username}
        </span>
        <span className="text-gray-400 text-xs">
          {" "}
          {moment(createdAt).fromNow()}
        </span>
      </div>
      <hr className="text-black px-1 opacity-40" />
      <div className="bottom flex justify-between items-center px-1 -mt-1">
        <div className="votes flex justify-between items-center gap-3">
          <div className="upvote flex items-center gap-1">
            <BiUpvote size={20} />
            {upvotes.length}
          </div>
          <div className="downvote flex items-center gap-1">
            <BiDownvote size={20} />
            {downvotes.length}
          </div>
        </div>
        <div className="comment flex items-center gap-1">
          <BiComment size={20} />
          {comments.length}
        </div>
      </div>
    </div>
  );
};

export default SideSectionPostCard;
