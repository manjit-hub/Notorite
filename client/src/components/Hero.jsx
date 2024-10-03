import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
      <div
        className="bg-zinc-700 relative flex h-full items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/bg-image-notorite.jpg')` }}
      >
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 w-full max-w-[860px] text-center text-white">
        <h1 className="text-4xl font-black md:text-5xl">🌟NOTORITE🌟</h1>
        <p className="mt-5 text-sm font-light md:text-xl md:font-normal">
        “Welcome to NOTORITE !     Here, students unite for seamless organization, easy access, and collaborative sharing of PDF notes. Say goodbye to scattered notebooks; streamline your study routine and embark on a journey toward academic excellence. Simplify your student life, empower your notes, and explore a new era of innovation. Start today! 🚀📚”
        </p>
        <div className="mt-5">
          {/* <Link to="/search">
            <button className="rounded-xl bg-white px-7 py-4 font-black text-blue-500 ">
              Get Started
            </button>
          </Link> */}
          <div
            className="flex items-center justify-center gap-5
          "
          >
            {isAuthenticated ? (
              <Link to="/search" className="mr-10 rounded-xl bg-sky-600 text-white hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600 px-6 py-3 text-lg font-bold">Get Started</Link>
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

          </div>
        </div >
      </div >
    </div >
  );
};

export default Hero;
