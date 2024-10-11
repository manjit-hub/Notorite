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

// Notes Routes

export default {
  signup,
  login,
  forgetPassword,
};
