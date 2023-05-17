import { User } from "../models/User.js";
import "express-async-errors";
import ErrorHandler from "../utils/errorHandler.js";
import { Hall } from "../models/Hall.js";

export const hallOwner = async (req, res, next) => {
  const owner = await User.find({ role: "hall-owner" });

  const listof = owner.map(getFullName);

  function getFullName(item) {
    return [item.name].join(" ");
  }

  res.status(200).json({
    success: true,
    listof,
  });
};

export const createHall = async (req, res, next) => {
  const { hall_name, hall_city, hall_owner } = req.body;

  if (!hall_name || !hall_city || !hall_owner)
    return next(new ErrorHandler("Please enter all details", 400));

  let data = await Hall.findOne({ hall_name });

  if (data) return next(new ErrorHandler("hall name already exists", 400));

  data = await Hall.create({
    hall_name,
    hall_city,
    hall_owner,
  });

  res.status(201).json({
    success: true,
    data,
  });
};

export const getAllHall = async (req, res, next) => {
  const { id } = req.params;
  const data = await Hall.findById(id);
  res.status(200).json({
    success: true,
    data,
  });
};

export const deleteHall = async (req, res, next) => {
  const { id } = req.params;
  const data = await Hall.findByIdAndDelete(id);
  await data.deleteOne();
  res.status(200).json({
    success: true,
    data,
  });
};

export const updateHall = async (req, res, next) => {
  const { id } = req.params;
  const data = await Hall.findById(id);
  const { hall_owner, hall_facilities, hall_status, hall } = req.body;
  data.hall_owner = hall_owner;
  data.hall_facilities = hall_facilities;
  data.hall_status = hall_status;
  data.hall = hall;

  await data.save();

  res.status(200).json({
    success: true,
    data,
  });
};

export const hallById = async (req, res, next) => {
  const { id } = req.params;
  const data = await Hall.findById(id);

  res.status(200).json({
    success: true,
    data,
  });
};

// hall and hall-owner relations api
