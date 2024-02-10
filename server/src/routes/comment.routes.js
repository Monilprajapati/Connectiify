import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getComments, createComment, updateComment, deleteComment } from "../controllers/commentController.js";

const router = Router();

router.route('/:postId').get(
    verifyJWT,
    getComments
)

router.route('/create').post(
    verifyJWT,
    createComment
)

router.route('/update/:commentId').patch(
    verifyJWT,
    updateComment
)

router.route('/delete/:commentId').delete(
    verifyJWT,
    deleteComment
)

export default router;