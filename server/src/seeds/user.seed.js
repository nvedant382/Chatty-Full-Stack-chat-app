import { config } from "dotenv";
config();

const seedUsers = [
    // … your existing 16 users …

    // 8 Indian demo users
    {
        email: "arjun.kumar@example.com",
        fullName: "Arjun Kumar",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
        email: "priya.sharma@example.com",
        fullName: "Priya Sharma",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        email: "rahul.singh@example.com",
        fullName: "Rahul Singh",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
    },
    {
        email: "neha.patel@example.com",
        fullName: "Neha Patel",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        email: "vikram.verma@example.com",
        fullName: "Vikram Verma",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/70.jpg",
    },
    {
        email: "ananya.das@example.com",
        fullName: "Ananya Das",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/72.jpg",
    },
    {
        email: "rishi.kapoor@example.com",
        fullName: "Rishi Kapoor",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/74.jpg",
    },
    {
        email: "isha.malhotra@example.com",
        fullName: "Isha Malhotra",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/74.jpg",
    },
];

import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

const seedDatabase = async () => {
    try {
        await connectDB();
        await User.insertMany(seedUsers)
        console.log("Database added successfully")
    } catch (error) {
        console.log("Error seeding database", error)
    }
}

seedDatabase()