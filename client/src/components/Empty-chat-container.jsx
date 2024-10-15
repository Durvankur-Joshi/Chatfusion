import React from 'react';
import { FaCommentDots } from 'react-icons/fa';

const EmptyChatContainer = () => {
  return (
    <>
       <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-500">
      {/* Icon */}
      <FaCommentDots className="text-6xl mb-4 text-blue-500" />
      
      {/* Message */}
      <h2 className="text-2xl font-semibold">Select a contact to start chatting</h2>
      
      <p className="mt-2 text-sm text-gray-400">
        Your conversations will appear here once you choose a contact.
      </p>
    </div>
    </>
  )
}

export default EmptyChatContainer