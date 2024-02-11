/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import moment from 'moment'
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useUserContext } from '../../contexts/userContext';
import { updateComment } from '../../services/commentServices';
import { useSelector } from "react-redux";

const CommentCard = ({ commentId, userAvatar, username, description, upvotes, downvotes, reply, owner, createdAt }) => {
    const { token } = useUserContext();
    const user = useSelector(state => state.authReducer.user);
    const [upvoteCount, setUpvoteCount] = useState(upvotes.length);
    const [downvoteCount, setDownvoteCount] = useState(downvotes.length);
    const [isUpvoteClicked, setIsUpvoteClicked] = useState(upvotes.includes(user?._id));
    const [isDownvoteClicked, setIsDownvoteClicked] = useState(downvotes.includes(user?._id));


    const handleUpvote = async () => {
        try {
            await updateComment(commentId, 'upvote', token);

            setIsUpvoteClicked(!isUpvoteClicked);
            setUpvoteCount((prevCount) => (isUpvoteClicked ? prevCount - 1 : prevCount + 1));

            if (isDownvoteClicked) {
                setIsDownvoteClicked(false);
                setDownvoteCount((prevCount) => prevCount - 1);
            }
        } catch (error) {
            console.error('Error upvoting post:', error.message);
        }
    };

    const handleDownvote = async () => {
        try {
            await updateComment(commentId, 'downvote', token);

            setIsDownvoteClicked(!isDownvoteClicked);
            setDownvoteCount((prevCount) => (isDownvoteClicked ? prevCount - 1 : prevCount + 1));

            if (isUpvoteClicked) {
                setIsUpvoteClicked(false);
                setUpvoteCount((prevCount) => prevCount - 1);
            }
        } catch (error) {
            console.error('Error downvoting post:', error.message);
        }
    };


    return (
        <div className='border-b border-black border-opacity-20 mt-2 '>
            <div className="flex gap-3 items-center mb-2  ">
                <img
                    src={userAvatar}
                    alt={`avatar`}
                    className="w-14 h-14 object-cover border border-white rounded-full"
                />
                <div className="w-full flex justify-between flex-col">
                    <div className="flex items-center">
                        <p className="font-medium text-lg text-ascent-1 mr-2">{username}</p>

                        <span className="text-sm opacity-70">
                            &bull; {moment(createdAt).fromNow()}
                        </span>
                    </div>
                    <div className="max-w-fd overflow-wrap break-word ">
                        {description}
                    </div>
                </div>
            </div>
            <div className="flex gap-3 items-center text-base cursor-pointer mb-2">
                <button
                    onClick={handleUpvote}
                    className={` px-2 w-14 rounded-full flex items-center gap-2 border-2 group border-dark-grey hover:border-green ${isUpvoteClicked
                        ? "border-green border-opacity-100"
                        : "border-dark-grey border-opacity-35 "
                        } `}
                >
                    <BiUpvote size={15} />
                    {upvoteCount}
                </button>

                <button
                    onClick={handleDownvote}
                    className={` px-2 w-14 rounded-full flex items-center gap-2 border-2 border-dark-grey group hover:border-red ${isDownvoteClicked
                        ? "border-red border-opacity-100"
                        : "border-dark-grey border-opacity-35"
                        }`}
                >
                    <BiDownvote size={15} />
                    {Math.abs(downvoteCount)}
                </button>
                <button
                    className={` px-2 text-blue flex items-center  `}
                >
                    Reply...
                </button>
            </div>
        </div>
    )
}

export default CommentCard
