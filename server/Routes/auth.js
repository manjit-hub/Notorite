import express from "express";
import authController from "../Controllers/AuthController.js";
import multer from "multer";

// Initialize express router
const router = express.Router();

const storage = multer.memoryStorage()

const upload = multer({ storage: storage, dest: 'uploads/' });

router.post("/signup", upload.single("profileImage"), authController.signup);
router.post("/login", authController.login);

export default router;
