import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import responseLogger from "./middlewares/loggerInfo.js"
import userRouter from "./routes/user.route.js"
import todoRouter from "./routes/todo.route.js"
import globalErrorHandler from "./middlewares/globalErrorHandler.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
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