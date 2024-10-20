import User from "../Models/User.js";
import OTP from "../Models/Otp.js";
import PasswordReset from "../Models/PasswordReset.js";
import cryptojs from "crypto-js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import path from "path";
import sendMail from "../utils/mailSender.js";
import forgotPasswordTemplate from "../MailTemplates/forgotPassword.js";
import otpTemplate from "../MailTemplates/otpTemplate.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const signup = async (req, res) => {
  try {
    const { firstName, lastName, userBio, userEmail, userName, userPassword } =
      req.body;

    if (!userEmail.endsWith("@gmail.com")) {
      return res
        .status(400)
        .json({ error: "Invalid email domain. Must be @gmail.com" });
    }

    if (userPassword.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res
        .status(401)
        .json({ error: "User Already Exists with this email" });
    }

    // console.log(req.body);
    // console.log(req.file);

    console.log("Starting image upload to Cloudinary");
    const localFilePath = req.file.path;
    const originalname = req.file.originalname;
    console.log(localFilePath, originalname);
    const result = await cloudinary.uploader
      .upload(localFilePath, {
        public_id: path.parse(originalname).name, // Use the original name without extension
        resource_type: "auto", // Automatically determine the resource type (image, video, etc.)
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(result);

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(userPassword, saltRounds);

    console.log("1");

    const newUser = await User.create({
      firstName,
      lastName,
      userBio,
      userEmail,
      userName,
      userPassword: encryptedPassword,
      profileImage: result.secure_url,
    });

    const token = jwt.sign(
      { userId: newUser._id, userEmail: newUser.userEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: "Ok",
      user: newUser,
      token: token,
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

// Forgot password route
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (email.length === 0) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await User.findOne({ userEmail: email.trim().toLowerCase() });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User with this email not found" });
    }

    const resetToken = cryptojs.lib.WordArray.random(32).toString();
    const createdAt = Date.now();

    const passwordResetEntry = new PasswordReset({
      userId: user._id,
      token: resetToken,
      createdAt: createdAt,
    });

    await passwordResetEntry.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const htmlContent = forgotPasswordTemplate(user.firstName, resetUrl);

    await sendMail(
      user.userEmail,
      "Reset Your Password and Get Back Into Your Notorite Account",
      htmlContent
    );

    res
      .status(200)
      .json({ status: "Ok", message: "Check your email for the reset link" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// Reset password route
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const passwordResetEntry = await PasswordReset.findOne({ token });
    if (!passwordResetEntry) {
      return res.status(400).json({ error: "Token is invalid or has expired" });
    }

    const user = await User.findById(passwordResetEntry.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.userPassword = hashedPassword;
    await user.save();

    await PasswordReset.deleteOne({ _id: passwordResetEntry._id });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const sendOtp = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Deleting existing OTP for the email
    await OTP.findOneAndDelete({ userEmail });

    const newOtp = new OTP({ userEmail, otp, createdAt: Date.now() });
    await newOtp.save();

    const htmlContent = otpTemplate(userEmail, otp);
    await sendMail(
      userEmail,
      "Verify your email address for Notorite",
      htmlContent
    );

    res.status(200).json({ status: "Ok", message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    const existingOtp = await OTP.findOne({ userEmail });

    if (!existingOtp) {
      return res
        .status(404)
        .json({ error: "OTP not found. Please request a new OTP" });
    }

    if (existingOtp.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    await OTP.deleteOne({ userEmail });

    res
      .status(200)
      .json({ status: "Ok", message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const update = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { firstName, lastName, userBio, userName, password } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Password comparison only if password is provided in the request
    if (password) {
      if (!user.userPassword) {
        return res.status(400).json({ error: "Please Enter Password to Verify" });
      }

      const passwordMatch = await bcrypt.compare(password, user.userPassword);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
    }

    // Handle profile image upload if provided
    if (req.file) {
      console.log("Uploading profile image to Cloudinary...");
      try{
        const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: `profile_images/${userId}`,
          resource_type: "image",
        });
        user.profileImage = result.secure_url;
        console.log("Image uploaded successfully:", result.secure_url);
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }

    // Update user fields only if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (userBio) user.userBio = userBio;
    if (userName) user.userName = userName;

    // Save the updated user in the database
    const updatedUser = await user.save();
    console.log("User successfully updated:", updatedUser);

    res.status(200).json({
      message: "User updated successfully",
      userData: { user: updatedUser, token },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "Authentication token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Both current and new passwords are required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: "New password must be at least 8 characters long" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.userPassword = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Session expired. Please login again." });
    }

    console.error("Error changing password:", error);
    res.status(500).json({ error: "An error occurred while changing password" });
  }
};

export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
  sendOtp,
  verifyOtp,
  update,
  changePassword,
};
