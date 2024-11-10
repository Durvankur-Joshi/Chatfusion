import React from 'react';
import { FaCommentDots } from 'react-icons/fa';
import AnimatedChatIcon from './AnimatedChatIcon';

const EmptyChatContainer = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-[80vw] bg-gray-900 text-gray-500">
  {/* Icon */}
  <AnimatedChatIcon />

  {/* Message */}
  <h2 className="text-4xl">
    Hi! <span>Welcome to </span> <span className="text-purple-800 font-bold">ChatFusion</span>
  </h2>

  <p className="mt-2 text-sm text-gray-400">
    Your conversations will appear here once you choose a contact.
  </p>
</div>

    </>
  )
}

export default EmptyChatContainer