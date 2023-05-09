import express from "express";
import { getuser } from "../controllers/userController.js";

const router = express.Router();

router.route("/hello").get(getuser);

export default router;
