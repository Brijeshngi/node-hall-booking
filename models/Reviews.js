import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  hall_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
  },
  ratings: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
    default: 0,
  },
  comments: {
    type: String,
  },
  date: {
    type: Date,
    Date: Date.now(),
  },
});

export const Reviews = mongoose.model("Reviews", schema);
