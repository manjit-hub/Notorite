import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userBio: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;