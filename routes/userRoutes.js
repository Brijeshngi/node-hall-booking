import express from "express";
import {
  login,
  logout,
  register,
  me,
  changePassword,
  updateProfile,
  forgetpassword,
  resetpassword,
  deleteprofile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// creating routes

router.route("/register").post(register);

router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/me")
  .get(isAuthenticated, me)
  .delete(isAuthenticated, deleteprofile);
router.route("/changepassword").put(isAuthenticated, changePassword);
router.route("/updateprofile").put(isAuthenticated, updateProfile);
router.route("/forgetpassword").post(forgetpassword);
router.route("/resetpassword/:token").put(resetpassword);

// router.route("/data").get(query);

export default router;
