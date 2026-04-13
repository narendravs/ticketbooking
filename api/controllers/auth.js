import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) {
      // Send a 409 Conflict error
      return next(
        createError(409, "User already exists with this email or username!"),
      );
    }

    // 2. Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // 3. Create and Save User
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    res.status(200).json("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails, isAdmin });
  } catch (error) {
    next(error);
  }
};
