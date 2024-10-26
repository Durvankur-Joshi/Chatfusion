import { Router } from "express";
import { verifyToken } from "../middleware/Authmiddleware.js";
import { searchContact } from "../controllers/contactController.js";


const contactRoutes = new Router();

contactRoutes.post("/search" , verifyToken , searchContact);

export default contactRoutes;