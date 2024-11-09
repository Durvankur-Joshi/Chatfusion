import { Router } from "express";
import { verifyToken } from "../middleware/Authmiddleware.js";
import { createChannel, getUserChannels , getChannelMessages } from "../controllers/ChannelController.js";

const channelRoutes = Router();

channelRoutes.post("/create-channel", verifyToken, createChannel);
channelRoutes.get("/get-user-channel", verifyToken, getUserChannels);
channelRoutes.get(
    "/get-channel-messages/:channelId",
    verifyToken,
    getChannelMessages
  );

export default channelRoutes;
