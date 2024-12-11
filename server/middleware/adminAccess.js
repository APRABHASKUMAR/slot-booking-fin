import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateAdmin = (req, res, next) => {
    const user = req.user;  // This assumes you are using JWT authentication or similar
    
    // Check if the user role is admin
    if (user && user.role === 'admin') {
      return next();  // Allow access to the next route handler
    }
    
    // If not admin, return a 403 Forbidden response
    return res.status(403).json({ message: 'Forbidden: Admin access only' });
  };