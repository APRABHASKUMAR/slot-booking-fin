import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res, next) => {
  

  try {
    const { email, pass } = req.body;
    // Check if the user exists in the database
    console.log(pass);
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user details and token
    const { password, ...rest } = user._doc; // Exclude the password from the response
    res.status(200).json({
      ...rest,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Optional: Hook for future SSO integration
export const ssoLogin = async (req, res, next) => {
  res.status(200).json({ message: "SSO integration available in the future." });
};
