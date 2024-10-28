// ChatHeader.js
import React from 'react';
import { useAppStore } from '../store';

const ChatHeader = () => {
  const { closeChat } = useAppStore(); // Access selectedContact here

  return (
    <div className="bg-gray-900 p-4 flex flex-col md:flex-row items-center justify-between text-white">
      <h2 className="text-lg md:text-xl font-bold">Chat with </h2>
      <div className="flex flex-wrap space-x-0 md:space-x-4 mt-2 md:mt-0">
        
      <button className="btn btn-sm btn-circle btn-ghost absolute right-5  top-3" onClick={closeChat}>✕</button>
       
      </div>
    </div>
  );
};

export default ChatHeader;
