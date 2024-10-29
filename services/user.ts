import { User } from "../interfaces/user";
import { UserModel } from "../models/user";

export async function updatePreferences(id: any, preferences: any): Promise<any> {
    try {
        const data = UserModel.findByIdAndUpdate(id, { preferences }, {new: true})
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getUsers(): Promise<User[]> {
    const users = UserModel.find();
    return users
}

export async function getUser(id: string): Promise<User> {
    try {
        const user = await UserModel.findById({_id : id})
        if (!user) {
            throw new Error("No user found")
        }
        return user
    } catch (error) {
        throw new Error("Invalid user ID")
    }
} 