import React, { useState } from 'react';
import { FaPaperclip, FaSmile, FaPaperPlane } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const MessageBar = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handle sending message and file
  const handleSendMessage = () => {
    if (message || file) {
      console.log('Message sent:', message);
      if (file) {
        console.log('File sent:', file.name);
      }
      setMessage(''); // Reset message
      setFile(null); // Reset file
    }
  };

  // Handle emoji selection
  const addEmoji = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.native); // Append emoji to message
    setShowEmojiPicker(false); // Hide emoji picker after selection
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  return (
    <div className="bg-gray-900 p-4 flex items-center space-x-2 border-t relative">
      {/* File Attachment */}
      <label className="cursor-pointer">
        <FaPaperclip className="text-white text-xl mx-2" />
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Message Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg p-2"
      />

      {/* Emoji Picker Toggle */}
      <FaSmile
        className="text-white text-xl mx-2 cursor-pointer"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      />

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 z-50">
          <Picker data={data} onEmojiSelect={addEmoji} />
        </div>
      )}

      {/* Send Button */}
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <FaPaperPlane className="mr-1" /> Send
      </button>
    </div>
  );
};

export default MessageBar;
