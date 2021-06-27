/*===================================
Middleware to upload CSV to filesystem
=====================================*/

const multer = require("multer");
var files = [];

/*---------------------------------Configurations to save the file---------------------------------*/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "CSVs");
  },
  filename: function (req, file, cb) {
    files.push(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".csv")) {
      return cb(new Error("Please upload a CSV file"));
    }

    cb(undefined, true);
  },
});

module.exports = {
  files,
  upload,
};
