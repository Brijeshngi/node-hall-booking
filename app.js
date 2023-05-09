import express from "express";
import { config } from "dotenv";

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

// importing routes and using
import city from "./routes/cityRoutes.js";
import hall from "./routes/hallRoutes.js";
import payment from "./routes/paymentRoutes.js";
import review from "./routes/reviewRoutes.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", city);
app.use("/api/v1", hall);
app.use("/api/v1", payment);
app.use("/api/v1", review);
app.use("/api/v1", user);

export default app;
