
import Message from "../models/MessageModel.js";
import {mkdirSync, renameSync} from "fs"

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


//     try {
//       if (!req.file) {
//         return res.status(400).send("File is required");
//       }
  
//       // Ensure Date.now() is used properly
//       const date = Date.now(); // fix this variable name
//       let fileDir = `uploads/${date}`; // fix the directory path, missing '/'
//       let fileName = `${fileDir}/${req.file.originalname}`; // fix file path usage
  
//       mkdirSync(fileDir, { recursive: true });
  
//       renameSync(req.file.path, fileName);
  
//       return res.status(200).json({ filePath: fileName });
//     } catch (error) {
//       console.error("Error during file processing:", error);
//       return res.status(500).send("Internal server error");
//     }
//   };
  


export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required");
    }

    // Ensure Date.now() is used properly
    const date = Date.now();
    let fileDir = `uploads/files`; 
    let fileName = `${fileDir}/${req.file.originalname}`;

    mkdirSync(fileDir, { recursive: true });
    renameSync(req.file.path, fileName);

    return res.status(200).json({ filePath: fileName });
  } catch (error) {
    console.error("Error during file processing:", error);
    return res.status(500).send("Internal server error");
  }
};
