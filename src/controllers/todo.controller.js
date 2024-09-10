import asyncHandler from "../utils/asyncHandler.js";
import {Todo} from "../models/todo.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createTodo = asyncHandler(async (req, res) => {
    console.log("User request Id ==> ", req.verifyuser._id);
    
    const { title, description, status } = req.body;
    if(!title || !description || !status) {
        return next(new ApiError(400, "All data are required"));
    }
    const existingTask = await Todo.findOne({
        $and: [{ title }, { description }]
    })
    if(existingTask) {
        return next(new ApiError(409, "Task with same title and description is already exist"));
    }
    const newTask = await Todo.create({
        title,
        description,
        status,
        user: req.verifyuser._id
    })
    if(!newTask) {
        return next(new ApiError(400, "Task is unable to create"));
    }
    return res.status(201)
    .json(new ApiResponse(201, newTask, "Task created successfully"));
});
 
const getAllTasksforUser = asyncHandler(async (req, res) => { 
    const task = await Todo.find({ user: req.verifyuser._id });
    console.log("Task===>", task);

    const allTasks = task.map((task) => (
        {
            title: task.title,
            description: task.description,
            status: task.status
        }
    ));

    if(!allTasks) {
       throw new ApiError(400, "No task found for user");
    }
    return res.status(200).
    json(new ApiResponse(200, allTasks, "All tasks for user"));
});

const updateTask = asyncHandler(async (req, res) => {
    
 })

export { createTodo,getAllTasksforUser,updateTask };