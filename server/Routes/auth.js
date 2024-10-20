import express from "express";
import authController from "../Controllers/AuthController.js";
import multer from "multer";
import path from "path"; // Import path for handling file paths
import fs from "fs"; // Import fs for file system operations
import { fileURLToPath } from "url";
import { protect } from "../Middleware/authMiddleware.js";

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express router
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filesPath = path.resolve(__dirname, "../files");

    // Ensure the directory exists or create it
    if (!fs.existsSync(filesPath)) {
      fs.mkdirSync(filesPath, { recursive: true });
    }

    cb(null, filesPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});

router.post(
  "/signup",
  upload.single("profileImage"), // This middleware handles the file upload
  authController.signup // This will run after the file upload is successful
);

router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.put("/change-password", authController.changePassword);
router.put(
  '/update',
  protect,
  upload.single('profileImage'), // Add this middleware
  authController.update
);

export default router;
