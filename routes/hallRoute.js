import express from "express";
import {
  createHall,
  getAllHall,
  hallOwner,
  deleteHall,
  updateHall,
  hallById,
} from "../controllers/hallController.js";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.route("/owner").get(isAdmin, hallOwner);
router.route("/hall").post(isAdmin, createHall).get(getAllHall);
router.route("/deletehall/:id").delete(isAdmin, deleteHall);
router.route("/hall/:id").put(isAdmin, updateHall);
router.route("/hall/:id").put(hallById);

export default router;
