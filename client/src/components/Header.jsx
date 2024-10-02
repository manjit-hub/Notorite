import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData, setUserData } from "../Redux/slices/user-slice";
import { Switch, useColorMode } from "theme-ui";
import { useState } from "react";
const Navbar = () => {

  const [colorMode, setColorMode] = useColorMode();
  const [state, setState] = useState("dark");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  }

  return (
    <header className="flex h-[80px] items-center justify-center shadow-md">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
        {/* image section */}
        <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden">
          <Link to="/">
          <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        {/* nav links  */}
        <GiHamburgerMenu className="text-xl md:hidden text-white" />
        <div className="hidden md:flex md:items-center md:justify-center md:gap-4">
          <Link to="/" className="">
            Home
          </Link>
          <Link to="/about" className="">
            About
          </Link>

          {/* Conditional Rendering */}
          {isAuthenticated ? (
            <>
              <Link to="/search">
                <FaSearch className="text-xl " />
              </Link>
              <Link to="/upload">
                <MdOutlineFileUpload className="text-[24px] " />
              </Link>
              <Link to="/profile">
              <button className="rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600">
                Profile
              </button>
              </Link>
              <button className="rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white hover:bg-sky-600">
                  Signup
                </button>
              </Link>
            </>

          )}
                    <div>
  <div>{state === "light" ? <div> Dark</div> : <div>Light</div>}</div>
  <Switch
    onClick={() => {
      setColorMode(colorMode === "dark" ? "light" : "dark");
      setState(colorMode === "dark" ? "light" : "dark");
    }}
  />
</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
