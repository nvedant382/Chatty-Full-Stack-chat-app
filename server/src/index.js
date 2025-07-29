import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import messageRouter from "./routes/message.route.js"

import { app, server } from "./lib/socket.js"
import path from "path"
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

if (process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    }))
}

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter);
app.use(globalErrorHandler)

const PORT = process.env.PORT

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")))

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
})