import { createContext, useContext, useRef, useEffect } from "react";
import { useAppStore } from "../store";
import { HOST } from "../utils/constants";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

 export const SocketProvider = ({ children }) => {  // Corrected the component name
  const socket = useRef(null);                     // Ensure socket is initialized as null
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {         // Fixed the typo here
        console.log("Connected to socket server");
      });

      // Handle disconnection
      socket.current.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();               // Ensures disconnection on cleanup
        console.log("Socket disconnected");
      }
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

