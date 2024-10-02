import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData, setUserData } from "../Redux/slices/user-slice";
import { useColorMode } from "theme-ui";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
const Navbar = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [state, setState] = useState("dark");
  const [buttonState, setButtonState] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  };

  return (
    <header
      className={
        colorMode === "light"
          ? "flex h-[80px] items-center justify-center bg-[#0056C1] shadow-md"
          : "flex h-[80px] items-center justify-center bg-stone-900 shadow-md"
      }
    >
      <div className="mx-3 flex w-full max-w-[1550px] items-center justify-between">
        {/* image section */}
        <div className="ml-[-90px] flex h-[120px] w-[120px] items-center justify-center overflow-hidden">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="" />
          </Link>
        </div>
        {/* nav links  */}
        <GiHamburgerMenu className="text-xl text-white md:hidden" />
        <div className="mr-[-90px] hidden md:flex md:items-center md:justify-center md:gap-4">
          <div className="text-xl">
            {buttonState ? (
              <MdDarkMode
                className="text-white"
                onClick={() => {
                  setColorMode(colorMode === "light" ? "dark" : "light");
                  setState(colorMode === "light" ? "dark" : "light");
                  setButtonState(false);
                }}
              />
            ) : (
              <MdLightMode
                className="text-white"
                onClick={() => {
                  setColorMode(colorMode === "dark" ? "light" : "dark");
                  setState(colorMode === "dark" ? "light" : "dark");
                  setButtonState(true);
                }}
              />
            )}
          </div>
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/about" className="text-white">
            About
          </Link>

          {/* Conditional Rendering */}
          {isAuthenticated ? (
            <>
              <Link to="/search">
                <FaSearch className="text-xl" />
              </Link>
              <Link to="/upload">
                <MdOutlineFileUpload className="text-[24px]" />
              </Link>
              <Link to="/profile">
                <button
                  className={
                    colorMode === "light"
                      ? "rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600"
                      : "rounded-xl bg-stone-700 px-5 py-2 font-semibold text-white hover:bg-sky-600"
                  }
                >
                  Profile
                </button>
              </Link>
              <button
                className={
                  colorMode === "light"
                    ? "rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600"
                    : "rounded-xl bg-stone-700 px-5 py-2 font-semibold text-white hover:bg-sky-600"
                }
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className={
                    colorMode === "light"
                      ? "rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600"
                      : "rounded-xl bg-stone-700 px-5 py-2 font-semibold text-white hover:bg-sky-600"
                  }
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className={
                    colorMode === "light"
                      ? "rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600"
                      : "rounded-xl bg-stone-700 px-5 py-2 font-semibold text-white hover:bg-sky-600"
                  }
                >
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
