import React from 'react';
import ChatHeader from './ChatHeader';
import MessageContainer from './MessageContainer';
import MessageBar from './MessageBar';

const ChatContainer = () => {
  return (
    <div className=" h-full bg-white flex flex-col ">
    {/* Chat Header */}
    <ChatHeader className=" "/>

    {/* Message Container */}
    <div className="flex-grow overflow-y-auto ">
      <MessageContainer  />
    </div>

    {/* Message Bar */}
    <MessageBar />
  </div>
  );
};

export default ChatContainer;
