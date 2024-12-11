import express from 'express';
import Booking from '../models/Booking.js';
import { checkAccess } from '../middleware/rbac.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Assuming you have this middleware
import { checkIfUserExists, createUser } from '../adUtils.js';

const router = express.Router();

router.post('/api/admin/courses', verifyToken, checkAccess('createAny', 'course'), async (req, res) => {
    const { name, description, startDate, endDate } = req.body;
    try {
      const newCourse = new Course({
        name,
        description,
        startDate,
        endDate
      });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Failed to create course' });
    }
});

router.get('/api/admin/bookings', verifyToken, checkAccess('readAny', 'booking'), async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user').populate('course');
        res.json(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
      }
});

// Route to check if user exists in Active Directory
router.post('/check-user', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const userExists = await checkIfUserExists(username);  // Await the result

    if (userExists) {
      console.log(`User ${username} found`);
      res.status(200).json({ message: `User ${username} exists` });
    } else {
      console.log(`User ${username} not found`);
      res.status(404).json({ message: `User ${username} does not exist` });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Error checking user', error: error.message });
  }
});

// Route to create a new user in Active Directory
router.post('/create-user', async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Call the createUser function
    const newUser = await createUser(username, password, firstName, lastName);
    
    if (newUser) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      res.status(500).json({ message: 'Error creating user in Active Directory' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Route to change user password
router.post('/change-password', (req, res) => {
  const { username, newPassword } = req.body;

  // Check if username and newPassword are provided
  if (!username || !newPassword) {
    return res.status(400).json({ error: 'Username and new password are required.' });
  }

  // Update the user's password
  ad.updateUser(username, { userPassword: newPassword }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error changing password: ' + err.message });
    } else {
      return res.status(200).json({ message: 'Password changed successfully' });
    }
  });
});

export default router;
