import Router from "express";
import { createTodo,getAllTasksforUser } from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/createTodo").post(verifyJWT, createTodo);
router.route("/getAllTasksforUser").get(verifyJWT, getAllTasksforUser);
export default router;