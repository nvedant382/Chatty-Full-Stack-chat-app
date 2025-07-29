import Joi from "joi"

export const registerSchema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
    fullName: Joi.string().min(3).max(100).required().trim(),
    password: Joi.string().min(6).required(),
    profilePic: Joi.string().uri().optional(),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
});