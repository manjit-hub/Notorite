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
  }

  const showPDF = async (files) => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/files/${files}`, "_blank", "noreferrer");
  };

  return (
    <div className=" h-heightWithoutNavbar flex flex-col items-center justify-start p-4">
      <div className="flex w-full items-center justify-center">
        <form className=" w-full max-w-[700px] rounded-xl border border-black bg-[#374151] p-4" onSubmit={handleSearch}>
          <div className=" flex items-center justify-between">
            {/* serach logo  */}
            <FaSearch className="text-2xl text-white" />
            {/* input  */}
            <input
              type="search"
              placeholder="Seach for Notes"
              className="rounded-xl p-2  ml-3 w-full bg-[#374151] text-white border-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
             
            />
            <button
              type="submit"
              className=" bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-3 "
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* documents  */}
      <div className="mt-5 grid w-full grid-cols-1 gap-5 border sm:grid-cols-2 lg:grid-cols-4">
      {Array(Array.length)
        .fill(true)
        .map((item, i) => (
          <div
            key={i}
            className="flex w-full  items-center justify-between rounded-lg bg-[#374151] border border-transparent px-4 py-2 text-white"
          >
            <p className="">
              <span className="font-bold">File Name :</span> <span>File Name</span>
            </p>
            <button className="rounded-xl bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600">
              Show File
            </button>
          </div>
        ))}

        {searchStatus === "Found" && searchResults.length > 0 && searchResults.map((notes) => (
          <div
            key={notes._id}
            className="flex w-full max-w-[300px] flex-wrap-reverse items-center justify-between rounded-xl bg-[#374151] px-3 py-2 text-white shadow-lg"
          >
            <p className="mt-2 text-sm">
              <span className="font-bold">File name: </span>
              <span >{notes.fileName} </span>
            </p>

            <button onClick={() => showPDF(notes.files)}>
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
