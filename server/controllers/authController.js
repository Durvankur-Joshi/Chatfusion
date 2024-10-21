import { compare } from 'bcrypt';
import User from '../models/User.js'; // Adjust the import based on your folder structure
import pkg from 'jsonwebtoken';
import { request, response } from 'express';
const { sign } = pkg;


const maxAge = 3* 24 * 60 * 60 * 100 ; 

const createToken = (email, userId) => {
  return sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};



// export const register = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).send("Email and password are required");
//     }

//     // Attempt to create a user
//     const user = await User.create({ email, password });
//     console.log("User created successfully:", user); // Log success

//     // Create token with user._id and log it
//     const token = createToken(email, user._id);
//     console.log("Token created:", token);

//     // Set cookie with JWT token
//     res.cookie("jwt", token, {
//       maxAge, 
//       secure: true, 
//       sameSite: "None"
//     });

//     // Return user data in response
//     return res.status(201).json({
//       user: {
//         id: user._id,  // user._id instead of userId
//         email: user.email,
//         profileSetup: user.profileSetup,
//       },
//     });
//   } catch (error) {
//     console.error("Error during user registration:", error); // More detailed logging
//     return res.status(500).send("Internal Server Error");
//   }
// };
// export const register = async (req, res, next) => {
//   try {
//     if (!email || !password) {
//       return res.status(400).send("Email and password is required");
//     }

//     const user = await User.create({email , password});
//     res.cookie("jwt" , createToken(email , user.id),{
//       maxAge,
//       secure:true,
//       sameSite:"None"
//     })

//     return res.status(200).json({
//       user: {
//         id: user._id,
//         email: user.email,
//         profileSetup: user.profileSetup
//       }
        
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send("Internal server error");
//   }
// };
export const register = async (req, res, next) => {
  try {
    // Destructure email and password from req.body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Create a new user
    const user = await User.create({ email, password });

    // Create a JWT token and set the cookie
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    // Return the user details in the response
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and Password are required.");
    }

    // Correct the User model reference here
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User with the given email is not found.");
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).send("Password is incorrect.");
    }

    // Correct the 'res' object usage
    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstname,
        lastName: user.lastname,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};




export const getUserInfo = async (req, res) => {
  try {
    console.log("Request received with userID:", req.userID);  

    const userData = await User.findById(req.userID); 
    if (!userData) {
      return res.status(404).send("User with this ID not found");
    }

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstname,
      lastName: userData.lastname,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return res.status(500).send("Internal server error");
  }
};


export const updateProfile = async (req, res) => {
  const { userID } = req; // Ensure userID is added to req via verifyToken middleware
  const { firstName, lastName, color } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "First Name and Last Name are required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { firstName, lastName, profileSetup: true },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      color: updatedUser.color,
      profileSetup: updatedUser.profileSetup,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Add profile image
export const addProfileImage = async (req, res) => {
  const { userID } = req;
  const profileImage = req.file;

  if (!profileImage) {
    return res.status(400).json({ error: "No profile image uploaded" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { image: profileImage.path },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      color: updatedUser.color,
      profileImage: updatedUser.image,
    });
  } catch (error) {
    console.error("Error adding profile image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Remove profile image
export const removeProfileImage = async (req, res) => {
  const { userID } = req;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { image: null },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Optionally delete the file from the filesystem here
    return res.status(200).json({
      id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      profileImage: null, // Image removed
    });
  } catch (error) {
    console.error("Error removing profile image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res, next) => {
  try {
   res.cookie("jwt",'',{maxAge:1 , secure:true , sameSite:"None"}) 
   return res.status(200).send("Logout Successful");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};