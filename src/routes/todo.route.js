import Router from "express";
import { createTodo,getAllTasksforUser,updateTask,deleteTask } from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/createTodo").post(verifyJWT, createTodo);
router.route("/getAllTasksforUser").get(verifyJWT, getAllTasksforUser);
router.route("/updateTask").post(verifyJWT,updateTask);
router.route("/deleteTask").delete(verifyJWT,deleteTask);
export default router;