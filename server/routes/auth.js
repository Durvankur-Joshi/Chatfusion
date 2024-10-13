import { Router } from 'express';

import { getUserInfo ,login, register , updateProfile } from '../controllers/authController.js';
import {verifyToken} from "../middleware/Authmiddleware.js"
const authRoutes = Router() ;

authRoutes.post("/register", register);
authRoutes.post("/login", login);
// authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);


export default authRoutes ;