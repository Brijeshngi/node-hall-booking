import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
    select: false,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    maxlength: [50, "Don't Exceed 50 characters"],
  },
  booking: [
    {
      booking_id: mongoose.Schema.Types.ObjectId,
      booking_status: String,
      billing_id: mongoose.Schema.Types.ObjectId,
      billing_status: String,
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin", "hall-owner"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["A", "D"],
    default: "A",
  },
  createdAt: {
    type: Date,
    Date: Date.now(),
  },
  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// for testing on console that generates resetToken

// console.log("password", crypto.randomBytes(20).toString("hex"));

schema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.ResetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.ResetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", schema);
