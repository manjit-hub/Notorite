import axios from "axios";
import "dotenv";

const signup = async (e) => {
  try {
    e.preventDefault();

    if (!isEmailVerified) {
      toast.error("Please verify your email before registering.");
      return;
    }
    if (!userEmail.endsWith("@gmail.com")) {
      toast.error("Invalid email domain. Must be @gmail.com");
      return;
    }

    if (userPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("userBio", userBio);
    formData.append("userEmail", userEmail);
    formData.append("userName", userName);
    formData.append("userPassword", userPassword);
    formData.append("profileImage", profileImage);

    const result = await axios.post(
      `${process.env.VITE_BACKEND_URL}/auth/signup`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    toast.success("User Entry Saved in Database");
    console.log("Data: ", result);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  } catch (error) {
    toast.error("Failed to Register User");
    console.log("Failed to Register User: ", error);
  }
};

export default signup;
