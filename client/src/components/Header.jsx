import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";
import ThemeToggleBtn from "./ThemeToggleBtn";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  };

  return (
    <header className="flex h-[80px] items-center justify-center shadow-md bg-gray-300 dark:bg-stone-900">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
        {/* image section */}
        <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="dark:filter dark:invert"
            />
          </Link>
        </div>
        {/* nav links */}
        <GiHamburgerMenu className="text-xl md:hidden text-gray-800 dark:text-white" />
        <div className="hidden md:flex md:items-center md:justify-center md:gap-4">
          <Link to="/" className="text-gray-800 dark:text-white">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 dark:text-white">
            About
          </Link>

          {/* Conditional Rendering */}
          {isAuthenticated ? (
            <>
              <Link to="/search">
                <FaSearch className="text-xl text-gray-800 dark:text-white" />
              </Link>
              <Link to="/upload">
                <MdOutlineFileUpload className="text-[24px] text-gray-800 dark:text-white" />
              </Link>
              <Link to="/profile">
                <button className="rounded-xl px-5 py-2 font-semibold bg-sky-500 text-white hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Profile
                </button>
              </Link>
              <button
                className="rounded-xl px-5 py-2 font-semibold bg-sky-500 text-white hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl px-5 py-2 font-semibold bg-sky-600 text-white hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl px-5 py-2 font-semibold bg-sky-600 text-white hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Signup
                </button>
              </Link>
            </>
          )}
          <ThemeToggleBtn />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
