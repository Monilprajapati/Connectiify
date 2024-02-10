import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import { getPostData } from "../../services/postServices";
import { useUserContext } from "../../contexts/userContext";
import { usePostContext } from "../../contexts/postContext";
// import { ThreeCircles } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Posts = () => {
  const { token, open } = useUserContext();
  const { posts, setPosts } = usePostContext();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getPostData(setPosts, token);
    }
    setLoading(false);
  }, [setPosts, isAuthenticated]);

  // console.log("post:"+posts[0]._id)

  return (
    <>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          Loading...
        </div>
      ) : (
        <div
          className={`mb-2 py-1 px-2 md:px-11 ${open ? "lg:px-4 xl:px-36" : "lg:px-14 xl:px-40"
            } flex flex-col gap-5`}
        >
          {posts
            .slice()
            .reverse()
            .map((post) => {
              return (
                <PostCard
                  key={post._id}
                  postId={post._id}
                  description={post.description}
                  userAvatar={post.userAvatar}
                  username={post.username}
                  image={post.image}
                  upvotes={post.upvotes}
                  downvotes={post.downvotes}
                  comments={post.comments}
                  owner={post.owner}
                  tag={post.tag}
                  createdAt={post.createdAt}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default Posts;
