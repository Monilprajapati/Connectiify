import { Router } from "express";

import { getPosts, createPost, updatePost, deletePost } from "../controllers/postController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/all').get(
    verifyJWT,
    getPosts
)

router.route('/create').post(
    verifyJWT,
    upload.fields([
        {
            name: 'postImage', // should match the HTML file input name
            maxCount: 1
        },
    ]),
    createPost
)

router.route('/update/:postId').patch(
    verifyJWT,
    updatePost
)

router.route('/delete/:postId').delete(
    verifyJWT,
    deletePost
)

export default router;