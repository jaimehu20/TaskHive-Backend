import express, { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user";
import { registerUser } from "../services/register";
import mongoose from "mongoose";
const bcrypt = require('bcryptjs')

export const RegisterController = express.Router();

RegisterController.post("/users", async (request: Request, response: Response, next: NextFunction): Promise<void> => {
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
    } catch (error: any) {
        if (error instanceof mongoose.Error.ValidationError) {
            response.status(400).json({ message: 'Validation error:' + error.message })
        } else if (error.code === 11000) {
            response.status(400).json({ message: 'Email already in use' });
        } else {
            response.status(500).json({ message: "Error registering user: " + error.message })
        }
    }
})