import mongoose from "mongoose";

const schema = new mongoose.Schema({
  city_name: {
    type: String,
    maxlength: [25, "Please don't exceed 25 characters"],
    required: [true, "Please, Enter the city name"],
  },
  // hall_city_image: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
  createdAt: {
    type: Date,
    Date: Date.now(),
  },
});

export const City = mongoose.model("City", schema);
