import { Router } from "express";
import { verifyToken } from "../middleware/Authmiddleware.js";
import { getMessage } from "../controllers/MessageController.js";

const messageRoutes = Router();

messageRoutes.post("/get-message" , verifyToken , getMessage);

export default messageRoutes;