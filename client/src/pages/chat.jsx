import ContactContainer from '../components/Contact-container';
import ChatContainer from '../components/Chat-container';
import EmptyChatContainer from '../components/Empty-chat-container';
import { useAppStore } from '../store';
import { useState } from 'react';

const Chat = () => {
  const [showContact, setShowContact] = useState(true); // Track whether to show contacts or chat on mobile
  const { selectedChatType } = useAppStore();

  const handleContactClick = () => {
    setShowContact(false); // On mobile, hide contacts and show chat
  };

  const handleBackToContacts = () => {
    setShowContact(true); // On mobile, return to contact view
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - ContactContainer for desktop; toggleable on mobile */}
      <div className={`border-r border-gray-300 w-full md:w-1/5 ${showContact ? 'block' : 'hidden md:block'}`}>
        <ContactContainer onContactClick={handleContactClick} />
      </div>

      {/* Right Side - ChatContainer or EmptyChatContainer based on screen size and selected chat */}
      <div className={`flex-1 ${showContact ? 'hidden' : 'block'} md:block`}>
        {selectedChatType !== undefined ? (
          <ChatContainer onBack={handleBackToContacts} />
        ) : (
          <EmptyChatContainer />
        )}
      </div>
    </div>
  );
};

export default Chat;
