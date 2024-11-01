
import Message from "../models/MessageModel.js";

export const getMessage = async (req, res, next) => {
    try {
      
         const user1 = req.userID;
         const user2 = req.body.id;

         if(!user1 || !user2 )
         {
            return res.status(400).send("Both usser ID's are required");
         }

         const message = await Message.find({
            $or:[
                {sender:user1 , recipient:user2},
                {sender:user2 , recipient:user1}
            ]
         }).sort({timestamp:1})

      
         
         return res.status(200).json({ message });
         
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  };