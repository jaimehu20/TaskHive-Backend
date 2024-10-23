import { User } from "../interfaces/user";
import { UserModel } from "../models/user";

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