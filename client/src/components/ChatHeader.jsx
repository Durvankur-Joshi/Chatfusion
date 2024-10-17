import React from 'react';

const ChatHeader = () => {
  return (
    <div className="bg-gray-900 p-4 flex flex-col md:flex-row items-center justify-between text-white">
      <h2 className="text-lg md:text-xl font-bold">Chat with Username</h2>
      <div className="flex flex-wrap space-x-0 md:space-x-4 mt-2 md:mt-0">
        <button className="hover:bg-slate-800 text-blue-500 px-4 py-2 rounded-full">Video Call</button>
        <button className="hover:bg-slate-800 text-blue-500 px-4 py-2 rounded-full">More</button>
      </div>
    </div>
  );
};

export default ChatHeader;
