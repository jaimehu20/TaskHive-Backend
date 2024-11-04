import express, { NextFunction, Request, Response } from "express";
import { getUser, getUsers, updatePreferences } from "../services/user";

export const UserController = express.Router();

UserController.patch("/first-steps/:id", async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const id = request.params.id;
        const data = request.body;
        const preferences = await updatePreferences(id, data);
        return response.json({preferences})
    } catch (error) {
        next(error)  
    }
})

UserController.get("/users", async (request: Request, response: Response, next: NextFunction) : Promise<any> => {
    try {
        const allUsers = await getUsers();
        return response.json({allUsers})
    } catch(error) {
        console.error(error);
        next(error)
    }
})

UserController.get("/users/:id", async (request: Request, response: Response, next: NextFunction) : Promise<any> => {
    try {
        const id = request.params.id;
        const user = await getUser(id);
        return response.json({user})
    } catch(error) {
        console.error(error);
        next(error)
    }
})