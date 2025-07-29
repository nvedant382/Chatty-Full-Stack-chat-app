import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
        return res.status(400).json({ message: "All Fields are required" })
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    const user = await User.findOne({ email })

    if (user) {
        return res.status(400).json({ message: "User already exists" })
    }

    const newUser = new User({
        email,
        fullName,
        password
    })

    if (newUser) {
        generateToken(newUser._id, res)
        await newUser.save();

        return res.status(201).json({
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        })
    } else {
        return res.json(400).json({ message: "Invalid User data" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" })
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Credentials" })
    }

    generateToken(user._id, res);

    return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
    })
}

export const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout Successfully" })
}

export const updateProfile = async (req, res) => {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
        return res.json(400).json({ message: "Profile Pic is required" })
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });

    return res.status(200).json(updateUser);
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}