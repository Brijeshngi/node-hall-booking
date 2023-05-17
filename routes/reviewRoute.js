import express from "express";
import {
  postReview,
  getAllReview,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.route("/review").post(postReview).get(getAllReview);
router.route("/review/:id").get(getReview);
router.route("/review/:id").put(updateReview);
router.route("/review/:id").delete(deleteReview);

export default router;
