import express from 'express';
import Booking from '../models/Booking.js'; // Import the Booking model
import Course from '../models/Course.js';

const router = express.Router();

router.post('/new', async (req, res) => {
    const { courseId, date, slot, userId } = req.body;

    try {
        // Normalize the date format to YYYY-MM-DD
        // const normalizedDate = new Date(date).toISOString().split('T')[0];
        const normalizedDate = date.substring(0,10);
        const existingBooking = await Booking.findOne({ courseId, date, slot });
        if (existingBooking) {
            return res.status(400).json({ message: "This slot is already booked." });
        }

        const newBooking = new Booking({
            userId,
            courseId,
            date: normalizedDate,
            slot,
            
        });

        await newBooking.save();
        res.status(200).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// Endpoint to fetch upcoming bookings for a specific user
router.get('/upcoming', async (req, res) => {
  console.log("Upcoming bookings route accessed");
  // res.status(200).json({ message: "Upcoming bookings endpoint is working" });
  const {userId} = req.query;
  if(!userId){
    return res.status(400).json({message: "User ID is required."});
  }
  try{
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    console.log("Today's date:", today);
    const upcomingBookings = await Booking.find({ userId: userId, date: { $lt: today }});
    if (upcomingBookings.length === 0) {
      return res.status(404).json({ error: 'No upcoming bookings found' });
    }
    
    // Fetch each course name for the bookings
    const courseIds = upcomingBookings.map(booking => booking.courseId);
    const courses = await Course.find({ id: { $in: courseIds } });
    const courseMap = courses.reduce((map, course) => {
        map[course.id] = course.name;
        return map;
    }, {});

    const enrichedBookings = upcomingBookings.map(booking => ({
        ...booking.toObject(),
        courseName: courseMap[booking.courseId] || 'Course not found'
    }));

    res.json(enrichedBookings);

  }
  catch (error){
    console.error("Server error when fetching bookings:", error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

// Endpoint to fetch upcoming bookings for a specific user
router.get('/past', async (req, res) => {
  console.log("Past bookings route accessed");
  // res.status(200).json({ message: "Past bookings endpoint is working" });
  const {userId} = req.query;
  if(!userId){
    return res.status(400).json({message: "User ID is required."});
  }
  try{
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    console.log("Today's date:", today);
    const pastBookings = await Booking.find({ userId: userId, date: { $lt: today }});
    if (pastBookings.length === 0) {
      return res.status(404).json({ error: 'No past bookings found' });
    }
    
    // Fetch each course name for the bookings
    const courseIds = pastBookings.map(booking => booking.courseId);
    const courses = await Course.find({ id: { $in: courseIds } });
    const courseMap = courses.reduce((map, course) => {
        map[course.id] = course.name;
        return map;
    }, {});

    const enrichedBookings = pastBookings.map(booking => ({
        ...booking.toObject(),
        courseName: courseMap[booking.courseId] || 'Course not found'
    }));

    res.json(enrichedBookings);

  }
  catch (error){
    console.error("Server error when fetching bookings:", error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

export default router;
