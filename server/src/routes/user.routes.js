import { Router } from "express";

import { getUser, getUserPosts, getUserChannels, getAllUsers } from "../controllers/userController.js";
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/allusers").get(
    verifyJWT,
    getAllUsers
)

router.route("/me").get(
    verifyJWT,
    getUser
)

router.route("/posts").get(
    verifyJWT,
    getUserPosts
)

router.route("/channels").get(
    verifyJWT,
    getUserChannels
)

export default router;