import React from 'react';
import { FaEdit } from 'react-icons/fa';

const UserProfile = () => {
  return (
    <div className="flex flex-col md:flex-row items-center p-4 bg-gray-900 text-white rounded-lg shadow-md max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto space-y-4 md:space-y-0 md:space-x-4">
      {/* Profile Photo */}
      <div className="relative w-24 h-24 sm:w-15 sm:h-15 md:w-32 md:h-32 lg:w-40 lg:h-40">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
        {/* Edit Icon */}
        <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition">
          <FaEdit className="text-white text-sm sm:text-base md:text-lg lg:text-xl" />
        </div>
      </div>

      {/* Username */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left">
        Username
      </h2>
    </div>
  );
};

export default UserProfile;
