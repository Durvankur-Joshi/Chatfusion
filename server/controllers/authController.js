import { compare } from 'bcrypt';
import User from '../models/User.js'; // Adjust the import based on your folder structure
import pkg from 'jsonwebtoken';
import { request } from 'express';
const { sign } = pkg;


const maxAge = 3* 24 * 60 * 60 * 100 ; 

const createToken = (email, userId) => {
  return sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
      
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.create({ email, password });

    // Change this to use user._id instead of userId
    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None"
    });

    return res.status(201).json({
      user: {
        id: user._id,  // Change userId to user._id
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
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


export const updateProfile  = async (req, res) => {
  const { userID } = req; 
  const { firstName, lastName, color } = req.body;

 
  if (!firstName || !lastName ) {
    return res.status(400).send("First Name, Last Name, and color are required");
  }

  try {
    const userData = await User.findByIdAndUpdate(
      userID, 
      { firstName, lastName, color, profileSetup: true },
      { new: true, runValidators: true }
    );

    if (!userData) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      color: userData.color,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).send("Internal server error");
  }
};
