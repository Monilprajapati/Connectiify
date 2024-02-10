import { asyncHandler } from "../utils/asyncHandler.js"
import { Comment } from "../models/commentModel.js"
import { Post } from "../models/postModel.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params

    const findPost = await Post.findOne({
        _id: postId
    })
    // console.log("ad:" + findPost)
    const comments = await Comment.find(
        {
            _id: {
                "$in": findPost.comments
            }
        }
    );

    return res.status(200).json(
        new ApiResponse(200, comments, "Comments retrieved successfully")
    );
});

const createComment = asyncHandler(
    async (req, res) => {
        const { description } = req.body
        const { _id } = req.user
        const comment = await Comment.create({
            commentData: description,
            owner: _id
        })
        return res.status(201).json(
            new ApiResponse(201, comment, "Comment created successfully")
        )
    }
);

const updateComment = asyncHandler(
    async (req, res) => {
        const { commentId } = req.params;
        const { _id } = req.user;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new ApiError(404, "Comment not found");
        }

        const { action } = req.body;

        switch (action) {
            case "upvote":
                const upvoteIndex = comment.upvotes.indexOf(_id);
                const downvoteIndex = comment.downvotes.indexOf(_id);

                if (upvoteIndex === -1) {
                    comment.upvotes.push(_id);
                } else {
                    comment.upvotes.splice(upvoteIndex, 1);
                }

                if (downvoteIndex !== -1) {
                    comment.downvotes.splice(downvoteIndex, 1);
                }
                break;
            case "downvote":
                const upvoteIndexDownvote = comment.upvotes.indexOf(_id);
                const downvoteIndexDownvote = comment.downvotes.indexOf(_id);

                if (downvoteIndexDownvote === -1) {
                    comment.downvotes.push(_id);
                } else {
                    comment.downvotes.splice(downvoteIndexDownvote, 1);
                }

                if (upvoteIndexDownvote !== -1) {
                    comment.upvotes.splice(upvoteIndexDownvote, 1);
                }
                break;
            // case "comment":
            //     post.comments.push(commentId);
            //     break;
            // case "deleteComment":
            //     const { commentId } = req.body;
            //     const commentIndex = post.comments.findIndex(
            //         (comment) => comment._id.toString() === commentId
            //     );
            //     if (commentIndex !== -1) {
            //         post.comments.splice(commentIndex, 1);
            //     }
            //     break;

            default:
                throw new ApiError(400, "Invalid action provided");
        }
        await comment.save();

        return res.status(200).json(
            new ApiResponse(200, comment, "Post updated successfully")
        );
    }
);

const deleteComment = asyncHandler(
    async (req, res) => {

    }
);

export {
    getComments,
    createComment,
    updateComment,
    deleteComment
};