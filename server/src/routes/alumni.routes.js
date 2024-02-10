import { Router } from "express";
import { getPosts, createPost, updatePost } from "../controllers/alumniController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/posts", verifyJWT, getPosts);
router.post("/posts",
    
    verifyJWT, createPost);
router.patch("/posts/:postId", verifyJWT, updatePost);

export default router;