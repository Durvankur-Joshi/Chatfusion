import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const databaseURL = process.env.DATABASE_URL;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173'],
    methods: ["GET" , "POST" , "PUT" , "PATCH" , "DELETE"],
    credentials: true ,
}));
app.use(cookieParser());
app.use(express.json()); // to parse JSON request bodies

app.use('/api/auth', authRoutes);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Connect to MongoDB
mongoose.connect(databaseURL, {
  
  ssl: true, // Force SSL connection
})
  .then(() => console.log("Database is connected"))
  .catch((err) => console.error("Database connection error: ", err));
