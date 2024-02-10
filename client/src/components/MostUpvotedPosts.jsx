import React from "react";
import { useUserContext } from "../contexts/userContext";
import SideSectionPostCard from "../components/SideSectionPostCard";
const MostUpvotedPosts = () => {
  const { posts } = useUserContext();
  
  const top3Posts = posts
    .sort((a, b) => b.upvotes.length - a.upvotes.length)
    .slice(0, 3);
  console.log(posts);
  return (
    <>
      <span className="px-3 -mb-2 text-md xl:text-xl font-semibold">Most Upvoted Posts</span>
      <div className="flex flex-col overflow-y-auto w-full">
        <div className="flex flex-col gap-3">
          {top3Posts.map((post) => {
            return (
              <SideSectionPostCard
                key={post._id}
                username={post.username}
                title={post.title}
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
      </div>
    </>
  );
};

export default MostUpvotedPosts;
