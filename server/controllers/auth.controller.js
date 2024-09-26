import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res, next) => {
  

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        
      return res.status(401).json({ message: "user does not exist" });
      
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user details and token
    const { passwrd, ...rest } = user._doc; // Exclude the password from the response
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
