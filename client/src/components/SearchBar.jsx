import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAxios } from "../hooks/useAxios";
import { useLocation } from "react-router-dom"; // To get the current route

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [showUploadedNotes, setShowUploadedNotes] = useState(true); // To control display of uploaded notes

  const user = useSelector((state) => state.user.userData);
  const axios = useAxios();
  const token = user.token;
  const location = useLocation(); // To check the current route

  // Function to fetch all uploaded notes
  const fetchAllNotes = async () => {
    try {
      const response = await axios.get('/notes/getAllFiles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.data?.length > 0) {
        setAllNotes(response.data.data);
      } else {
        setAllNotes([]);
      }
    } catch (error) {
      console.error("Error Fetching All Notes: ", error);
    }
  };

  // Call this function when the component mounts and route is "/search"
  useEffect(() => {
    if (location.pathname === '/search') {
      fetchAllNotes();
    }
  }, [location, token]); // Trigger fetch only when the token is available and the route is correct

  // Handle the search functionality
  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      // If the search bar is empty, show the uploaded notes again
      setShowUploadedNotes(true);
      return;
    }

    try {
      const notes = await axios.get('/notes/getFiles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          title: searchQuery,
        },
      });

      if (notes?.data?.data?.length > 0) {
        setSearchResults(notes.data.data);
        setSearchStatus("Found");
        setShowUploadedNotes(false); // Hide uploaded notes when search results are found
      } else {
        setSearchResults([]);
        setSearchStatus("Not-Found");
        setShowUploadedNotes(false); // Hide uploaded notes if no results are found
      }
    } catch (error) {
      console.log("Error Fetching Notes: ", error);
    }
  };

  const showPDF = async (files) => {
    window.open(`${files}`, "_blank", "noreferrer");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-heightWithoutNavbar flex flex-col items-center justify-start p-4">
      <div className="flex w-full items-center justify-center">
        <form className="bg-white dark:bg-gray-800 w-full max-w-[700px] rounded-xl border border-gray-300 dark:border-gray-700 p-4 shadow-sm" onSubmit={handleSearch}>
          <div className="flex items-center justify-between">
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
              <FaSearch className="text-2xl text-gray-700 dark:text-gray-400" />
              {/* Search */}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {searchStatus === "Found" && searchResults.length > 0 && searchResults.map((notes) => (
          <div
            key={notes._id}
            className="flex items-center justify-between rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-5 py-3 text-gray-700 dark:text-gray-200 shadow-sm"
          >
            <div className="flex flex-col">
              <p className="text-sm">
                <span>{notes.uploadedBy.firstName} {notes.uploadedBy.lastName}</span>
              </p>
              <p className="text-sm">
                <span className="font-bold">File name: </span>
                <span>{notes.fileName}</span>
              </p>
            </div>

            <button
              onClick={() => showPDF(notes.files)}
              className="ml-auto rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
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

      {/* Conditionally render uploaded notes based on the search */}
      {showUploadedNotes && (
        <div className="mt-10 w-full">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Uploaded Notes:</h2>
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {allNotes.length > 0 && allNotes.map((notes) => (
              <div
                key={notes._id}
                className="flex items-center justify-between rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-5 py-3 text-gray-700 dark:text-gray-200 shadow-sm"
              >
                <div className="flex flex-col">
                  <p className="text-sm">
                    <span>{notes.uploadedBy.firstName} {notes.uploadedBy.lastName}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">File name: </span>
                    <span>{notes.fileName}</span>
                  </p>
                </div>

                <button
                  onClick={() => showPDF(notes.files)}
                  className="ml-auto rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                >
                  Show PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
