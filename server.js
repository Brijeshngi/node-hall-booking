import app from "./app.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import { connectMongoDBAtlas } from "./config/database.js";
connectMongoDBAtlas();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API_KEY,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server Working on ${process.env.PORT}`);
});
