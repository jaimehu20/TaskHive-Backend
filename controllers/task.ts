/*import { getTasks, getTask } from "../services/task";
import express, { Request, Response, NextFunction } from "express"

export const TaskController = express.Router();

TaskController.get("/tasks", async (request: Request, response: Response, next: NextFunction) : Promise<any> => {
    try {
        const allTasks = await getTasks();
        return response.json({allTasks})
    } catch(error) {
        console.log(error);
        next(error)
    }
})

TaskController.get("/tasks/:id", async (request: Request, response: Response, next: NextFunction) : Promise<any> => {
    try {
        const id = request.params.id;
        const task = await getTask(JSON.parse(id));
        return response.json({task})
    } catch(error) {
        console.log(error);
        next(error)
    }
}) */