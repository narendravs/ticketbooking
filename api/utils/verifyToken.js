import jwt from "jsonwebtoken";
import createError from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("....token.....");
  console.log(token);
  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    if (!user) return next(createError(404, "User not found"));
    req.user = user;
    console.log("....user.....");
    console.log(req.user);
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (user.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not authorized"));
    }
  });
};
