import axios from "axios";
import "dotenv";

// Auth Routes
const signup = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const result = await axios.post(
      `${process.env.VITE_BACKEND_URL}/auth/signup`,
      formData,
      config,
    );
    return result;
  } catch (error) {
    console.error("User not registered ", error);
  }
};

const login = async (user) => {
  try {
    const result = await axios.post(
      `${process.env.VITE_BACKEND_URL}/auth/login`,
      user,
    );
    if (result.data.status === "Error") {
      console.error("Error while Log in !!");
    } else {
      console.log("User Logged in Successfully: ", result);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    return result;
  } catch (error) {
    console.error("Cannot log in the user: ", error);
  }
};

const forgetPassword = async (forgotEmail) => {
  try {
    const result = await axios.post(
      `${process.env.VITE_BACKEND_URL}/auth/forgot-password`,
      {
        email: forgotEmail,
      },
    );
    if (result.data.status === "Ok") {
      console.log("Password reset email sent!");
    } else {
      console.error("Error sending reset email.");
    }
  } catch (error) {
    console.error("Failed to send reset email.", error);
  }
};

const resetPassword = async (resetPassword) => {
  try {
    const result = axios.post(
      `${process.env.VITE_BACKEND_URL}/auth/reset-password/:token"`,
      { newPassword: resetPassword },
    );
    if (result.data.status == "Error") {
      console.log("Error in reseting the password");
      return result;
    } else {
      console.log("Password reset successfully: ", result);
      return result;
    }
  } catch (error) {
    console.error("Error in resetting password", error);
  }
};

const sendOtp = async (useremail) => {
  try {
    const result = await axios.post(
      `${process.env.VITE_BACKEND_URL}/auth/send-otp`,
      {
        useremail,
      },
    );
    console.log("OTP send successfully");
    return result;
  } catch (error) {
    console.error("Error in sending OTP");
  }
};

const verifyOtp = (userEmail, otp) => {
  try {
    const result = axios.post(
      `${process.env.VITE_BACKEND_URL}/auth/verify-otp`,
      {
        userEmail,
        otp,
      },
    );
    console.log("Email verified successfully");
    return result;
  } catch (error) {
    console.error("Verification error", error);
  }
};

// Notes Routes

const upload = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const result = await axios.post(
      `${process.env.VITE_BACKEND_URL}/auth/upload`,
      formData,
      config,
    );
    console.log("Uploaded operation completed");

    return result;
  } catch (error) {
    console.error("Error in uploading the file ", error);
  }
};

const getFiles = async (token) => {
  try {
    const notes = await axios.get(
      `${process.env.VITE_BACKEND_URL}/notes/getFiles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          title: searchQuery,
        },
      },
    );
    return notes;
  } catch (error) {
    console.log("Error Fetching Notes: ", error);
  }
};

const getFilesById = async (userId, token) => {
  const result = await axios.get(
    `${process.env.Authorization}/notes/getFiles/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  // console.log(result.data);
  return result;
};

export default {
  signup,
  login,
  forgetPassword,
  resetPassword,
  sendOtp,
  verifyOtp,
  upload,
  getFiles,
  getFilesById,
};
