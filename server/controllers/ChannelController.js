import Channel from "../models/ChannelModel.js";
import User from "../models/User.js";

// export const createChannel = async (request, response, next) => {
//   try {
//     const { name, members } = request.body;
//     const userId = request.userID;

//     const admin = await User.findById(userId);
//     if (!admin) {
//       return response.status(400).send("Admin user not found.");
//     }

//     const validMembers = await User.find({ _id: { $in: members } });
//     if (validMembers.length !== members.length) {
//       return response.status(400).send("Some members are not valid users.");
//     }

//     const newChannel = new Channel({
//       name,
//       members,
//       admin: userId,
//     });

//     await newChannel.save();
//     return response.status(201).json({ channel: newChannel });
//   } catch (error) {
//     console.log({ error });
//     return response.status(500).send("Internal Server Error");
//   }
// };


export const createChannel = async (request, response, next) => {
  try {
    const { name, members } = request.body;
    const userId = request.userID;

    const admin = await User.findById(userId);
    if (!admin) {
      return response.status(400).send("Admin user not found.");
    }

    const validMembers = await User.find({ _id: { $in: members } });
    console.log("Members provided:", members);
    console.log("Valid members found in database:", validMembers);

    if (validMembers.length !== members.length) {
      return response.status(400).send("Some members are not valid users.");
    }

    const newChannel = new Channel({
      name,
      members,
      admin: userId,
    });

    await newChannel.save();
    return response.status(201).json({ channel: newChannel });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};
