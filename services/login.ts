import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { UserModel } from "../models/user";

const bcrypt = require('bcryptjs')

dotenv.config();
const secretToken = process.env.SECRET_TOKEN

export async function login(data: {email: string, password: string}){
    const { email, password } = data;

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials")
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials")
    }
    const userData = { email, password };
    const token = jwt.sign(userData, secretToken as string, {expiresIn: "30m"});
    return { message: "login successful", token, id: user._id.toString() };
}