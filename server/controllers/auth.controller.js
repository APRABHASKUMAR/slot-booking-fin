import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

// JWT secret key (replace with a secure, environment-specific secret)
const JWT_SECRET = 'your_jwt_secret';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new one
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();
    } else {
      // If user exists, verify the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Prepare user data (excluding sensitive information)
    const userData = {
      id: user._id,
      email: user.email
      // Add any other user data you want to send to the frontend
    };

    res.json({
      token,
      user: userData,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'An error occurred during authentication' });
  }
};