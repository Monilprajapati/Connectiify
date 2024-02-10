import { asyncHandler } from "../utils/asyncHandler.js"
import { Post } from "../models/postModel.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

const getPosts = asyncHandler(
    async (req, res) => {
        const { room } = req.user
        const posts = await Post.find(
            { room, role: "alumni" },
        ).select("-image -tag")
        return res.status(200).json(
            new ApiResponse(200, posts, "Posts retrieved successfully")
        )
    }
)

const createPost = asyncHandler(
    async (req, res) => {
        const { description } = req.body
        const { room, _id } = req.user

        const post = await Post.create({
            description,
            room,
            role: "alumni",
            owner: _id,
            image: "",
            tag: []
        })

        return res.status(201).json(
            new ApiResponse(201, post, "Post created successfully")
        )
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
        default:
            throw new ApiError(400, "Invalid action provided");
    }
    await post.save();

    return res.status(200).json(
        new ApiResponse(200, post, "Post updated successfully")
    );
});

export { getPosts, createPost, updatePost }