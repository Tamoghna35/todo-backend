import { Router } from "express";
import { registerUser, loginUser, logout } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/registerUser").post(registerUser)
router.route("/logIn").post(loginUser)
router.route("/logout").post(verifyJWT, logout)

export default router;