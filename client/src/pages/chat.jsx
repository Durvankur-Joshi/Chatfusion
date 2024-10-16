import React from 'react';
import ContactContainer from '../components/Contact-container';

import ChatContainer from '../components/Chat-container';
import EmptyChatContainer from '../components/Empty-chat-container';

const Chat = () => {
  return (
    <div className="flex h-screen">
      {/* Left side - Contact container (30% of the screen) */}
      <div className="w-1/5 border-r border-gray-300">
        <ContactContainer />
      </div>

      {/* Right side - Empty chat container (70% of the screen) */}
      {/* <div className="w-11/12">
        <EmptyChatContainer />
      </div> */}
       <div className="flex-1">
        <ChatContainer />
      </div>
    </div>
  
  );
};

export default Chat;
