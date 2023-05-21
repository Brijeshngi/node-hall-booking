import express from "express";
import {
  createHall,
  getAllHall,
  hallOwner,
  deleteHall,
  updateHall,
  hallById,
  hallByCity,
  hallByStatus,
  updateHallStatus,
  uploadFile,
} from "../controllers/hallController.js";
import { isAdmin } from "../middleware/auth.js";
import Upload from "../middleware/multer.js";

const router = express.Router();

router.route("/owner").get(isAdmin, hallOwner);
router.route("/hall").post(isAdmin, createHall).get(getAllHall);
router.route("/deletehall/:id").delete(isAdmin, deleteHall);
router.route("/hall/:id").put(isAdmin, updateHall);
router.route("/hall/:id").get(hallById);
router.route("/hall/city/:id").get(hallByCity);
router.route("/halls").get(hallByStatus);
router.route("/halls/:id").put(updateHallStatus);
router.route("/halls/images/:id").put(Upload, uploadFile);

export default router;
