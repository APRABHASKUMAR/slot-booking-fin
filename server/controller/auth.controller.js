import User from '../models/user.models.js';
import jwt from "jsonwebtoken";

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    console.log(req.body);  
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const username = name.toLowerCase().split(" ").join("") + Math.random().toString(36).slice(-4);

      const newUser = new User({
        username,
        email,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error); 
  }
};
