import mongoose from "mongoose";

const schema = new mongoose.Schema({
  hall_name: {
    type: String,
    required: true,
    maxlength: [20, "20 characters required"],
  },
  hall_city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  hall_owner: {
    type: String,
    required: true,
  },
  hall_images: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  hall_videos: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  hall_facilities: {
    type: String,
    enum: ["rooms", "catering", "ac", "non_ac", "parking", "cabs"],
    default: "rooms",
  },

  hall_status: {
    type: String,
    enum: ["booked", "vacant"],
    default: "vacant",
  },
  booking: [mongoose.Schema.Types.ObjectId],

  hall: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  hall_rate: {
    type: String,
  },
});

export const Hall = mongoose.model("Hall", schema);
