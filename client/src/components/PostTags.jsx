import React from "react";

const tags = [
  {
    id: 2,
    name: "Fun",
  },
  {
    id: 3,
    name: "Tech",
  },
  {
    id: 4,
    name: "DSA",
  },
  {
    id: 5,
    name: "Interview",
  },
  {
    id: 7,
    name: "Web Development",
  },
  {
    id: 8,
    name: "Android Development",
  },
  {
    id: 9,
    name: "iOS Development",
  },
  {
    id: 10,
    name:"Review"
  },
  {
    id: 11,
    name:"Admission"
  },
  {
    id: 12,
    name:"Placement"
  },
  {
    id: 13,
    name:"Internship"
  }
];
const PostTags = () => {
  return (
    <div className="flex flex-col mt-3 gap-3 xl:gap-4">
      <h1 className="font-semibold text-lg xl:text-2xl mx-1 xl:mx-2">Tags to search the relevant Posts</h1>
      <div className="flex gap-x-2 gap-y-3 flex-wrap xl:px-2">
        {tags.map((tag) => (
          <span className="bg-white text-black rounded-2xl px-3 py-1 text-sm xl:text-md" key={tag.id}>
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostTags;
