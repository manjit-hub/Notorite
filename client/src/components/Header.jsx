import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdHome, MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { CgClose } from "react-icons/cg";
import { FcAbout } from "react-icons/fc";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  };

  const CloseNav = () => setOpen(false);
  console.log(open);
  return (
    <header className="flex h-[80px] items-center justify-center bg-gray-300 shadow-md dark:bg-stone-900">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
        {/* image section */}
        <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="dark:invert dark:filter"
            />
          </Link>
        </div>
        {/* nav links */}
        <GiHamburgerMenu
          className="text-xl text-gray-800 dark:text-white md:hidden"
          // onClick={toggleNav}
          onClick={() => setOpen(!open)}
        />
        <div className="hidden md:flex md:items-center md:justify-center md:gap-4">
          <ThemeToggleBtn />
          <Link to="/" className="ml-4 mr-4 text-gray-800 dark:text-white">
            Home
          </Link>
          <Link to="/about" className="mr-4 text-gray-800 dark:text-white">
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
                <button className="rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Profile
                </button>
              </Link>
              <button
                className="rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button class="btn">Login</button>
                <span class="animation"></span>
              </Link>
              <Link to="/signup">
                <button class="btn">Signup</button>
              </Link>
            </>
          )}
        </div>

        {/* //Mobile Nav */}
        <div
          className={`fixed left-0 top-0 z-[9999999999] flex h-screen w-full origin-top transform flex-col bg-gray-300 text-gray-800 shadow-md transition-opacity transition-transform duration-500 ease-in-out ${
            open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          } dark:bg-stone-900 dark:text-white md:hidden`}
        >
          <div className="relative h-full">
            <div className="flex h-fit w-full items-center justify-between">
              <img
                src="/logo.png"
                alt="Logo"
                class="size-28 dark:invert dark:filter"
              />
              <div className="flex size-24 items-center justify-center">
                <ThemeToggleBtn />
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 p-6">
              <Link onClick={CloseNav} to="/">
                <button className="w-full rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white dark:bg-blue-500">
                  Home
                </button>
              </Link>

              <Link onClick={CloseNav} to="/about">
                <button className="w-full rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white dark:bg-blue-500">
                  About
                </button>
              </Link>

              {/* Conditional Rendering */}
              {isAuthenticated ? (
                <>
                  <Link onClick={CloseNav} to="/search">
                    <button className="w-full rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white dark:bg-blue-500">
                      Search
                    </button>
                  </Link>

                  <Link onClick={CloseNav} to="/upload">
                    <button className="w-full rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white dark:bg-blue-500">
                      Upload
                    </button>
                  </Link>

                  <Link onClick={CloseNav} to="/profile">
                    <button className="w-full rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white dark:bg-blue-500">
                      Profile
                    </button>
                  </Link>

                  <button
                    className="rounded-xl bg-red-400 px-5 py-2 font-semibold text-white dark:bg-red-400"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link onClick={CloseNav} to="/login">
                    <button className="w-full rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white dark:bg-blue-500">
                      Login
                    </button>
                  </Link>
                  <Link onClick={CloseNav} to="/signup">
                    <button className="w-full rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white dark:bg-blue-500">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 left-0 flex w-full items-center justify-center p-10">
              <button
                onClick={() => setOpen(!open)}
                className="flex w-fit items-center justify-center rounded-xl bg-gray-600 px-5 py-1 text-center text-[20px] font-medium text-white dark:bg-gray-300 dark:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
