import React from 'react';
import { useAppStore } from '../store'; // import your Zustand store
import { HOST } from '../utils/constants';
import { IoMdLogOut } from "react-icons/io";

const ProfileDisplay = () => {
  const { userInfo } = useAppStore(); // Access userInfo from the store

  return (
    <div className="absolute bottom-0 w-full left-0  p-2 sm:p-4 flex justify-between items-center ">
      <div className="flex gap-2 sm:gap-3 items-center">
        {/* Profile Image */}
        <div className="h-10 w-10 sm:h-14 sm:w-14 md:w-20 md:h-20 rounded-full overflow-hidden">
          {userInfo.image ? (
            <img
              src={`${HOST}/${userInfo.image}`}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No image</span>
          )}
        </div>

        {/* User Info */}
        <div className="text-center">
          <p className="text-xs sm:text-xl font-bold">
            {userInfo.firstName} {userInfo.lastName || ''}
          </p>
        </div>
      </div>

      {/* Logout Icon */}
      <IoMdLogOut className="text-white text-xl sm:text-2xl cursor-pointer" />
    </div>
  );
};

export default ProfileDisplay;
