import React, { useRef, useEffect } from 'react';
import { useAppStore } from '../store';
import moment from "moment";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatData, selectedChatType, selectedChatMessage } = useAppStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  const renderMessage = () => {
    let lastDate = null;
    return selectedChatMessage.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {/* Render messages for both sender and receiver */}
          {renderDMMessage(message)}
        </div>
      );
    });
  };

  const renderDMMessage = (message) => {
    const isSender = message.sender === selectedChatData._id;
    return (
      <div className={`${isSender ? "text-left" : "text-right"}`}>
        {message.messageType === 'text' && (
          <div
            className={`${
              isSender
                ? "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
                : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 h-full p-4 bg-gray-900">
      {renderMessage()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
