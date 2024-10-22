import React, { useEffect, useState, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useAxios } from "../hooks/useAxios";
import { setUserData } from "../Redux/slices/user-slice";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [isAbove480px, setIsAbove480px] = useState(window.innerWidth > 480);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState("");

  // Change password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const axios = useAxios();

  const [userFiles, setUserFiles] = useState([]);
  console.log(user);

  const userId = user?.user?._id;
  const token = user?.token;

  const [leftWidth, setLeftWidth] = useState(40); // Left section width in percentages
  const containerRef = useRef(null);

  const handleImageUpload = (e) => setProfileImage(e.target.files[0]);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Calculate the new width based on the mouse position
    const newWidth =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;
    if (newWidth > 10 && newWidth < 90) {
      setLeftWidth(newWidth);
    }
  };

  const stopResizing = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResizing);
  };

  const startResizing = () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsAbove480px(window.innerWidth > 480); // Check if width is above 480px
    };
  
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  useEffect(() => {
    if (userId && token) {
      fetchUserFiles(); // Fetch files on mount
    }
  }, [userId, token]);
  
  const fetchUserFiles = async () => {
    try {
      const result = await axios.get(`/notes/getFiles/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserFiles(result.data.data);
    } catch (error) {
      console.error("Error fetching user files:", error);
    }
  };  

  const handleEditProfileClick = () => {
    fetchUserFiles(); // Fetch user files when "Edit Profile" is clicked
    setIsVisible(true);
  };

  const handleChangePasswordClick = () => {
    fetchUserFiles(); // Fetch user files when "Change Password" is clicked
    setIsPasswordVisible(true);
  };

  const getColorFromHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "bg-red-800",
      "bg-blue-800",
      "bg-green-800",
      "bg-yellow-800",
      "bg-purple-800",
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  const numberofUploads = userFiles.length;
  const numberofFiles = userFiles.length;
  const [isVisible, setIsVisible] = useState(false);

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("userName", userName);
    formData.append("userBio", userBio);
    if (profileImage) formData.append("profileImage", profileImage);
    formData.append("password", password);

    try {
      const result = await axios.put("/auth/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated successfully:", result.data);

      // Dispatch updated user data
      dispatch(setUserData(result.data.userData));

      // Close the modal
      setIsVisible(false);

      Toastify({
        text: "Profile updated successfully",
        backgroundColor: "green",
      }).showToast();

      // Reset form fields
      setFirstName("");
      setLastName("");
      setUserName("");
      setUserBio("");
      setProfileImage(null);
      setPassword("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to update profile";
      Toastify({
        text: errorMessage,
        backgroundColor: "red",
      }).showToast();
    }
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword) {
      Toastify({
        text: "Both current and new passwords are required",
        backgroundColor: "red",
      }).showToast();
      return;
    }
    if (newPassword.length < 8) {
      Toastify({
        text: "New password must be at least 8 characters long",
        backgroundColor: "red",
      }).showToast();
      return;
    }

    try {
      const result = await axios.put(
        "/auth/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // alert(result.data.message);
      Toastify({
        text: result.data.message,
        backgroundColor: "green",
      }).showToast();
      setIsPasswordVisible(false);
    } catch (error) {
      console.error("Error changing password:", error);
      // alert(error.response.data.error);
      Toastify({
        text: errorMessage,
        backgroundColor: "red",
      }).showToast();

      if (error.response?.status === 401) {
        // Token expired or invalid, show appropriate message
        Toastify({
          text: "Session expired. Please login again.",
          backgroundColor: "orange",
        }).showToast();

        // Optionally redirect to the login page
        setTimeout(() => {
          window.location.href = "/login"; // Change this to your login route
        }, 3000);
      }
    }
  };

  // Check if the screen size is less than a certain threshold
  const isMobile = window.innerWidth < 1024; // Adjust based on your design

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full flex-col sm:flex-row lg:h-heightWithoutNavbar"
    >
      {/* Left Pane (Resizable) */}
      <div
        style={{ width: isAbove480px ? `${leftWidth}%` : "100%" }} // Dynamic width
        className="flex flex-col items-center justify-center border-[3px] border-gray-300 bg-gray-100 py-4 dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full bg-gray-300 text-2xl font-black dark:bg-gray-700">
          <img src={user?.user?.profileImage} alt="userprofile" />
        </div>
        <div className="my-2 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-black text-gray-800 dark:text-gray-200">
            {user.user.firstName} {user.user.lastName}
          </h2>
          <p className="mt-1 text-center text-gray-600 dark:text-gray-400">
            {user.user.userName}
          </p>
          <p className="mt-1 text-center text-gray-600 dark:text-gray-400">
            {user.user.userBio}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="grid h-[80px] w-[100px] place-content-center">
            <p className="text-center text-[12px] font-bold text-gray-600 dark:text-gray-400">
              No. of Uploads:
            </p>
            <p className="text-center text-5xl font-black text-gray-800 dark:text-gray-200">
              {numberofUploads}
            </p>
          </div>
          <span className="h-[60px] w-[1px] bg-gray-400 dark:bg-gray-600" />
          <div className="grid h-[80px] w-[100px] place-content-center">
            <p className="text-center text-[12px] font-bold text-gray-600 dark:text-gray-400">
              No. of Files:
            </p>
            <p className="text-center text-5xl font-black text-gray-800 dark:text-gray-200">
              {numberofFiles}
            </p>
          </div>
        </div>
        <button
          className="mt-2 rounded-xl bg-sky-500 px-7 py-2 font-semibold text-white hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={handleEditProfileClick}
        >
          Edit Profile
        </button>
        <button
          className="mt-2 rounded-xl bg-sky-500 px-7 py-2 font-semibold text-white hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={handleChangePasswordClick}
        >
          Change Password
        </button>
        {isVisible && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 dark:bg-black dark:bg-opacity-75"
            style={{ outline: "2px solid red" }}
          >
            <div
              aria-label="card"
              className="mb-4 max-h-[80%] w-[90%] max-w-lg rounded-3xl border-2 border-gray-300 bg-white p-8 dark:border-slate-500 dark:bg-slate-800"
              style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
            >
              <div aria-label="header" className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 shrink-0"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M13 3v7h6l-8 11v-7H5l8-11z"></path>
                </svg>
                <div className="flex-1 space-y-0.5">
                  <h3 className="text-lg font-medium leading-tight tracking-tight text-gray-400">
                    Update Profile
                  </h3>
                  <p className="text-sm font-normal leading-none text-gray-400">
                    powered by Notorite
                  </p>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div
                aria-label="content"
                className="mt-9 grid justify-items-center gap-2"
              >
                <div className="flex flex-col gap-1">
                  <div className="wflex flex-col mt-0 items-start justify-center">
                    <label
                      className="font-bold text-gray-900 dark:text-white"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full rounded-lg border border-gray-400 bg-gray-100 p-2 text-gray-900 focus:ring focus:ring-blue-500 dark:bg-stone-700 dark:text-gray-200"
                      placeholder="Gold"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <label
                      className="font-bold text-gray-900 dark:text-white"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full rounded-lg border border-gray-400 bg-gray-100 p-2 text-gray-900 focus:ring focus:ring-blue-500 dark:bg-stone-700 dark:text-gray-200"
                      placeholder="Roger"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <label
                      className="font-bold text-gray-900 dark:text-white"
                      htmlFor="userName"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      className="w-full rounded-lg border border-gray-400 bg-gray-100 p-2 text-gray-900 focus:ring focus:ring-blue-500 dark:bg-stone-700 dark:text-gray-200"
                      placeholder="gold_roger"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <label
                      className="font-bold text-gray-900 dark:text-white"
                      htmlFor="userBio"
                    >
                      User Bio
                    </label>
                    <input
                      type="text"
                      id="userBio"
                      name="userBio"
                      className="w-full rounded-lg border border-gray-400 bg-gray-100 p-2 text-gray-900 focus:ring focus:ring-blue-500 dark:bg-stone-700 dark:text-gray-200"
                      placeholder="One piece is real."
                      onChange={(e) => setUserBio(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <label
                      className="font-bold text-gray-900 dark:text-white"
                      htmlFor="profileImage"
                    >
                      Profile Image
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      className="w-full rounded-lg border border-gray-400 bg-gray-100 p-2 text-gray-900 focus:ring focus:ring-blue-500 dark:bg-stone-700 dark:text-gray-200"
                      onChange={handleImageUpload}
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <label
                      className="font-bold text-gray-900 dark:text-white"
                      htmlFor="password"
                    >
                      Verify Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full rounded-lg border border-gray-400 bg-gray-100 p-2 text-gray-900 focus:ring focus:ring-blue-500 dark:bg-stone-700 dark:text-gray-200"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600"
                  type="submit"
                  onClick={updateProfile}
                >
                  Update
                </button>
                <div className="flex max-h-[65vh] w-[90%] flex-col overflow-y-auto"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Change Password Modal */}
      {isPasswordVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          style={{ outline: "2px solid red" }}
        >
          <div
            aria-label="card"
            className="mb-4 max-h-[80%] w-[90%] max-w-lg rounded-3xl border-2 border-gray-300 bg-white p-8 dark:border-slate-500 dark:bg-slate-800"
            style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
          >
            <div aria-label="header" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M13 3v7h6l-8 11v-7H5l8-11z"></path>
              </svg>
              <div className="flex-1 space-y-0.5">
                <h3 className="text-lg font-medium leading-tight tracking-tight text-gray-400">
                  Change Password
                </h3>
                <p className="text-sm font-normal leading-none text-gray-400">
                  powered by Notorite
                </p>
              </div>
              <button
                onClick={() => setIsPasswordVisible(false)}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white focus:outline-none"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                  
              </button>
            </div>

            <div
              aria-label="content"
              className="mt-9 grid justify-items-center gap-2"
            >
              <div className="flex flex-col gap-1">
                <div className="flex flex-col items-start justify-center">
                  <label
                    className="font-bold text-gray-900 dark:text-white"
                    htmlFor="currentPassword"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="w-full rounded-lg border border-gray-400 bg-gray-100 p-2 text-gray-900 focus:ring focus:ring-blue-500 dark:bg-stone-700 dark:text-gray-200"
                    placeholder="Enter current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <label
                    className="font-bold text-gray-900 dark:text-white"
                    htmlFor="newPassword"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full rounded-lg border border-gray-400 bg-gray-100 p-2 text-gray-900 focus:ring focus:ring-blue-500 dark:bg-stone-700 dark:text-gray-200"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600"
                type="submit"
                onClick={changePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Divider (Draggable) */}
      {!isMobile && (
        <div
          onMouseDown={startResizing}
          className="w-[5px] cursor-col-resize bg-gray-400"
        ></div>
      )}

      {/* Right Pane */}
      <div
        style={{ width: isAbove480px ? `${100 - leftWidth}%` : "100%" }} // Dynamic width
        className="h-auto border-[3px] border-gray-300 bg-gray-100 p-5 dark:border-gray-700 dark:bg-gray-900 lg:h-full"
      >
        <h1 className="mb-3 text-xl font-black text-gray-800 dark:text-gray-200">
          My Documents:
        </h1>
        <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3">
          {userFiles.map((file) => {
            const bgColor = getColorFromHash(file.fileName);

            return (
              <a
                href={`${file.files}`}
                key={file._id}
                className={`mb-3 flex h-[35px] max-w-[250px] items-center justify-between gap-10 rounded-xl border border-gray-300 px-4 text-gray-800 dark:border-gray-700 dark:text-gray-200 ${bgColor}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {file.fileName}
                </p>
                <FaExternalLinkAlt className="text-gray-600 dark:text-gray-400" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
