import User from '../models/user.models.js';
import jwt from "jsonwebtoken";

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    console.log(req.body);
    console.log(req.body.name);

    // Find user by email
    const user = await User.findOne({ email });

    if (user) {
      // User exists, generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;

      // Send response with user details and token
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({
          ...rest,
          name: req.body.name, // Sending req.body.name instead of user.username
          token,
        });
    } else {
      // Create a new username
      const username = name.toLowerCase().split(" ").join("") + Math.random().toString(36).slice(-4);

      // Create and save new user
      const newUser = new User({
        username,
        email,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      // Generate JWT token for new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;

      // Send response with new user details and token
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({
          ...rest,
          name: req.body.name, // Sending req.body.name
          token,
        });
    }
  } catch (error) {
    next(error); 
  }
};
