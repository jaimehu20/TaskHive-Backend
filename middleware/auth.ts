import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
const secretToken = process.env.SECRET_TOKEN

export function verifyAccessToken(request: Request, response: Response, next: NextFunction): any{
    const header = request.get('Authorization');
    if (!header) {
        return response.status(401).json({error: true, message: "No auth header"})
    }
    const token = header.split('Bearer ')[1];
    try {
        const tokenData = jwt.verify(token, secretToken as string);
        next()
    } catch (error) {
        return response.status(401).json({ error: true, message: "Not authorized"})
    }
    return
}