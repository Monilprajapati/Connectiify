import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/userModel.js'
import { TOKEN_SECRET } from '../config/serverConfig.js'
import jwt from 'jsonwebtoken'
import { sendMail } from '../utils/send-mail.js'
import { nameGenerator } from '../utils/nameGenerator.js'

const register = asyncHandler(
    async (req, res) => {
        const { email, password, role, name } = req.body
        if ([email, password, role].some(field => field?.trim === ''))
            throw new ApiError(400, 'Please provide all required fields')

        const existedUser = await User.findOne({ email })

        if (existedUser)
            throw new ApiError(409, "User with email already exists")

        const excludedDomains = [
            "gmail.com",
            "yahoo.com",
            "hotmail.com",
            "outlook.com",
            "aol.com",
            "icloud.com",
            "zoho.com",
            "mail.com",
            "protonmail.com",
            "yandex.com",
            "gmx.com",
            "tutanota.com",
            "mail.ru",
            "rambler.ru",
            "bk.ru",
            "list.ru",
            "inbox.ru",
            "yandex.ru",
            "ya.ru",
            "narod.ru",
            "hotmail.ru",
            "live.ru",
            // many more
        ];

        const room = email.split('@')[1];
        const domain = room.toLowerCase();

        if (excludedDomains.includes(domain)) {
            throw new ApiError(400, "Please provide university email")
        }

        const username = nameGenerator()

        const user = await User.create({
            username,
            email,
            password,
            room,
            role,
            name: name || username
        })

        const createdUser = await User.findById(user._id).select("-password -room -posts -channels")

        if (!createdUser)
            throw new ApiError(500, "Something went wrong while registering user")

        const token = await user.generateToken()

        //! Send email verification
        sendMail(email, await createdUser.generateToken())
        return res.status(201).json(
            new ApiResponse(200, { token }, "User registered successfully")
        )
    }
)

const login = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body
        if ([email, password].some(field => field?.trim === ''))
            throw new ApiError(400, 'Please provide all required fields')

        const user = await User.findOne({ email })

        if (!user)
            throw new ApiError(404, "User with email does not exist")

        if (!user.status) {
            //! Send email verification
            sendMail(email, await user.generateToken())
            throw new ApiError(401, "User is not verified", await user.generateToken())
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password)

        if (!isPasswordCorrect)
            throw new ApiError(401, "Password is incorrect")

        const token = await user.generateToken()

        const loggedInUser = await User.findById(user._id).select("-password -room -posts -channels")

        const options = {
            httpOnly: true,
            secure: true,
        }
        return res
            .status(200)
            .cookie("token", token, options)
            .json(new ApiResponse(200, { loggedInUser, token }, "User logged in successfully"))
    }
)

const logout = asyncHandler(async (req, res) => {

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("token", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})

// TODO: Implement forgot password
const forgotPassword = asyncHandler(
    async (req, res) => {
        return res.status(200).json(
            new ApiResponse(200, {}, "User forgot password successfully")
        )
    }
)

const me = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user._id).select("-password -room -posts -channels")
        if (!user)
            throw new ApiError(404, "User not found")

        return res.status(200).json(
            new ApiResponse(200, user, "User retrieved successfully")
        )
    }
)

const verify = asyncHandler(
    async (req, res) => {
        const { token } = req.params
        const decoded = await jwt.verify(token, TOKEN_SECRET)

        if (!decoded)
            throw new ApiError(401, "Invalid token")

        const user = await User.findById(decoded._id)

        if (!user)
            throw new ApiError(404, "User not found")

        user.status = true

        await user.save()

        return res.status(200).json(
            new ApiResponse(200, {}, "User verified successfully")
        )
    }
)

export {
    register,
    login,
    logout,
    forgotPassword,
    verify,
    me
}