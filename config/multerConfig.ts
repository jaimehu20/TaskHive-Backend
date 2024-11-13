import multer from "multer";
import path from "path";

export const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });