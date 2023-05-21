import { User } from "../models/User.js";
import "express-async-errors";
import ErrorHandler from "../utils/errorHandler.js";
import { Hall } from "../models/Hall.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

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
  const { hall_owner, hall_facilities, hall_status, hall, hall_rate } =
    req.body;
  data.hall_owner = hall_owner;
  data.hall_facilities = hall_facilities;
  data.hall_status = hall_status;
  data.hall = hall;
  data.hall_rate = hall_rate;

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

export const hallByCity = async (req, res, next) => {
  const { id } = req.params;

  const hallData = await Hall.find({ hall_city: id });

  if (!hallData)
    return next(new ErrorHandler("no hall found in this city", 404));

  res.status(200).json({
    success: true,
    hallData,
  });
};

export const hallByStatus = async (req, res, next) => {
  const hallData = await Hall.find({
    $and: [{ hall_status: { $eq: "booked" } }, { hall: { $eq: "active" } }],
  });

  if (!hallData) return next(new ErrorHandler("no data found", 404));

  res.status(200).json({
    success: true,
    hallData,
  });
};

export const updateHallStatus = async (req, res, next) => {
  const { id } = req.params;

  const hallData = await Hall.findById(id);

  if (!hallData) return next(new ErrorHandler("no data found", 404));

  if (hallData.hall_status === "vacant") hallData.hall_status = "booked";
  else hallData.hall_status = "vacant";

  await hallData.save();

  res.status(200).json({
    success: true,
    hallData,
  });
};

export const uploadFile = async (req, res, next) => {
  // hall_images
  // hall_videos
  const { id } = req.params;

  const data = await Hall.findById(id);

  if (!data) return next(new ErrorHandler("no data found", 404));

  let avatar = req.file;

  console.log(avatar);

  const fileUriImages = getDataUri(avatar);

  const mycloudOne = await cloudinary.v2.uploader.upload(fileUriImages.content);

  console.log(mycloudOne);

  // hall_images: {
  //   public_id: {
  //     type: String,
  //   },
  //   url: {
  //     type: String,
  //   },
  // },
  res.status(200).json({
    success: true,
    message: `added`,
  });
};

// export const uploadFile = async (req, res, next) => {
//   // hall_images
//   // hall_videos
//   const { id } = req.params;

//   const data = await Hall.findById(id);

//   if (!data) return next(new ErrorHandler("no data found", 404));

//   let photos = req.files;

//   console.log(photos);

//   const fileUriImages = getDataUri(photos);

//   const mycloudOne = await cloudinary.v2.uploader.upload(fileUriImages.content);

//   console.log(mycloudOne);

//   // hall_images: {
//   //   public_id: {
//   //     type: String,
//   //   },
//   //   url: {
//   //     type: String,
//   //   },
//   // },
//   res.status(200).json({
//     success: true,
//     message: `added`,
//   });
// };

// export const uploadFile = async (req, res, next) => {
//   // hall_images
//   // hall_videos
//   const { id } = req.params;

//   const data = await Hall.findById(id);

//   if (!data) return next(new ErrorHandler("no data found", 404));

//   let images = req.files;
//   let gallery = req.files;

//   console.log(images);
//   console.log(gallery);

//   const fileUriImages = getDataUri(images);
//   const fileUriGallery = getDataUri(gallery);

//   const mycloudOne = await cloudinary.v2.uploader.upload(fileUriImages.content);
//   const mycloudTwo = await cloudinary.v2.uploader.upload(
//     fileUriGallery.content
//   );

//   console.log(mycloudOne);
//   console.log(mycloudTwo);

//   // hall_images: {
//   //   public_id: {
//   //     type: String,
//   //   },
//   //   url: {
//   //     type: String,
//   //   },
//   // },
//   res.status(200).json({
//     success: true,
//     message: `added`,
//   });
// };

// hall and hall-owner relations api
// hall-owner dashboard
