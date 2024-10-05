import User from '../models/User.js'; // Adjust the import based on your folder structure
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
  const { email, password, firstname, lastname, image, color } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Ensure password meets length requirement
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Create a new user (password hashing is handled by the schema's pre-save hook)
    const newUser = new User({
      email,
      password,
      firstname,
      lastname,
      image,
      color
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    try {
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: '1h', // Token expiration time
      });

      // Send token and user information
      res.status(200).json({ token, userId: user._id });
    } catch (error) {
      console.error('Token generation error:', error);
      res.status(500).json({ message: 'Token generation error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
