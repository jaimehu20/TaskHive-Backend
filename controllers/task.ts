import { addTask, deleteTask, editTask } from "../services/user"
import express, { Request, Response, NextFunction } from "express"

export const TaskController = express.Router();

TaskController.post("/tasks/:id", async (request: Request, response: Response, next: NextFunction) : Promise<void> => {
    try {
        const id = request.params.id;
        const data = request.body;
        const task = await addTask(id, data);
        response.json({task})
    } catch(error) {
        console.error(error);
        next(error)
    }
});

TaskController.patch("/tasks/:id/:taskId", async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = request.params.id;
        const taskId = request.params.taskId;
        const task = request.body;
        const updatedTask = await editTask(userId, taskId, task);
        response.json({updatedTask})
    } catch (error) {
        console.error(error)
        next(error)
    }
});

TaskController.delete("/tasks/:id/:taskId", async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = request.params.id;
        const taskId = request.params.taskId;
        const deletedTask = await deleteTask(userId, taskId)
        response.json({deletedTask})
    } catch (error) {
        console.error(error)
        next(error)
    }
})