import mongoose from "mongoose";

const schema = mongoose.Schema({
  hall_name: {
    type: String,
    required: true,
    minlength: [20, "20 characters required"],
  },
  hall_city: {
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
  },
  hall_owner: {
    type: String,
  },
  hall_images: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  hall_videos: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  hall_facilities: {
    type: String,
    enum: ["rooms", "catering", "ac", "non_ac", "parking", "cabs"],
  },

  hall_status: { type: String, enum: ["booked", "vacant"] },

  hall: { type: String, enum: ["active", "inactive"] },
});

export const Hall = mongoose.model("Hall", schema);
