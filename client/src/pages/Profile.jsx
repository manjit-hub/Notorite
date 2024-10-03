import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  const [userFiles, setUserFiles] = useState([]);
  const userId = user._id;

  useEffect(() => {
    const getUserFiles = async () => {
      const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes/getFiles/${userId}`);
      console.log(result.data);
      setUserFiles(result.data.data);
    };

    getUserFiles();
  }, [userId]);

  const numberofUploads = userFiles.length;
  const numberofFiles = userFiles.reduce((count) => count + 1, 0);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 lg:h-heightWithoutNavbar flex flex-col items-center justify-center border border-gray-300 dark:border-gray-700 lg:flex-row">
      <div className="flex w-full flex-col items-center justify-center border-[3px] border-gray-300 dark:border-gray-700 py-4 lg:h-full lg:w-[40%]">
        <div className="grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700 text-2xl font-black">
          <img src={user.profileImage} alt="userprofile" className="" />
        </div>
        <div className="my-2 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-black text-gray-800 dark:text-gray-200">
            <span>{user.firstName}</span> <span>{user.lastName}</span>
          </h2>
          <p className="mt-1 text-center text-gray-600 dark:text-gray-400">{user.userName}</p>
          <p className="mt-1 text-center text-gray-600 dark:text-gray-400">{user.userBio}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="grid h-[80px] w-[100px] place-content-center">
            <p className="text-center text-[12px] font-bold text-gray-600 dark:text-gray-400">
              No. of Uploads:
            </p>
            <p className="text-center text-5xl font-black text-gray-800 dark:text-gray-200">{numberofUploads}</p>
          </div>
          <span className="h-[60px] w-[1px] bg-gray-400 dark:bg-gray-600" />
          <div className="grid h-[80px] w-[100px] place-content-center">
            <p className="text-center text-[12px] font-bold text-gray-600 dark:text-gray-400">
              No. of Files:
            </p>
            <p className="text-center text-5xl font-black text-gray-800 dark:text-gray-200">{numberofFiles}</p>
          </div>
        </div>
      </div>
      <div className="h-auto w-full border-[3px] border-gray-300 dark:border-gray-700 p-5 lg:h-full lg:w-[60%]">
        <h1 className="mb-3 text-xl font-black text-gray-800 dark:text-gray-200">My Documents:</h1>
        <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3">
          {userFiles.map((file) => (
            <a
              href={`${import.meta.env.VITE_BACKEND_URL}/files/${file.files}`}
              key={file._id}
              className="mb-3 flex h-[35px] max-w-[250px] items-center justify-between gap-10 rounded-xl border border-gray-300 dark:border-gray-700 px-4 text-gray-800 dark:text-gray-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="font-semibold text-gray-800 dark:text-gray-200">{file.fileName}</p>
              <FaExternalLinkAlt className="text-gray-600 dark:text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
