import React from 'react'
import { BiUpvote, BiDownvote } from "react-icons/bi";


const QueryMessage = ({content, username, upvotes, downvotes}) => {
  return (
    <div className={`flex`}>
    <div
      className={`message text-black bg-medium-grey  flex flex-wrap mt-4 py-1 px-3 font-lato w-full rounded-xl rounded-tl-none`}
    >
      <div className="flex flex-col text-xl w-full">
        <span className="text-lg text-dark-grey font-semibold">
            {username}
        </span>
        <span className="text-lg">
            {content}
        </span>
        <div className="votes flex gap-3 justify-end mr-2">
          <div className="upvote flex items-center gap-1">
            <BiUpvote className="text-xl"/>
            <span className="upvoteCount text-xl">{upvotes}</span>
          </div>
          <div className="downvote flex items-center gap-1">
            <BiDownvote className="text-xl" />
            <span className="downvoteCoutn text-xl">{downvotes}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default QueryMessage