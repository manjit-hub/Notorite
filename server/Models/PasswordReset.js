import mongoose from "mongoose";
import User from "./User.js";

const passwordResetSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 2 * 60 * 60 * 1000,
    },
});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);
export default PasswordReset;