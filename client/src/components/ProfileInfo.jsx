import React, { useState } from 'react';
import { useAppStore } from '../store'; // import your Zustand store
import { HOST } from '../utils/constants';
import { IoMdLogOut, IoMdCreate } from "react-icons/io"; // Import update profile icon

const ProfileDisplay = () => {
  const { userInfo } = useAppStore(); // Access userInfo from the store
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <div className="absolute bottom-0 w-full left-0 p-2 sm:p-4 flex justify-between items-center">
      <div className="flex gap-2 sm:gap-3 items-center">
        {/* Profile Image with hover */}
        <div
          className="relative h-10 w-10 sm:h-14 sm:w-14 md:w-20 md:h-20 rounded-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)} // Show icon on hover
          onMouseLeave={() => setIsHovered(false)} // Hide icon when not hovering
        >
          {userInfo.image ? (
            <img
              src={`${HOST}/${userInfo.image}`}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No image</span>
          )}

          {/* Update Profile Icon */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <IoMdCreate className="text-white text-2xl cursor-pointer" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="text-center">
          <p className="text-xs sm:text-xl font-bold uppercase">
            {userInfo.firstName} 
          </p>
        </div>
        
          <IoMdLogOut className="text-white text-xl sm:text-2xl cursor-pointer" />
      </div>

      {/* Logout Icon */}
    </div>
  );
};

export default ProfileDisplay;
