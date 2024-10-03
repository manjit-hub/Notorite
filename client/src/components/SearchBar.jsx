import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");

  const user = useSelector((state) => state.user.userData);
  const username = user.userName;

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const notes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes/getFiles`, {
        params: {
          title: searchQuery,
        },
      });

      if (notes.data.data.length > 0) {
        setSearchResults(notes.data.data);
        setSearchStatus("Found");
      } else {
        setSearchResults([]);
        setSearchStatus("Not-Found");
      }
    } catch (error) {
      console.log("Error Fetching Notes: ", error);
    }
  };

  const showPDF = async (files) => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/files/${files}`, "_blank", "noreferrer");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-heightWithoutNavbar flex flex-col items-center justify-start p-4">
      <div className="flex w-full items-center justify-center">
        <form className="bg-white dark:bg-gray-800 w-full max-w-[700px] rounded-xl border border-gray-300 dark:border-gray-700 p-4 shadow-sm" onSubmit={handleSearch}>
          <div className="flex items-center justify-between">
            <FaSearch className="text-2xl text-gray-700 dark:text-gray-400" />
            <input
              type="search"
              placeholder="Search for Notes"
              className="rounded-xl p-2 bg-gray-100 dark:bg-gray-700 ml-3 w-full text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="ml-3 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(true).map((_, i) => (
          <div
            key={i}
            className="flex w-full items-center justify-between rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-200 shadow-sm"
          >
            <p className="">
              <span className="font-bold">File Name:</span> <span>Sample File</span>
            </p>
            <button className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
              Show File
            </button>
          </div>
        ))}

        {searchStatus === "Found" && searchResults.length > 0 && searchResults.map((notes) => (
          <div
            key={notes._id}
            className="flex w-full max-w-[300px] flex-wrap-reverse items-center justify-between rounded-xl bg-white dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200 shadow-sm border border-gray-300 dark:border-gray-700"
          >
            <p className="mt-2 text-sm">
              <span className="font-bold">File name: </span>
              <span>{notes.fileName}</span>
            </p>

            <button onClick={() => showPDF(notes.files)} className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
              Show PDF
            </button>
          </div>
        ))}

        {searchStatus === "Not-Found" && (
          <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
            No Notes Found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
