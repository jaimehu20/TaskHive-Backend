import express, { NextFunction, Request, Response } from "express";
import { getUsers, getUser, registerUser } from "../services/user";
import { UserModel } from "../models/user";
const bcrypt = require('bcryptjs')

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

UserController.post("/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { name, lastname, birthdate, email, password } = request.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ 
            name, 
            lastname, 
            birthdate, 
            email, 
            password: hashedPassword 
          });
          const register = await registerUser(newUser)
          response.json("User registered succesfully.")
    } catch (error) {
        next(error)
    }
})