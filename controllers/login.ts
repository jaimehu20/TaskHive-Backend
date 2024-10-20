import express, { Request, Response, NextFunction } from "express"
import { login } from "../services/login"

export const LoginController = express.Router();

LoginController.post("/login", async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = request.body;
        const result = await login({ email, password });
        return response.status(200).json(result);
    } catch (error) {
        return next(error)
    }
})