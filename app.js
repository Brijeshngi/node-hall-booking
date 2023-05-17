import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middleware/Error.js";
import cookieParser from "cookie-parser";

const app = express();
config({
  path: "./config/config.env",
});

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

export default app;

app.use(ErrorMiddleware);
