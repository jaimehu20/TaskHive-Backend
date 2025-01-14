import { Preferences, Task, User, UserDocument } from "../interfaces/user";
import { UserModel } from "../models/user";
import cloudinary from "../cloudinaryConfig"

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

export async function updateProfilePic(id: string, file: Express.Multer.File): Promise<UserDocument | null> {
    if (!file) {
        throw new Error('No file uploaded');
    }

    if (!file.mimetype.startsWith("image/")) {
        throw new Error("Invalid image file type");
    }

    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "profileImages",
            resource_type: "image"
        });

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $set: { "profile.avatar": result.secure_url } },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error: any) {
        throw new Error(`Error uploading profile picture: ${error.message}`);
    }
}

export async function getTasksByDate(id: string, date: Date): Promise<Task[] | any> {
    try {

        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const user = await UserModel.findById(id).select('tasks');
        if (!user || !user.tasks) {
            throw new Error('User not found or has no tasks')
        }

        const tasksOnDate = user.tasks.filter(task => {
            const taskDate = new Date(task.deadLine);
            return taskDate >= startOfDay && taskDate <= endOfDay;
        });

        return tasksOnDate;
    } catch (error: any) {
        throw new Error(`Error while getting tasks: ${error.message}`)
    }
}
