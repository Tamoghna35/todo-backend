import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    title: {
        type:String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["todo", "in progress", "completed"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true })

export const Todo = mongoose.model("Todo", todoSchema)