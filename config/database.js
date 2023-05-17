import mongoose from "mongoose";

export const connectMongoDBAtlas = async () => {
  const { connection } = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MongoDB Atlas`);
  // console.log(connection);
};
