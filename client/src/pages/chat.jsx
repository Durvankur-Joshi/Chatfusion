import React from 'react';
import ContactContainer from '../components/Contact-container';
import Chat_container from '../components/Chat-container';
import EmptyChatContainer from '../components/Empty-chat-container';

const Chat = () => {
  return (
    <div className="flex h-screen">
      {/* Left side - Contact container (30% of the screen) */}
      <div className="w-1/3 border-r border-gray-300">
        <ContactContainer />
      </div>

      {/* Right side - Empty chat container (70% of the screen) */}
      <div className="w-11/12">
        <EmptyChatContainer />
      </div>
    </div>
  );
};

export default Chat;
