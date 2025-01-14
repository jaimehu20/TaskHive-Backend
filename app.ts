import express, {Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import { UserController } from "./controllers/user";
import { RegisterController } from "./controllers/register"
import { TaskController } from "./controllers/task";
import { LoginController } from "./controllers/login";
import { verifyAccessToken } from "./middleware/auth";
import path from 'path';

export const app = express();
dotenv.config();

const connection = require('./connection')

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("<h1>Task Hive</h1> <p>Bienvenidos a la API de Task Hive, estos son sus endpoints disponibles:</p> <ul> <li>/users</li> <li>/users/:id</li> <li>/tasks</li> <li>/tasks/:id</li> </ul>");
});

app.options("/*", (req: Request, res: Response) => { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
    res.send(); 
});

app.listen(3000, () => {
    console.log("server is actually running on port", 3000);
});

app.use("/", LoginController)
app.use("/", RegisterController)
app.use("/", verifyAccessToken, UserController); 
app.use("/", verifyAccessToken, TaskController);