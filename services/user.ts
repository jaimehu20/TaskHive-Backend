import { User } from "../interfaces/user";
import { UserModel } from "../models/user";

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

export async function updatePreferences(id: any, preferences: any): Promise<any> {
    try {
        const data = UserModel.findByIdAndUpdate(id, { preferences }, {new: true});
        return data
    } catch (error: any) {
        throw new Error(`Error adding/updating preferences: ${error.message}`)
    }
}

export async function addTask(id: any, tasks: any): Promise<any> {
    try {
        const data = UserModel.findByIdAndUpdate(id, { $push: { tasks } }, {new: true});
        return data
    } catch (error: any) {
        throw new Error(`Error adding task: ${error.message}`)
    }
}

export async function editTask(id: any, taskId: any, updatedTask: any): Promise<any> {
    try {
        const data = UserModel.findOneAndUpdate({_id: id, "tasks._id": taskId}, { $set: { "tasks.$": updatedTask } }, {new: true});
        return data
    } catch (error: any) {
        throw new Error(`Error while editing task: ${error.message}`)
    }
}

export async function deleteTask(id: any, taskId: any): Promise<any> {
    try {
        const data = UserModel.findByIdAndUpdate(id, { $pull: { tasks: { _id: taskId } } }, {new: true})
        return data
    } catch (error: any) {
        throw new Error(`Error while deleting task: ${error.message}`)
    }
}