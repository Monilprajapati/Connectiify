import { asyncHandler } from "../utils/asyncHandler.js"
import { Post } from "../models/postModel.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getPosts = asyncHandler(
    async (req, res) => {
        const { room } = req.user
        const posts = await Post.find(
            { room }
        )
        return res.status(200).json(
            new ApiResponse(200, posts, "Posts retrieved successfully")
        )
    }
)

const createPost = asyncHandler(
    async (req, res) => {

    }
)

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { _id } = req.user;

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const { action, commentId } = req.body;

    switch (action) {
        case "upvote":
            const upvoteIndex = post.upvotes.indexOf(_id);
            const downvoteIndex = post.downvotes.indexOf(_id);

            if (upvoteIndex === -1) {
                post.upvotes.push(_id);
            } else {
                post.upvotes.splice(upvoteIndex, 1);
            }

            if (downvoteIndex !== -1) {
                post.downvotes.splice(downvoteIndex, 1);
            }
            break;
        case "downvote":
            const upvoteIndexDownvote = post.upvotes.indexOf(_id);
            const downvoteIndexDownvote = post.downvotes.indexOf(_id);

            if (downvoteIndexDownvote === -1) {
                post.downvotes.push(_id);
            } else {
                post.downvotes.splice(downvoteIndexDownvote, 1);
            }

            if (upvoteIndexDownvote !== -1) {
                post.upvotes.splice(upvoteIndexDownvote, 1);
            }
            break;
        case "comment":
            post.comments.push(commentId);
            break;
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
    await post.save();

    return res.status(200).json(
        new ApiResponse(200, post, "Post updated successfully")
    );
});

const deletePost = asyncHandler(
    async (req, res) => {
        const { postId } = req.params
        const { _id } = req.user
        const post = await Post.findById(postId)
        if (!post)
            throw new ApiError(404, "Post not found")
        if (post.owner.toString() !== _id.toString())
            throw new ApiError(401, "You are not authorized to delete this post")
        await post.deleteOne()
        return res.status(200).json(
            new ApiResponse(200, null, "Post deleted successfully")
        )
    }

)

export {
    getPosts,
    updatePost,
    createPost,
    deletePost
};