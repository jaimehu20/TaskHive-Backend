import express, { NextFunction, Request, Response } from "express";
import { getTasksByDate, getUser, getUsers, updatePreferences, updateProfilePic } from "../services/user";
import { Preferences } from "../interfaces/user";
import multer from "multer";

export const UserController = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage })

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
        const id: string = request.params.id;
        const user = await getUser(id);
        response.json({user})
    } catch(error) {
        console.error(error);
        next(error)
    }
})

UserController.post("/upload-profile-image/:id", upload.single("profileImage"), async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const id: string = request.params.id;
        const file = request.file;

        if (!file) {
            response.status(400).json({ message: "No file uploaded" })
        }

        const updatedUser = await updateProfilePic(id, file as Express.Multer.File);
        response.json({ message: "Profile picture updated successfully", avatar: updatedUser?.profile?.avatar })
    } catch (error) {
        console.error(error);
        next(error)
    }
})

UserController.get("/users/:id/tasks", async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const id: string = request.params.id;
        const { date } = request.query;

        if (!date || typeof date !== 'string') {
            response.status(400).json({ error: 'La fecha es obligatoria y debe ser un string válido' });
        }

        const parsedDate = new Date(date as string);
        if (isNaN(parsedDate.getTime())) {
            response.status(400).json({ error: 'La fecha proporcionada no es válida' });
        }

        const tasks = await getTasksByDate(id, parsedDate);
        response.json({ tasks });
    } catch (error: any) {
        console.error(error);
        next(error);
    }
});