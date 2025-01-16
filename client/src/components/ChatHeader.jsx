// ChatHeader.js
import React from 'react';
import { useAppStore } from '../store';
import { HOST } from '../utils/constants';

const ChatHeader = () => {
  const { closeChat, selectedChatData } = useAppStore();

  return (
    <div className="bg-gray-900 h-14 p-4  flex items-center justify-between text-white  shadow-lg">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 mt-5">
        <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-gray-700">
          {selectedChatData && selectedChatData.image ? (
            <img
              src={`${HOST}/${selectedChatData.image}`}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-2xl text-gray-950  bg-gray-700">{selectedChatData.name ? selectedChatData.name.charAt(0).toUpperCase() : "?"}</span>
          )}
          
        </div>
        {/* Contact Information */}
        <div className="text-left">
          <p className="text-lg sm:text-xl font-bold">{selectedChatData?.firstname || selectedChatData.name || "Unknown"}</p>
        </div>
      </div>
      
      {/* Close Button */}
      <button
        className="btn btn-sm btn-circle btn-ghost hover:bg-red-600 hover:text-white transition-all duration-200 ease-in-out absolute right-4 top-5"
        onClick={closeChat}>
        ✕
      </button>
    </div>
  );
};

export default ChatHeader;
