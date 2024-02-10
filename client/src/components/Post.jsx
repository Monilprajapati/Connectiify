import React from 'react';
import CreatePost from './PostComponents/CreatePost.jsx';
import Posts from "./PostComponents/Posts.jsx";

const PostComponent = () => {

    return (
        <div className='flex-1 h-full w-full px-4 flex flex-col gap-6 overflow-y-auto '>
            <CreatePost />
            <Posts />
        </div>
    )
}

export default PostComponent