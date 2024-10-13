### ChatFusion
ChatFusion is a real-time chat application built using the MERN stack (MongoDB, Express, React, and Node.js) with Socket.IO for WebSocket-based communication. It offers features like user authentication, group chat functionality, message persistence, and typing indicators. The app ensures fast, scalable, and secure messaging between users.

## Features
- Real-time Messaging: Instant chat powered by WebSocket connection using Socket.IO.
- User Authentication: Secure login and registration using JWT (JSON Web Tokens) for token-based authentication.
- Message Persistence: Messages are saved in MongoDB, allowing users to view past conversations.
- Typing Indicators: Shows when other users are typing.
- Group Chat: Create and join group conversations.
- Responsive UI: Designed with Tailwind CSS for a clean, responsive interface.
Tech Stack
- Frontend: React with Tailwind CSS for UI styling and Vite as the build tool.
- Backend: Node.js with Express to handle API requests and Socket.IO for real-time communication.
- Database: MongoDB for storing user data and messages.
- Authentication: JWT (JSON Web Token) for securing user sessions.
- WebSockets: Socket.IO for real-time chat functionality.
### Installation
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed on your local machine
MongoDB running on your system or a cloud-based MongoDB Atlas account
Clone the Repository
bash
Copy code
git clone https://github.com/your-username/chatfusion.git
cd chatfusion
Install Dependencies
Backend (Node.js):
bash
Copy code
cd server
npm install
Frontend (React):
bash
Copy code
cd client
npm install
Set Up Environment Variables
In the server folder, create a .env file and add the following environment variables:

bash
Copy code
PORT=8080
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
Running the Application
Backend:
bash
Copy code
cd server
npm start
The backend will run on http://localhost:8080.

Frontend:
bash
Copy code
cd client
npm run dev
The frontend will run on http://localhost:3000.

Socket.IO Configuration
The real-time messaging is handled by Socket.IO. Ensure the client-side Socket.IO connects to the correct backend endpoint:

javascript
Copy code
const socket = io('http://localhost:8080');
API Endpoints
Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Login a user and return a JWT token
Messages
GET /api/messages/:chatId - Get all messages for a specific chat
POST /api/messages - Send a new message to the chat
### Folder Structure
csharp
Copy code
chatfusion/
├── client/              # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/              # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── README.md
└── .env.example
