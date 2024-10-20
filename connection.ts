import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_KEY = process.env.ACCESS_KEY;

const connection = `mongodb+srv://jaimehudev:${ACCESS_KEY}@taskhive.vatet.mongodb.net/TaskHive`;

mongoose.connect(connection)
.then( () => {
    console.log('Successfully connected to the database.')
})
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})