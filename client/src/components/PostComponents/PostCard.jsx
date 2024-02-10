import React, { useEffect, useState } from "react";
// import { posts, user } from "../../common/data";
import moment from "moment";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { useUserContext } from "../../contexts/userContext";
import { updatePost } from "../../services/postServices";

const PostCard = ({
  postId,
  description,
  userAvatar,
  username,
  image,
  upvotes,
  downvotes,
  comments,
  owner,
  tag,
  createdAt,
}) => {
  const { token, allusers } = useUserContext();
  const user = useSelector(state => state.authReducer.user)

  const [seeMore, setSeeMore] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(upvotes.length);
  const [downvoteCount, setDownvoteCount] = useState(downvotes.length);
  // const [postOwner, setPostOwner] = useState();
  const [isUpvoteClicked, setIsUpvoteClicked] = useState(
    upvotes.includes(user?._id)
  );
  const [isDownvoteClicked, setIsDownvoteClicked] = useState(
    downvotes.includes(user?._id)
  );


  const handleUpvote = async () => {
    try {
      await updatePost(postId, "upvote", token);

      setIsUpvoteClicked(!isUpvoteClicked);
      setUpvoteCount((prevCount) =>
        isUpvoteClicked ? prevCount - 1 : prevCount + 1
      );

      if (isDownvoteClicked) {
        setIsDownvoteClicked(false);
        setDownvoteCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      console.error("Error upvoting post:", error.message);
    }
  };

  const handleDownvote = async () => {
    try {
      await updatePost(postId, "downvote", token);

      setIsDownvoteClicked(!isDownvoteClicked);
      setDownvoteCount((prevCount) =>
        isDownvoteClicked ? prevCount - 1 : prevCount + 1
      );

      if (isUpvoteClicked) {
        setIsUpvoteClicked(false);
        setUpvoteCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      console.error("Error downvoting post:", error.message);
    }
  };

  // useEffect(() => {
  //   const user = allusers.find((user) => user._id === owner);
  //   setPostOwner(user);
  // }, [allusers, user]);

  return (
    <div className=" w-full bg-lightGray px-4 md:px-6 py-6 pb-3 flex flex-col justify-between rounded-md">
      {/* userInfo */}
      <div className="flex gap-3 items-center mb-3">
        <img
          src={userAvatar}
          alt={`avatar`}
          className="w-14 h-14 object-cover border border-white rounded-full"
        />
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <p className="font-medium text-lg text-ascent-1">
              {username}
            </p>
            <span className="text-sm opacity-70">
              {moment(createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>

      {tag && (
        <div className="flex gap-2 items-center mb-3">
          {tag[0].split(',').map((tag, index) => (
            // eslint-disable-next-line react/jsx-key
            <span
              key={index}
              className="text-xs xl:text-sm opacity-80 text-black bg-white p-2 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="pt-4 w-full border-t border-black border-opacity-20">
        {/* <div className="text-md xl:text-lg">
          {description.length < 401
            ? description
            : seeMore
            ? description
            : description.slice(0, 400) + "..."}
          <span
            className="text-[#00BFFF] ml-2 font-mediu cursor-pointer"
            onClick={() => setSeeMore(!seeMore)}
          >
            {description.length < 271 ? "" : seeMore ? "See Less" : "See More"}
          </span>
        </div> */}
        <span className="w-full">
          {description}
        </span>

        {image && (
          <img
            src={image}
            alt="post image"
            className="w-full mt-4 rounded-lg"
          />
        )}
      </div>

      <div className="mt-4 pt-4 mb-1 flex justify-between items-center px-2 py-2 text-ascent-2 text-base border-t">
        <div className="flex gap-3 items-center text-base cursor-pointer">
          <button
            onClick={handleUpvote}
            className={`py-1 px-2 w-16 rounded-full flex items-center gap-2 border-2 group hover:border-green ${isUpvoteClicked
              ? "border-green border-opacity-100"
              : "border-dark-grey border-opacity-35 "
              }`}
          >
            <BiUpvote size={20} />
            {upvoteCount}
          </button>

          <button
            onClick={handleDownvote}
            className={`py-1 px-2 w-16 rounded-full flex items-center gap-2 border-2 border-dark-grey group hover:border-red ${isDownvoteClicked
              ? "border-red border-opacity-100"
              : "border-dark-grey border-opacity-35"
              }`}
          >
            <BiDownvote size={20} />
            {Math.abs(downvoteCount)}
          </button>
        </div>

        <p className="flex gap-2 items-center text-base cursor-pointer">
          <BiComment size={20} />
          {comments.length}
        </p>
      </div>
    </div>
  );
};

export default PostCard;