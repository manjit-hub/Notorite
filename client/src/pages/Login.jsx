import React, { useState } from "react";
import { setUserData } from "../Redux/slices/user-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useAxios } from "../hooks/useAxios";

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
      if(result.data.status==="Error")
      {
        toast.error("wrong credentials");
        console.log("Error while Log in !!")
      }
      else{
        toast.success("User Logged in Successfully!");
        console.log("User Logged in Successfully: ", result);
        dispatch(setUserData(result.data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error("User Logged in failed! ");
      console.log("Cannot Login the User: ", error);
    }
  };

  return (
    <div className="bg-stone-800 h-heightWithoutNavbar flex w-full items-center justify-center p-5">
      <form className="flex w-full max-w-[420px] flex-col gap-4 rounded-xl bg-stone-700 gap-3 p-5 shadow-xl " onSubmit={loginUser}>
        <h1 className="text-2xl font-bold text-white">Login</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold text-white" htmlFor="userEmail">Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="w-full rounded-lg border bg-stone-700 border-gray-400 p-2 focus:ring focus:ring-blue-500 text-gray-200"
              placeholder="your.email@example.com"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-center ">
            <label className="font-bold text-white" htmlFor="userPassword">Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border bg-stone-700 border-gray-400 p-2 focus:ring focus:ring-blue-500 text-gray-200"
              placeholder="*********"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600" type="submit">
          Log In
        </button>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <p className="">New to Notorite?</p>
          <Link to="/signup">
            <p className="font-bold text-gray-300 hover:underline">Create an account</p>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
