import User from "../Models/User.js"; 
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken"; 
import { uploadToCloudinary } from "../Middleware/uploadImg.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const signup = async (req, res) => {
    // console.log("Signup endpoint hit");
    // console.log(req.body);
    // console.log(req.file); 

    try {
        const { firstName, lastName, userBio, userEmail, userName, userPassword } = req.body;

        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(401).json({ error: "User Already Exists with this email" });
        }

        console.log("Starting image upload to Cloudinary");
        const result = await uploadToCloudinary(req.file);
        console.log(result);

        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(userPassword, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userName,
            userPassword: encryptedPassword,
            profileImage: result.secure_url,  
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, userEmail: newUser.userEmail },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            status: "Ok",
            user: newUser,
            token: token
        });

    } catch (error) {
        console.log(error);
        console.error("Error in signup:", error);
        res.status(500).json({ error: error.message }); 
    }
};


// Login Route
const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, userEmail: user.userEmail },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            status: "Ok",
            user: user,
            token: token,  
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

export default { signup, login };
