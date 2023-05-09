import mongoose from "mongoose";
import validator from "validator";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validator: validator.isEmail,
  },
  password: {
    type: String,
    minlength: [8, "Please provide 8  characters"],
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    maxlength: [50, "Don't Exceed 50 characters"],
    required: true,
  },
  booking: {
    id: String,
    status: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "hall-owner"],
    required: true,
  },
  createdAt: {
    type: Date,
    Date: Date.now(),
  },
  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});

export const User = mongoose.model("User", schema);
