import multer from "multer";

// const storage = multer.memoryStorage();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // accept image
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};
 const upload = multer({ storage, fileFilter });

 export default upload