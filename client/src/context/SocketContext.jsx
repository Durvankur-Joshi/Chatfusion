import { createContext, useContext, useRef, useEffect } from "react";
import { useAppStore } from "../store";
import { HOST } from "../utils/constants";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo && !socket.current) {
      // Initialize socket connection with user ID as a query parameter
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      // Log connection status
      socket.current.on("connect", () => {
        console.log("Connected to socket server:", socket.current.id);
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)
        ) {
          console.log("Message received:", message);
          addMessage(message); // Update store with new message
        }
      };

      // Listen for the 'receiveMessage' event
      socket.current.on("receiveMessage", handleReceiveMessage);

      // Cleanup on component unmount or user logout
      return () => {
        if (socket.current) {
          socket.current.disconnect();
          socket.current = null; // Clear reference to prevent reconnection
        }
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
