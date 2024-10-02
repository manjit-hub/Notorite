import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userBio: "",
    userEmail: "",
    userName: "",
    userPassword: "",
    profileImage:null
  });
  const formRef = useRef()
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (formRef.current.checkValidity() && profileImage instanceof File) {
      try {

        const formData = new FormData();

        Object.entries(userData).map(([key, value]) => {
          formData.append(`${key}`, value)
        });
        formData.append("profileImage", profileImage);

        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("User Entry Saved in Database");
        setTimeout(() => {
          navigate("/login");
        }, 1000);

      } catch (error) {
        toast.error("Failed to Register User");
        console.log("Failed to Register User: ", error);
      }
    } else {
      // Show error message or highlight missing fields
      formRef.current.reportValidity() ? toast.info("Please select profile image") : toast.error("Sign up form failed");

    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  return (
    <div className="pt-5 pb-5 bg-stone-800 flex w-full items-center justify-center">
      <form ref={formRef} className="flex h-full w-full max-w-[420px] flex-col rounded-xl bg-stone-700 gap-3 p-5" onSubmit={registerUser}>
        <h1 className="text-2xl font-black text-white">Register</h1>

        <div className="flex items-start justify-center gap-4">
          <div className="flex flex-col">
            <label className="font-bold text-white" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
              placeholder="John"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-white" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Doe"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-bold text-white" htmlFor="userBio">Bio</label>
          <textarea
            id="userBio"
            rows="3"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Tell us something about yourself"
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="font-bold text-white" htmlFor="userEmail">Email</label>
          <input
            type="email"
            id="userEmail"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            placeholder="your.email@example.com"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-bold text-white" htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            placeholder="johndoe123"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-bold text-white" htmlFor="userPassword">Password</label>
          <input
            type="password"
            id="userPassword"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            placeholder="*********"
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Merged Profile Image Preview and Upload Area */}
        <div className="flex w-full flex-col items-center justify-center">
          <label
            htmlFor="profileImageUpload"
            className="flex cursor-pointer flex-col items-center justify-center border-gray-400 border-2 rounded-full overflow-hidden w-48 h-48"
          >
            {profilePreviewImage ? (
              <>
                <img src={profilePreviewImage} alt="Profile Preview" className="w-full h-full object-cover" />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="text-sm font-semibold">Upload Profile Image</p>
              </div>
            )}
            <input
              type="file"
              id="profileImageUpload"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                setProfilePreviewImage(URL.createObjectURL(e.target.files[0]));
                handleInputChange(e)
              }}
            />
          </label>
          {profilePreviewImage && (
            <label htmlFor="profileImageUpload" className="text-white mt-2 cursor-pointer"> Change </label>
          )}
        </div>

        <button className="mt-4 rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600">
          Register
        </button>
        <div className="mt-4 text-sm text-gray-300 text-center">
          Already have an account?
          <Link to="/login" className="font-bold text-gray-300 hover:underline">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
