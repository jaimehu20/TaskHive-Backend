import { app } from "./app"

export const server = app.listen(3000, () => {
    console.log("server is actually running on port", 3000);
});