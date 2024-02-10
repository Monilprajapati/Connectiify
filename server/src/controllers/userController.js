import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/userModel.js'
import { Post } from '../models/postModel.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'

const getUser = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user._id).select('-password -room -posts -channels -status')
        if (!user)
            throw new ApiError(404, "User not found")
        return res.status(200).json(
            new ApiResponse(200, user, "User retrieved successfully")
        )
    }
)

const getUserPosts = asyncHandler(
    async (req, res) => {
        const { _id } = req.user
        const posts = await Post.find(
            { owner: _id }
        )
        return res.status(200).json(
            new ApiResponse(200, posts, "Posts retrieved successfully")
        )
    }
)

const getUserChannels = asyncHandler(
    async (req, res) => {
        const { _id } = req.user

        // const user = await User.findById(_id).select('email channels')
        const user = await User.findById(_id)
        if (!user)
            throw new ApiError(404, "User not found")
        return res.status(200).json(
            new ApiResponse(200, user, "Channels retrieved successfully")
        )
    }
)

const getAllUsers = asyncHandler(
    async (req, res) => {
        const users = await User.find()
        return res.status(200).json(
            new ApiResponse(200, users, "Users retrieved successfully")
        )
    }
)


export {
    getUser,
    getUserPosts,
    getUserChannels,
    getAllUsers
}