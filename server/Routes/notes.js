import express from "express";
import NotesController from "../Controllers/NotesController.js";
import multer from "multer";
import fs from "fs";
import {protect} from '../Middleware/authMiddleware.js'
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./files";
        fs.mkdirSync(destinationPath, { recursive: true });
        
        if (!fs.existsSync(destinationPath)) {
            throw new Error(`Directory ${destinationPath} does not exist`);
        }
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({
    storage: storage
});

// Routes
router.post("/upload", protect, upload.single("file"), NotesController.uploadNote);
router.get("/getFiles", protect, NotesController.getNote);
router.get("/getFiles/:id", protect, NotesController.getNoteByID);

export default router;