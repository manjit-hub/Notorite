import express from "express";
import authController from "../Controllers/AuthController.js";
import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

// Initialize express router
const router = express.Router();

// Configure dotenv
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./images";
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

// Initialize multer upload
const upload = multer({ storage: storage });

router.post("/signup", upload.single("profileImage"), authController.signup);
router.post("/login", authController.login);

export default router;
