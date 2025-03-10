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
res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
   console.log(req.body.username);
    //const user = await User.findOne({ username: req.body.username });
     const user = await User({ username:"test", password:"test", email:"test@gmail.com",country:"",phone:""})
    if (!user) return next(createError(404, "User not found"));
    const isPasswordCorrect = bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
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
