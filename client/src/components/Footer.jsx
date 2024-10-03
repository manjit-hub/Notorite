import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-stone-900 flex items-center justify-center p-16">
      <div className="flex h-full w-full flex-col gap-10 px-20 lg:flex-row lg:justify-between">
        <div className="lg:w-[450px]">
          <h2 className="relative mb-3 text-2xl font-black text-gray-900 dark:text-white before:absolute before:top-[30px] before:h-[3px] before:w-[200px] before:bg-yellow-400">
            About Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Because your planning is not always perfect, you need to be able to
            study whenever, wherever. Just read your notes one last time on your
            tablet or phone while you're on the go.
          </p>
        </div>
        <div className="">
          <h2 className="relative mb-3 text-2xl font-black text-gray-900 dark:text-white before:absolute before:top-[30px] before:h-[3px] before:w-[200px] before:bg-yellow-400">
            Quick Links
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li className="mb-1">
              <Link to="/about" className="hover:text-black hover:underline dark:hover:text-white">About</Link>
            </li>
            <li className="mb-1">
              <Link to="/faq" className="hover:text-black hover:underline dark:hover:text-white">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h2 className="relative mb-3 text-2xl font-black text-gray-900 dark:text-white before:absolute before:top-[30px] before:h-[3px] before:w-[200px] before:bg-yellow-400">
            Contact Info
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li className="mb-1">
              <Link to="/about" className="hover:text-black hover:underline dark:hover:text-white">+91 9078902XXX</Link>
            </li>
            <li className="mb-1">
              <Link to="/faq" className="hover:text-black hover:underline dark:hover:text-white">+91 6371101XXX</Link>
            </li>
            <li className="mb-1">
              <Link to="/faq" className="hover:text-black hover:underline dark;hover:text-white">helpnotorite@gmail.com</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
