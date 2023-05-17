import express from "express";
import {
  createCity,
  getAllCity,
  updateCity,
  deleteCity,
} from "../controllers/cityController.js";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/city")
  .post(isAdmin, createCity)
  .get(getAllCity)
  .delete(isAdmin, deleteCity);

router.route("/city/:id").put(isAdmin, updateCity);

export default router;
