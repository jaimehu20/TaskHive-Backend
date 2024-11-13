import express, { NextFunction, Request, Response } from "express";
import { getProfilePic, getUser, getUsers, updatePreferences, updateProfilePic } from "../services/user";
import { Preferences } from "../interfaces/user";
import { upload } from "../config/multerConfig"

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

UserController.post('/upload-profile-image/:id', upload.single('profileImage'), async (request: Request, response: Response, next: NextFunction) => {
    const userID = request.params.id;
    const file = request.file;

    try {
        if (userID && file) {
            const avatarID = await updateProfilePic(userID, file)
            response.json({avatarID})
        }
    } catch(error) {
        console.error(error);
        next(error)
    }
})

UserController.get('/profile-image/:avatarID', async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const avatarID = request.params.avatarID;

    try {
        const imageBuffer = await getProfilePic(avatarID);
        response.contentType('image/png');
        response.send(imageBuffer)
    } catch (error) {
        next(error)
    }
})