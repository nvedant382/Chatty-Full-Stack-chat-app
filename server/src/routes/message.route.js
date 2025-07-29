import express from "express"
import { protectRoute } from "../middlewares/auth.middlware.js";
import { getMessages, getUsersFromSideBar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersFromSideBar);
router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, sendMessage)

export default router;