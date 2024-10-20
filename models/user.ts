import { Schema, model } from "mongoose";
import { User } from "../interfaces/user";

const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    birthdate: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

export const UserModel = model<User>('User', UserSchema);