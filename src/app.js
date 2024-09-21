import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import responseLogger from "./middlewares/loggerInfo.js"
import userRouter from "./routes/user.route.js"
import todoRouter from "./routes/todo.route.js"
import globalErrorHandler from "./middlewares/globalErrorHandler.js"
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})

const app = express()
const allowedOrigins = ['http://localhost:5173']; 

console.log("CORS ORIGIN==>", process.env.CORS_ORIGIN);

app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin: allowedOrigins,
    // origin: '*',
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// Middleware for logging responses
app.use(responseLogger);
//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/todo", todoRouter)

app.use(globalErrorHandler)

export {app}