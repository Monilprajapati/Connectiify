import { Router } from "express";
import { register, login, logout, forgotPassword, verify, me } from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/logout').post(logout)

router.route('/forgotpassword').post(forgotPassword)

router.route('/verify/:token').get(verify)

router.route('/me').get(
    verifyJWT,
    me
)

export default router;