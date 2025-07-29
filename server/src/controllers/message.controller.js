import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersFromSideBar = async (req, res) => {
    const loggedInId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInId } }).select("-password")

    res.status(200).json(filteredUsers)
}

export const getMessages = async (req, res) => {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId }
        ]
    })

    res.status(200).json(messages)
}

export const sendMessage = async (req, res) => {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    })

    await newMessage.save();

    // realtime functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage)
}