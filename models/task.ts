import { Schema, model } from "mongoose";
import { Task } from "../interfaces/tasks";

const TaskSchema = new Schema<Task>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    until: {type: String, required: true},
    tags: {type: [String], required: true},
    persons: {type: [String], required: true},
})

export const TaskModel = model<Task>('Task', TaskSchema);