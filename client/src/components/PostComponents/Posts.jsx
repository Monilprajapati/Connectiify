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
  const { posts, setPosts, search, setSearch } = usePostContext();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getPostData(setPosts, token);
    }
    setLoading(false);
  }, [setPosts, isAuthenticated]);
  console.log(posts);
  const tempPosts = posts.filter((post) => {
    if (search === "") {
      return post;
    }

    // Search in any tag
    return post?.tag[0].split(',').some(tag =>
      tag.toLowerCase().includes(search.toLowerCase())
    );
  });


  return (
    <>
      {posts.length == 0 ? (
        <div className="h-full w-full flex justify-center items-center bg-gradient-to-b from-blue-400 to-indigo-500">
          <div class="inline-block bg-white p-2 shadow-md rounded-md">
            <p class="text-black text-3xl font-bold text-shadow-md">
              It's a little quiet around here...
            </p>
          </div>
        </div>


      ) : (
        <div
          className={`mb-2 py-1 px-2 md:px-11 ${open ? "lg:px-4 xl:px-36" : "lg:px-14 xl:px-40"
            } flex flex-col gap-5`}
        >
          {tempPosts
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