import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import getPosts from "../../services/posts";
import { useUserContext } from "../../contexts/userContext";
import { ThreeCircles } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Posts = () => {
  const { token, posts, setPosts, open } = useUserContext();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getPosts(setPosts, token);
    }
    setLoading(false);
  }, [setPosts, isAuthenticated]);

  return (
    <>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <ThreeCircles
            visible={true}
            height="50"
            width="50"
            color="gray"
            innerCircleColor="gray"
            middleCircleColor="#E5E5E5"
            outerCircleColor="#6B6B6B"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
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