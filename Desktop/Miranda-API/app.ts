import express, { Request, Response } from "express"
import {BookingsController } from "./controllers/booking"
import { RoomController } from "./controllers/room"
import { UserController } from "./controllers/user"
import { ContactController } from "./controllers/contact"
import { LoginController } from "./controllers/login"
import { verifyAccessToken } from "./middleware/auth"
import { errorHandler } from "./utils/ErrorHandler"


export const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send("Welcome to: <h1>Miranda API</h1> This are available endpoints: <ul> <li>/login</li> <li>/bookings</li> <li>/bookings/:id</li> <li>/rooms</li> <li>/rooms/:id</li> <li>/users</li> <li>/users/:id</li> <li>/customer-reviews</li> <li>/customer-reviews/:id</li> </ul>")
})



app.use("/", LoginController)
app.use("/", verifyAccessToken, BookingsController);
app.use("/", verifyAccessToken, RoomController);
app.use("/", verifyAccessToken, UserController)
app.use("/", verifyAccessToken, ContactController)

app.use(errorHandler)