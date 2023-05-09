import mongoose from "mongoose";

const schema = mongoose.Schema({
  city_name: {
    type: String,
  },
  hall_city_image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const City = mongoose.model("City", schema);
