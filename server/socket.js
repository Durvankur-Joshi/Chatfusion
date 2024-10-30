// import { Server as SocketIOServer } from 'socket.io'
// import Message from './models/MessageModel.js';

// const setupSocket = (server) => {
//     const io = new SocketIOServer(server, {
//         cors: {
//             origin: process.env.ORIGIN,
//             methods: ["GET", "POST"],
//             credentials: true,

//         }
//     })

//     const userSocketMap = new Map();

//     const disconnect = (socket) => {
//         console.log(`Client Disconnected: ${socket.id}`);

//         for (const [userId, socketId] of userSocketMap.entries()) {
//             if (socketId === socket.id) {
//                 userSocketMap.delete(userId);
//                 break;
//             }
//         }
//     }

//     const sendMessage = async (message) =>{
//         const senderSocketId = userSocketMap.get(message.sender);
//         const recipientSocketId = userSocketMap.get(message.recipient);

//         const createdMessage = await Message.create(message);

//         const messageData = await Message.findById(createdMessage._id)
//         .populate("sender" , "id email firstName lastName image color")
//         .populate("recipient" , "id email firstName lastName image color");

//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit("reciveMessage" , messageData)
//         }
//         if (senderSocketId) {
//             io.to(senderSocketId).emit("reciveMessage" , messageData)
//         }
//     }

//     io.on("connection", (socket) => {
//         const userId = socket.handshake.query.userId;

//         if (userId) {
//             userSocketMap.set(userId, socket.id);
//             console.log(`User connected: ${userId} with socket ID: ${socket.id}`)
//         } else {
//             console.log("User ID not provided during connection");

//         }

//         socket.on("sendMessage" , sendMessage)
//         socket.on("disconet", () => disconnect(socket));
//     })
// }


// export default setupSocket;


import { Server as SocketIOServer } from 'socket.io'
import Message from './models/MessageModel.js';

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,

        }
    })

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);

        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }


    const sendMessage = async (message) =>{
                const senderSocketId = userSocketMap.get(message.sender);
                const recipientSocketId = userSocketMap.get(message.recipient);
        
                const createdMessage = await Message.create(message);
        
                const messageData = await Message.findById(createdMessage._id)
                .populate("sender" , "id email firstName lastName image color")
                .populate("recipient" , "id email firstName lastName image color");

                if (recipientSocketId) {
                    io.to(recipientSocketId).emit("receiveMessage", messageData);
                }
                if (senderSocketId) {
                    io.to(senderSocketId).emit("SendMessage", messageData);
                }
                
            }
    // const sendMessage = async (message) => {
    //     try {
    //         console.log("Received message to send:", message); // Log message data before storing
    
    //         // Create the message in the database
    //         const createdMessage = await Message.create(message);
    //         console.log("Created message:", createdMessage); // Log to verify creation
    
    //         // Fetch and populate the message data
    //         const messageData = await Message.findById(createdMessage._id)
    //             .populate("sender", "id email firstName lastName image")
    //             .populate("recipient", "id email firstName lastName image");
    
    //         console.log("Message data after population:", messageData); // Log to verify population
    //     } catch (error) {
    //         console.error("Error in sendMessage function:", error); // Log any errors
    //     }
    // };
    
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`)
        } else {
            console.log("User ID not provided during connection");

        }

        socket.on("sendMessage" ,sendMessage)
        socket.on("disconnect", () => disconnect(socket));

    })
}


export default setupSocket;