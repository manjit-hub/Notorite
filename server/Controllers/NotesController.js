import dotenv from "dotenv";
import Notes from "../Models/Notes.js"; // Add `.js` extension
import multer from "multer";
import { uploadToCloudinary } from "../Middleware/uploadImg.js";

dotenv.config();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// uploadNote function
const uploadNote = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const uploadedBy = req.body.userId;

        console.log(req.file);

        const localFilePath = req.file.path;
        const originalname = req.file.originalname;
        const cloudFileUrl = await uploadToCloudinary(localFilePath, originalname);
        console.log(cloudFileUrl);

        const newFile = new Notes({
            fileName: title,
            fileDescription: description,
            tags: tags,
            files: cloudFileUrl.secure_url, // Save the URL returned by Cloudinary
            uploadedBy: uploadedBy,
        });

        await newFile.save();

        res.status(201).send({ status: "Success", data: newFile });
        console.log("File uploaded and saved to MongoDB successfully:", newFile);
    } catch (error) {
        console.error("Error uploading file:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// getNote function
const getNote = async (req, res) => {
    try {
        const { title, tag } = req.query;
        const query = {};

        if (title) {
            query.$or = [
                { fileName: { $regex: title, $options: "i" } },
                { tags: { $regex: title, $options: "i" } }, 
            ];
        }

        const data = await Notes.find(query).populate('uploadedBy', 'firstName lastName');
        res.send({ data: data });

    } catch (error) {
        console.log(error);
    }
};

// getNoteByID function
const getNoteByID = async (req, res) => {
    try {
        const userId = req.params.id;

        await Notes.find({
            uploadedBy: userId
        }).then(data => {
            res.send({ data: data });
        });
    } catch (error) {
        console.log(error);
    }
};

export default {getNote, getNoteByID, uploadNote};
