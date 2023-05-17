import { User } from "../models/User.js";
import "express-async-errors";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";

export const register = async (req, res, next) => {
  const { name, email, password, contact } = req.body;

  if (!name || !email || !password || !contact)
    return next(new ErrorHandler("Please provide all fields", 400));

  const user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User already exists", 409));

  const data = await User.create({
    name,
    email,
    password,
    contact,
  });

  sendToken(res, data, "Registered Successfully", 201);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please provide all details", 400));
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return next(new ErrorHandler("please provide correct details", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("incorrect email and password", 401));

  sendToken(res, user, `Welcome, ${user.name}`, 200);
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      mesaage: "Logged out successfully",
    });
};

export const me = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    succes: true,
    user,
  });
};

export const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("provide all data", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect password", 400));

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    succes: true,
    user,
    message: "password changed",
  });
};

export const updateProfile = async (req, res, next) => {
  const { contact } = req.body;

  const user = await User.findById(req.user._id);

  user.contact = contact;

  await user.save();

  res.status(200).json({
    succes: true,
    user,
    message: "Profile updated",
  });
};

export const forgetpassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User not found", 400));

  const resetToken = await user.getResetToken();

  await user.save();

  res.status(200).json({
    success: true,
    token_url: `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`,
    message: "Reset token sent successfully",
  });
};

export const resetpassword = async (req, res, next) => {
  const { token } = req.params;

  const ResetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    ResetPasswordExpire: {
      $lt: Date.now(),
    },
    ResetPasswordToken,
  });

  if (!user) return next(new ErrorHandler("Token has been expired", 401));

  user.password = req.body.password;

  user.ResetPasswordToken = undefined;
  user.ResetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "password Changed successfully",
  });
};

export const deleteprofile = async (req, res, next) => {
  const user = await findById(req.user._id);

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "Profile deleted successfully",
  });
};
