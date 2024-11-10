import React, { useRef, useEffect , useState } from 'react';
import { useAppStore } from '../store';
import moment from "moment";
import { apiClient } from '../lib/api-client';
import { GET_ALL_MESSAGES_ROUTES, HOST , GET_CHANNEL_MESSAGES} from '../utils/constants';
import { FaFileDownload } from 'react-icons/fa';
import { IoMdCloseCircle, IoMdFolder } from 'react-icons/io';

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatData, selectedChatType, selectedChatMessage, setSelectedChatMessage ,userInfo } = useAppStore();
  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(GET_ALL_MESSAGES_ROUTES,
          { id: selectedChatData._id },
          { withCredentials: true }
        )
        if (response.data.message) {
          setSelectedChatMessage(response.data.message);
        }
      } catch (error) {
        console.log({ error })
      }
    }
    const getChannelMessages = async () => {
      try {
        const response = await apiClient.get(
          `${GET_CHANNEL_MESSAGES}/${selectedChatData._id}`,
          { withCredentials: true }
        );
        if (response.data.messages) {
          setSelectedChatMessage(response.data.messages);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    

    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
      else if (selectedChatType === "channel") getChannelMessages()
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessage])


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  }

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
          
          {selectedChatType === "contact" && renderDMMessage(message)}

          {selectedChatType === "channel" && renderChannelMessage(message)}

        </div>
      );
    });
  };


  const downloadFile = async (url) => {
    const response = await apiClient.get(`${HOST}/${url}`, { responseType: "blob" });

    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link)
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob)
  }

  const renderDMMessage = (message) => {
    const isSender = message.sender === selectedChatData._id;
    return (
      <div className={`${isSender ? "text-left" : "text-right"}`}>
        {message.messageType === 'text' && (
          <div
            className={`${isSender
              ? "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
              : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        {message.messageType === 'file' && (
          <div
            className={`${isSender
              ? "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
              : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? <div className=' cursor-pointer'
              onClick={() => {
                setShowImage(true)
                setImageURL(message.fileUrl)

              }}>
              <img src={`${HOST}/${message.fileUrl}`} height={300} width={300} />
            </div> :
              <div className=' flex items-center justify-center gap-4'>
                <span className=' text-white/80 text-3xl bg-black/20 rounded-full p-3'>
                  <IoMdFolder />
                </span>
                <span>
                  {message.fileUrl.split(
                    "/").pop()
                  }
                </span>
                <span className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
                  onClick={() => downloadFile(message.fileUrl)}>
                  <FaFileDownload />
                </span>

              </div>}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  const renderChannelMessage = (message) => {
    const isSender = message.sender._id === userInfo.id;
    
    return (
      <div className={`${message.sender._id !== userInfo.id ? "text-left" : "text-right"}`}>
        {message.messageType === 'text' && (
          <div
            className={`${ message.sender._id === userInfo.id 
              ? "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
              : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        {!isSender && (
          <div className="flex items-center gap-3 mt-2">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              {message.sender.image ? (
                <img
                  src={`${HOST}/${message.sender.image}`}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
            <div className="text-sm text-gray-400">
              {moment(message.timestamp).format("LT")}
            </div>
          </div>
        )}
         {message.messageType === 'file' && (
          <div
            className={`${isSender
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              :"bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
              } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? <div className=' cursor-pointer'
              onClick={() => {
                setShowImage(true)
                setImageURL(message.fileUrl)

              }}>
              <img src={`${HOST}/${message.fileUrl}`} height={300} width={300} />
            </div> :
              <div className=' flex items-center justify-center gap-4'>
                <span className=' text-white/80 text-3xl bg-black/20 rounded-full p-3'>
                  <IoMdFolder />
                </span>
                <span>
                  {message.fileUrl.split(
                    "/").pop()
                  }
                </span>
                <span className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'
                  onClick={() => downloadFile(message.fileUrl)}>
                  <FaFileDownload />
                </span>

              </div>}
          </div>
        )}
      </div>
    );
  };
  

  return (
    <div className="flex-1 p-4 bg-gray-900">
      {renderMessage()}
      <div ref={scrollRef} />
      {showImage && (
  <div className="fixed z-[100] inset-0 flex items-center justify-center backdrop-blur-md bg-black/60">
    <div className="relative">
      <img
        src={`${HOST}/${imageURL}`}
        alt="Preview"
        className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
      />
      <div className="absolute top-5 right-5 flex gap-4">
        <button
          className="bg-black/50 p-3 text-2xl rounded-full hover:bg-black/70 text-white transition-all duration-300"
          onClick={() => downloadFile(imageURL)}
          aria-label="Download"
        >
          <FaFileDownload />
        </button>
        <button
          className="bg-black/50 p-3 text-2xl rounded-full hover:bg-black/70 text-white transition-all duration-300"
          onClick={() => {
            setShowImage(false);
            setImageURL(null);
          }}
          aria-label="Close"
        >
          <IoMdCloseCircle />
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MessageContainer;