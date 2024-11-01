import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"
import  contactRoutes  from "./routes/contactRoutes.js";
import setupSocket from "./socket.js";
import messageRoutes from "./routes/MessageRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const databaseURL = process.env.DATABASE_URL;

// Middlewares
app.use(cors({
  origin: process.env.ORIGIN,
    methods: ["GET" , "POST" , "PUT" , "PATCH" , "DELETE"],
    credentials: true ,
}));

  
app.use("/uploads/profiles", express.static("uploads/profiles"));
 

app.use(cookieParser());
app.use(express.json());  


app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/messages', messageRoutes);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

setupSocket(server);

// Connect to MongoDB

mongoose
.connect(databaseURL)
.then(() => console.log("Database is Connected"))
.catch((err) => console.log(err.message)
)