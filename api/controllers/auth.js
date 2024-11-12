import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const slat = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, slat);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).json("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {

     console.log(req.body.username);
  //  const user = await User.findOne({ username: req.body.username });
   res.status(200).json("hello");
   
  } catch (error) {
    next(error);
  }
};
