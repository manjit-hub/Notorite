// Import statements (ESM syntax)
import express from "express";
import dotenv from "dotenv";
import User from "../Models/User.js"; // Add `.js` extension
import bcrypt from "bcrypt";
import multer from "multer";
import cloudinary from "cloudinary";

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

// Signup Route
const signup = async (req, res) => {
    try {
        const { firstName, lastName, userBio, userEmail, userMobile, userName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(401).send("User Already Exists with this email");
        }

        // Check if a profile image is provided
        if (!req.file) {
            return res.status(400).json({ error: "No Profile Image Provided" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        // console.log(result);

        const password = req.body.userPassword;
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: result.secure_url
        });

        await newUser.save();

        return res.status(200).json({
            status: "Ok",
            user: newUser
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

// Login Route
const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ userEmail });

        if (user) {
            const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
            if (passwordMatch) {
                return res.json(user);
            } else {
                console.log("password didn't matched!!");
                return res.json({ status: "Error", getUser: false });
            }
        } else {
            console.log("error found!!");
            return res.json({ status: "Error", getUser: false });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default {login, signup}