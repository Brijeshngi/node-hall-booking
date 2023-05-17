import jwt from "jsonwebtoken";
import "express-async-errors";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please log-in again", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
};

export const isAdmin = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please log-in again", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resourse`,
        403
      )
    );

  next();
};

export const isHallOwner = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please log-in again", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  if (req.user.role !== "hall-owner")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resourse`,
        403
      )
    );

  next();
};
