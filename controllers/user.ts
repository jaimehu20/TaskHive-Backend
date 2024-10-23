import express, { NextFunction, Request, Response } from "express";
import { getUsers, getUser } from "../services/user";

export const UserController = express.Router();

UserController.get("/users", async (request: Request, response: Response, next: NextFunction) : Promise<any> => {
    try {
        const allUsers = await getUsers();
        return response.json({allUsers})
    } catch(error) {
        console.log(error);
        next(error)
    }
})

UserController.get("/users/:id", async (request: Request, response: Response, next: NextFunction) : Promise<any> => {
    try {
        const id = request.params.id;
        const user = await getUser(id);
        return response.json({user})
    } catch(error) {
        console.log(error);
        next(error)
    }
})