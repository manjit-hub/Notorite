import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useAxios } from "../hooks/useAxios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const { token } = useParams();

  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();

    if (userPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const result = await axios.post(`/auth/reset-password/${token}`, { newPassword: userPassword });
      if (result.data.status === "Error") {
        toast.error("Error resetting password");
        console.log("Error while resetting password!");
      } else {
        toast.success("Password reset successfully!");
        console.log("Password reset successfully: ", result);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error("Reset password failed!");
      console.log("Cannot reset password: ", error);
    }
  };

  return (
    <div className="h-heightWithoutNavbar flex w-full items-center justify-center p-5 bg-gray-100 dark:bg-stone-800">
      <form
        className="flex w-full max-w-[420px] flex-col gap-4 rounded-xl bg-gray-200 dark:bg-stone-700 p-5 shadow-xl"
        onSubmit={resetPassword}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Reset Password</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold text-gray-900 dark:text-white" htmlFor="userPassword">New Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border border-gray-400 bg-gray-100 dark:bg-stone-700 p-2 focus:ring focus:ring-blue-500 text-gray-900 dark:text-gray-200"
              placeholder="*********"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold text-gray-900 dark:text-white" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full rounded-lg border border-gray-400 bg-gray-100 dark:bg-stone-700 p-2 focus:ring focus:ring-blue-500 text-gray-900 dark:text-gray-200"
              placeholder="*********"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600" type="submit">
          Set New Password
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default ResetPassword;