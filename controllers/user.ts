import express, { NextFunction, Request, Response } from "express";
import { getUser, getUsers, updatePreferences } from "../services/user";
import { Preferences, UpdatePreferencesResponse } from "../interfaces/user";

export const UserController = express.Router();

UserController.patch("/first-steps/:id", async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const id: string = request.params.id;
        const data: Preferences = request.body;
        const preferences = await updatePreferences(id, data);
        response.json({preferences})
    } catch (error) {
        next(error)  
    }
})

UserController.get("/users", async (request: Request, response: Response, next: NextFunction) : Promise<void> => {
    try {
        const allUsers = await getUsers();
        response.json({allUsers})
    } catch(error) {
        console.error(error);
        next(error)
    }
})

UserController.get("/users/:id", async (request: Request, response: Response, next: NextFunction) : Promise<void> => {
    try {
        const id = request.params.id;
        const user = await getUser(id);
        response.json({user})
    } catch(error) {
        console.error(error);
        next(error)
    }
})