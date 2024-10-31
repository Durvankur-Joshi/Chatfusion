import React, { useRef, useState, useEffect } from "react";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "../store";
import { useSocket } from "../context/SocketContext.jsx";

const MessageBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const socket = useSocket();
  const { selectedChatType, selectedChatData, userInfo, addMessage } = useAppStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      sender: userInfo.id,
      content: message,
      recipient: selectedChatData._id,
      messageType: "text",
      fileUrl: undefined,
      timestamp: new Date().toISOString(),
    };

    // Emit message
    socket.emit("sendMessage", messageData);

    // Add to local store
    addMessage(messageData);

    // Clear input field
    setMessage("");
  };

  return (
    <div className="bg-gray-900 p-4 flex items-center space-x-2 border-t relative">
      <label className="cursor-pointer">
        <FaPaperclip className="text-white text-xl mx-2" />
        <input type="file" className="hidden" />
      </label>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg p-2"
      />

      <div className="relative">
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <FaSmile />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker theme="dark" onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
          </div>
        )}
      </div>

      <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
        <FaPaperPlane className="mr-1" /> Send
      </button>
    </div>
  );
};

export default MessageBar;
