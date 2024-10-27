import User from "../models/User.js";

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

         console.log("Matched contacts:", contacts);
         return res.status(200).send({ message: "Search successfully", contacts });
         
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  };