import React from 'react'
import PostTags from './PostTags'
import MostUpvotedPosts from './MostUpvotedPosts'

const RightSection = () => {
  return (
    <div className="hidden h-full lg:flex flex-col gap-6 border-r border-grey w-[30%] bg-lightGray px-4 py-2">
    <PostTags />
    <MostUpvotedPosts />
</div>
  )
}

export default RightSection