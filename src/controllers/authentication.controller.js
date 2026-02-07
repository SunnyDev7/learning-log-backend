import { User } from "../models/user.models.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    //check existing user with email
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `User already exists with this email ${email}`,
      });
    }

    //Hash Password

    //create user
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
