import mongoose from "mongoose";

const OTPSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 30 * 60,
    },
});

const OTP = mongoose.model("OTP", OTPSchema);
export default OTP;