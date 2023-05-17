import { Reviews } from "../models/Reviews";
import "express-async-errors";
import ErrorHandler from "../utils/errorHandler.js";

export const postReview = async (req, res, next) => {
  const { id } = req.params;

  const hallData = await Hall.findById(id);
  if (!hallData) return next(new ErrorHandler("No hall found", 404));

  const { ratings, comments } = req.body;

  if (!ratings || !comments)
    return next(new ErrorHandler("please provide all details", 400));

  hallData.user_name = req.user._id;
  hallData.hall_name = id;

  await hallData.save();

  const data = await Reviews.create({
    ratings,
    comments,
  });

  res.status(201).json({
    success: true,
    data,
  });
};

export const getAllReview = async (req, res, next) => {
  const data = await Reviews.find({});
  res.status(200).json({
    success: true,
    data,
  });
};
export const getReview = async (req, res, next) => {
  const { id } = req.params;

  const hallData = await Reviews.findOne(id);

  res.status(200).json({
    success: true,
    hallData,
  });
};

export const updateReview = async (req, res, next) => {
  const { id } = req.params;

  const hallData = await Reviews.findById(id);
  const { ratings, comments } = req.body;

  (hallData.ratings = ratings),
    (hallData.comments = comments),
    await hallData.save();

  res.status(200).json({
    success: true,
    hallData,
  });
};
export const deleteReview = async (req, res, next) => {
  const { id } = req.params;

  const hallData = await Reviews.findById(id);

  hallData.deleteOne();

  res.status(200).json({
    success: true,
    hallData,
  });
};
