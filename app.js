import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
config({
  path: "./config/config.env",
});

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
// importing routes and using
import city from "./routes/cityRoute.js";
import hall from "./routes/hallRoute.js";
import payment from "./routes/paymentRoutes.js";
import review from "./routes/reviewRoute.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", city);
app.use("/api/v1", hall);
app.use("/api/v1", payment);
app.use("/api/v1", review);
app.use("/api/v1", user);
// app.get("/api/v1"getkey", (req, res) =>
//   res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
// );

export default app;

app.use(ErrorMiddleware);
