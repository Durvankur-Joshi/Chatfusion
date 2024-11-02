import { Router } from "express";
import { verifyToken } from "../middleware/Authmiddleware.js";
import { getContactForDMList, searchContact } from "../controllers/contactController.js";


const contactRoutes = new Router();

contactRoutes.post("/search" , verifyToken , searchContact);
contactRoutes.get("/get-contacts-for-dm" , verifyToken , getContactForDMList);

export default contactRoutes;