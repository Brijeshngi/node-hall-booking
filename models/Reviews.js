import mongoose from "mongoose";

const schema = mongoose.Schema({
  user_name: {
    type: String,
  },
  hall_name: {
    hallId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hall",
    },
  },
  ratings: {
    type: String,
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
