import React, { useRef, useState, useEffect } from "react";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "../store";
import { useSocket } from "../context/SocketContext";
import { apiClient } from "../lib/api-client";
import { UPDATE_PROFILE_ROUTES, UPLOAD_FILE_ROUTES } from "../utils/constants";

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const [message, setMessage] = useState("");
  const socket = useSocket();
  const { selectedChatType, selectedChatData, userInfo, addMessage  , setSelectedChatMessage } = useAppStore();
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
      messageType: "text",
      fileUrl: undefined,
      timestamp: new Date().toISOString(),
    };
  
    if (selectedChatType === "contact") {
      messageData.recipient = selectedChatData._id;
      socket.emit("sendMessage", messageData);
    } else if (selectedChatType === "channel") {
      messageData.channelId = selectedChatData._id;
      socket.emit("send-channel-message", messageData);
    }
  
    // Clear input field
    setMessage("");
  };
  

  const handleAttachmentClick = () =>{
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

// const handleAttachmentChange = async(event) =>{
//    try{
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append("file" , file);

//     const response = await apiClient.post(UPLOAD_FILE_ROUTES , formData , {withCredentials:true})

//     if (response.status === 200 && response.data) {
//       if (selectedChatType === "contact") {
//         const sendMessage = {
//           sender: userInfo.id,
//           content: undefined,
//           recipient: selectedChatData._id,
//           messageType: "file",
//           fileUrl: response.data.filePath,
//           timestamp: new Date().toISOString(),
//         };
    
//         // Emit message
//         socket.emit("sendMessage", sendMessage);
//         console.log(sendMessage)

    
//       } else if (selectedChatType === "channel") {
//         const sendMessage = {
//           sender: userInfo.id,
//           content: undefined,
//           messageType: "file",
//           fileUrl: response.data.filePath,
//           timestamp: new Date().toISOString(),
//           channelId : selectedChatData._id
//         };
//         socket.emit("sendMessage", sendMessage);
//         console.log(sendMessage)
//       }
//     }
//     console.log({file})
//    }catch(error)
//    {
//     console.log({error});
    
//    }
// }
const handleAttachmentChange = async (event) => {
  try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post(UPLOAD_FILE_ROUTES, formData, { withCredentials: true });

      if (response.status === 200 && response.data) {
          const sendMessage = {
              sender: userInfo.id,
              content: undefined,
              messageType: "file",
              fileUrl: response.data.filePath,
              timestamp: new Date().toISOString(),
          };

          if (selectedChatType === "contact") {
            sendMessage.recipient = selectedChatData._id;
            socket.emit("sendMessage", sendMessage);
            console.log("File sent to contact:", sendMessage);
        } else if (selectedChatType === "channel") {
            sendMessage.channelId = selectedChatData._id;
            socket.emit("send-channel-message", sendMessage);
            console.log("File sent to channel:", sendMessage);
        }
        
        
          // Add to local store immediately after emitting
          
          console.log("File sent successfully:", file);
      }
  } catch (error) {
      console.log("Error sending file:", error);
  }
};




  return (
    <div className="bg-gray-900 p-4 flex items-center space-x-2 border-t relative">
      <label className="cursor-pointer">
        <FaPaperclip className="text-white text-xl mx-2" />
        <input type="file" className="hidden"  ref={fileInputRef} onChange={handleAttachmentChange}/>
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
