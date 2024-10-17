import React from 'react';

const MessageContainer = () => {
  return (
    <div className="flex-1 h-full p-4 bg-gray-900 overflow-y-auto">
      <div className="flex flex-col space-y-4">
        {/* Sent Message */}
        <div className="flex justify-end">
          <div className="bg-blue-700 text-white p-3 rounded-lg max-w-xs">
            <p>Hello, how are you?</p>
          </div>
        </div>
        
        {/* Received Message */}
        <div className="flex justify-start">
          <div className="bg-gray-800 text-white p-3 rounded-lg max-w-xs">
            <p>I'm good, how about you?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
