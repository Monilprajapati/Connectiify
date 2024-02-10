import React from 'react'
import CreatePost from './CreatePost'
import Posts from './Posts'

const Post = () => {
  return (
    <div className='flex-1 h-full w-full px-4 flex flex-col gap-6 overflow-y-auto '>
    <CreatePost />
    <Posts />
</div>
  )
}

export default Post