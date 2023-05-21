import multer from "multer";

const storage = multer.memoryStorage();

const Upload = multer({ storage }).single("avatar");
// const Upload = multer({ storage }).array("photos", 12);
// const Upload = multer({ storage }).fields([
//   { name: "images", maxCount: 12 },
//   { name: "gallery", maxCount: 8 },
// ]);

export default Upload;
