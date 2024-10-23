import React, { useRef, useState, useEffect } from 'react';
import { FaPaperclip, FaSmile, FaPaperPlane } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';


const MessageBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Close the emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiRef]);

  // Handle emoji selection
  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  // Handle sending the message and file
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

  // Handle file input
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

      {/* Emoji Picker */}
      <div className="relative">
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <FaSmile />
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        )}
      </div>

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
