import ErrorHandler from "../utils/errorHandler.js";
import "express-async-errors";
import { City } from "../models/City.js";

export const createCity = async (req, res, next) => {
  const { city_name } = req.body;

  console.log(city_name);

  if (!city_name) return next(new ErrorHandler("Please enter all field", 400));

  let data = await City.findOne({ city_name });

  if (data) return next(new ErrorHandler("city name Already Exist", 409));

  await City.create({
    city_name,
  });

  res.status(201).json({
    success: true,
    message: "city created",
  });
};

export const getAllCity = async (req, res, next) => {
  const data = await City.find({});

  res.status(201).json({
    success: true,
    data,
  });
};

export const updateCity = async (req, res, next) => {
  const { id } = req.params;

  const data = await City.findById(id);

  const { city_name } = req.body;

  data.city_name = city_name;

  await data.save();

  res.status(201).json({
    success: true,
    data,
    message: "updated",
  });
};

export const deleteCity = async (req, res, next) => {
  const { id } = req.body;

  const data = await City.findByIdAndDelete(id);

  await data.deleteOne();

  res.status(201).json({
    success: true,
    message: "deleted",
  });
};
