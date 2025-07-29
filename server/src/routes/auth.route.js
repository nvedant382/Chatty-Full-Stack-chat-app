import express from "express"
import { validateSchema } from "../middlewares/validateSchema.js"
import { asyncWrapper } from "../middlewares/asyncWrapper.js"
import { loginSchema, registerSchema } from "../lib/user.schema.js"
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middlware.js"

const router = express.Router()

router.post("/signup", validateSchema(registerSchema), asyncWrapper(signup))

router.post("/login", validateSchema(loginSchema), asyncWrapper(login))

router.post("/logout", asyncWrapper(logout))

router.put("/update-profile", protectRoute, asyncWrapper(updateProfile))

router.get("/check", protectRoute, checkAuth)

export default router;