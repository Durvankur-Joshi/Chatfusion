import React from 'react';
import ContactContainer from '../components/Contact-container';

import ChatContainer from '../components/Chat-container';
import EmptyChatContainer from '../components/Empty-chat-container';
import { useAppStore } from '../store';


const Chat = () => {

  const { userInfo, selectedChatType } = useAppStore();
  return (
    <div className="flex h-screen">
      {/* Left side - Contact container (30% of the screen) */}
      <div className="w-1/5 border-r border-gray-300">
        <ContactContainer />
      </div>
      <div className="flex-1">
        {selectedChatType === undefined  ? (
          <EmptyChatContainer />
        ) : (
          <ChatContainer />
        )}
      </div>
    </div>


  );
};

export default Chat;
