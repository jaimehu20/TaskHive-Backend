import { User } from "../interfaces/user"
import { UserModel } from "../models/user"

export async function registerUser(user: User){
    const registeredUser = UserModel.insertMany(user);
    return registeredUser
}