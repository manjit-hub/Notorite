import React, { useState } from "react";
import { setUserData } from "../Redux/slices/user-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useAxios } from "../hooks/useAxios";
import GoogleImage from '../../public/7123025_logo_google_g_icon.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axios = useAxios();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      console.log("LogIn button Clicked");
      const user = {
        userEmail,
        userPassword,
      };
      const result = await axios.post('/auth/login', user);
      if (result.data.status === "Error") {
        toast.error("wrong credentials");
        console.log("Error while Log in !!")
      } else {
        toast.success("User Logged in Successfully!");
        console.log("User Logged in Successfully: ", result);
        dispatch(setUserData(result.data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error("Login failed!");
      console.log("Cannot log in the user: ", error);
    }
  };

  return (
    <div className="h-heightWithoutNavbar flex w-full items-center justify-center p-5 bg-gray-100 dark:bg-stone-800">
      <form
        className="flex w-full max-w-[420px] flex-col gap-4 rounded-xl bg-gray-200 dark:bg-stone-700 p-5 shadow-xl justify-between"
        onSubmit={loginUser}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold text-gray-900 dark:text-white" htmlFor="userEmail">Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="w-full rounded-lg border border-gray-400 bg-gray-100 dark:bg-stone-700 p-2 focus:ring focus:ring-blue-500 text-gray-900 dark:text-gray-200"
              placeholder="your.email@example.com"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold text-gray-900 dark:text-white" htmlFor="userPassword">Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border border-gray-400 bg-gray-100 dark:bg-stone-700 p-2 focus:ring focus:ring-blue-500 text-gray-900 dark:text-gray-200"
              placeholder="*********"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600" type="submit">
          Log In
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center bg-white text-black border border-gray-300 px-4 py-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-gray-100"
        >
          <img
            src={GoogleImage}
            alt="Google Logo"
            className="mr-3 w-6 h-6"
          />
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <p className="">New to Notorite?</p>
          <Link to="/signup">
            <p className="font-bold hover:underline">Create an account</p>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;