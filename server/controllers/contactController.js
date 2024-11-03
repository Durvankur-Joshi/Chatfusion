import mongoose from "mongoose";
import User from "../models/User.js";
import Message from "../models/MessageModel.js";

export const searchContact = async (req, res, next) => {
    try {
      
         const {searchTerm}= req.body;

         if(searchTerm === undefined || searchTerm === null)
         {
            return res.status(400).send("searchTerm is required");
         }

         const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^{}()|[\]\\]/g,
            "\\$&"
         )

         const regex = new RegExp(sanitizedSearchTerm , "i");

         const contacts = await User.find({
            $and:[
                {_id:{$ne:req.userId}},
                {
                    $or:[{firstname:regex} , {lastname:regex} , {email:regex}]
                },
            ]
         })

         
         return res.status(200).send({ message: "Search successfully", contacts });
         
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  };
  
export const getContactForDMList = async (req, res, next) => {
   try {
     let userId = req.userID; // Ensure you're using req.userID
 
     userId = new mongoose.Types.ObjectId(userId);
 
     const contacts = await Message.aggregate([
       {
         $match: {
           $or: [{ sender: userId }, { recipient: userId }],
         },
       },
       {
         $sort: { timestamp: -1 },
       },
       {
         $group: {
           _id: {
             $cond: {
               if: { $eq: ["$sender", userId] }, // Added $ before sender
               then: "$recipient",
               else: "$sender",
             },
           },
           lastMessagezTime: { $first: "$timestamp" },
         },
       },
       {
         $lookup: {
           from: "users", // Ensure this is the exact name of your user collection
           localField: "_id",
           foreignField: "_id",
           as: "contactInfo",
         },
       },
       {
         $unwind: "$contactInfo",
       },
       {
         $project: {
           _id: 1,
           lastMessagezTime: 1,
           email: "$contactInfo.email",
           firstname: "$contactInfo.firstname",
           lastname: "$contactInfo.lastname",
           image: "$contactInfo.image",
           color: "$contactInfo.color",
         },
       },
       {
         $sort: { lastMessagezTime: -1 },
       },
     ]);
 
     return res.status(200).send({ contacts });
   } catch (error) {
     console.log(error);
     return res.status(500).send("Internal server error");
   }
 };
 
  

//   export const getContactForDMList = async (req, res, next) => {
//    try {
     
//        let userId  = req.userID;
//        userId = new mongoose.Types.ObjectId(userId);

//        const contact = await Message.aggregate([
//          {
//             $match:{
//                $or:[{sender:userId} , {recipient:userId}],
//             }
//          },
//          {
//             $sort:{timestamp : -1},
//          },
//          {
//             $group:{
//                _id:{
//                   $cond:{
//                      if:{$eq:["$sender" , userId]},
//                      then:"$recipient",
//                      else:"sender"
//                   }

//                },
//                lastMessagezTime:{$first:"$timestamp"}
//             }
//          },
//          {
//             $lookup:{
//                from:"user",
//                localField:"_id",
//                foreignField:"_id",
//                as:"contactInfo",
//             }
//          },
//          {
//             $unwind:"$contactInfo"
//          },
//          {
//             $project:{
//                _id:1,
//                lastMessagezTime:1,
//                email:"$contactInfo.email",
//                firstname:"$contactInfo.firstname",
//                lastname:"$contactInfo.lastname",
//                image:"$contactInfo.image",
//                color:"$contactInfo.color",

//             },
//          },
//             {
//                $sort:{lastMessagezTime:1},
//             },

//        ])

        
//         return res.status(200).send({contact});
        
//    } catch (error) {
//      console.log(error);
//      return res.status(500).send("Internal server error");
//    }
//  };