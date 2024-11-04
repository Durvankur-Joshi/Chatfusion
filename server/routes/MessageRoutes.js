// import { Router } from "express";
// import { verifyToken } from "../middleware/Authmiddleware.js";
// import { getMessage, uploadFile } from "../controllers/MessageController.js";
// import multer from "multer";

// const messageRoutes = Router();

// const upload = multer({dest:"uploads/file"});
// messageRoutes.post("/get-message" , verifyToken , getMessage);
// messageRoutes.post("/upload-file" , verifyToken , upload.single("file" , uploadFile))

// export default messageRoutes;

import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middleware/Authmiddleware.js";
import { uploadFile, getMessage } from "../controllers/MessageController.js";

const messageRoutes = Router();

const upload = multer({ dest: "uploads/files" });

messageRoutes.post("/get-message", verifyToken, getMessage);
messageRoutes.post("/upload-file", verifyToken, upload.single("file"), uploadFile);

export default messageRoutes;
