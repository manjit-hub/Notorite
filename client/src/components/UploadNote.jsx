import React, { useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useAxios } from "../hooks/useAxios";

const UploadNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const user = useSelector((state) => state.user.userData);

  const token = user.token;
  const axios = useAxios();
  const userId = user.user._id;

  const submitFile = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("file", file);
      formData.append("userId", userId);

      console.log(formData);

      const result = await axios.post("/notes/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Notes Uploaded Successfully");
      console.log("Data: ", result);
    } catch (error) {
      console.log(localStorage.getItem("token"));
      toast.error("Failed to upload file");
      console.log("Failed to upload file: ", error);
    }
  };

  return (
    <form
      className="flex h-full w-full max-w-[770px] flex-col items-center justify-start rounded-lg border-gray-400 bg-gray-100 p-5 dark:bg-stone-700 md:border md:bg-gray-100 dark:md:bg-stone-700 lg:justify-center"
      onSubmit={submitFile}
    >
      <h1 className="mb-5 text-2xl font-black text-gray-900 dark:text-white">
        Upload Your Notes
      </h1>
      <div className="mb-5 w-full max-w-[550px]">
        <input
          type="text"
          placeholder="Title"
          required
          className="block w-full rounded-lg border border-gray-400 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-stone-600 dark:text-gray-200"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-5 w-full max-w-[550px]">
        <input
          type="text"
          placeholder="Description"
          required
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full rounded-lg border border-gray-400 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-stone-600 dark:text-gray-200"
        />
      </div>
      <div className="mb-5 w-full max-w-[550px]">
        <input
          type="text"
          placeholder="Tags"
          required
          onChange={(e) => setTags(e.target.value)}
          className="block w-full rounded-lg border border-gray-400 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-stone-600 dark:text-gray-200"
        />
      </div>
      <div className="flex w-full max-w-[550px] items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="h-30 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-200 hover:bg-gray-300 dark:bg-stone-600 dark:hover:bg-stone-700"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            {!file ? (
              <div className="text-center text-gray-500 dark:text-gray-300">
                <p className="mb-2 text-sm">
                  <span className="font-semibold">Click to Upload</span> or drag
                  and drop
                </p>
                <p className="text-xs">PDF</p>
              </div>
            ) : (
              <div className="text-center text-gray-900 dark:text-white">
                <p className="mb-2 text-sm">
                  <span className="font-semibold">File Uploaded:</span>{" "}
                  {file.name}
                </p>
                <p className="text-xs">
                  File Size: {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}
            <input
              type="file"
              accept="application/pdf"
              id="dropzone-file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </label>
      </div>
      <button
        className="my-5 w-full max-w-[550px] rounded-xl bg-blue-500 py-3 font-bold text-white hover:bg-blue-600"
        type="submit"
      >
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};

export default UploadNote;
