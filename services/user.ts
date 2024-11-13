import { Preferences, Task, User, UserDocument } from "../interfaces/user";
import { UserModel } from "../models/user";
import { gfs } from "../config/gridFSConfig";
import { GridFSBucketWriteStream } from "mongodb"
import mongoose from "mongoose";

export async function getUsers(): Promise<User[]> {
    const users = UserModel.find();
    return users
}

export async function getUser(id: string): Promise<User> {
    try {
        const user = await UserModel.findById({_id : id});
        if (!user) {
            throw new Error("No user found")
        }
        return user
    } catch (error) {
        throw new Error("Invalid user ID")
    }
} 

export async function addTask(id: string, tasks: Task): Promise<UserDocument | null> {
    try {
        const data = UserModel.findByIdAndUpdate(id, { $push: { tasks } }, {new: true});
        return data
    } catch (error: any) {
        throw new Error(`Error adding task: ${error.message}`)
    }
}

export async function editTask(id: string, taskId: string, updatedTask: Task): Promise<UserDocument | null> {
    try {
        const data = UserModel.findOneAndUpdate({_id: id, "tasks._id": taskId}, { $set: { "tasks.$": updatedTask } }, {new: true});
        return data
    } catch (error: any) {
        throw new Error(`Error while editing task: ${error.message}`)
    }
}

export async function deleteTask(id: string, taskId: string): Promise<UserDocument | null> {
    try {
        const data = UserModel.findByIdAndUpdate(id, { $pull: { tasks: { _id: taskId } } }, {new: true})
        return data
    } catch (error: any) {
        throw new Error(`Error while deleting task: ${error.message}`)
    }
}

export async function updatePreferences(id: string, preferences: Preferences): Promise<User | null> {
    try {
        const data = UserModel.findByIdAndUpdate(id, { preferences }, {new: true});
        return data
    } catch (error: any) {
        throw new Error(`Error adding/updating preferences: ${error.message}`)
    }
}

export async function updateProfilePic(userID: string, file: Express.Multer.File ) {
    if (!file) {
        throw new Error('No file uploaded');
    }

    const buffer = file.buffer;

    const fileDocument = {
        filename: file.originalname,
        contentType: file.mimetype,
        metadata: {userID},
        bucketName: 'profileImages'
    };

    if (gfs) {
        const uploadStream: GridFSBucketWriteStream = gfs.openUploadStream(file.originalname, fileDocument);
        uploadStream.on('finish', async () => {
            try {
                const fileID = uploadStream.id;
                const updatedUser = await UserModel.findByIdAndUpdate(userID, { $set: { 'profile.avatar': fileID } }, { new: true });
                return updatedUser;
            } catch (error: any) {
                throw new Error(`Error updating pic: ${error.message}`)
            }
        });

        uploadStream.end(file.buffer);
    }
}

export async function getProfilePic(avatarID: string) {
    try {
        return new Promise<Buffer>((resolve, reject) => {
            const objectId = new mongoose.Types.ObjectId(avatarID);
            const downloadStream = gfs?.openDownloadStream(objectId);
            let chunks: Buffer[] = [];

            downloadStream?.on('data', (chunk) => {
                chunks.push(chunk);
            });

            downloadStream?.on('end', () => {
                const imageBuffer = Buffer.concat(chunks);
                resolve(imageBuffer);
            });

            downloadStream?.on('error', (err) => {
                reject(new Error(`Error retrieving the image: ${err.message}`))
            });
        });
    } catch (error: any) {
        throw new Error(`Error retrieving profile picture: ${error.message}`)
    }
}
