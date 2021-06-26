const express = require("express");
const multer = require("multer");
const CSVToJSON = require("csvtojson");
const Financials = require("../models/financials");
const auth = require('../middleware/authentication')
const router = new express.Router();

var files = [];

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

router.post(
  "/upload",
  upload.array("csvupload", 2),auth,
  async (req, res) => {
    try {
      for await (const file of files) {
        console.log(file);
        await CSVToJSON()
          .fromFile(`/home/harshul/Dev/nodejs/csv-upload/CSVs/${file}`)
          .then(async (results) => {
            for await (const company of results) {
              const companyFinancials = new Financials({
                Name: company.Name,
                Revenue_million_USD: company["Revenue million USD"],
              });
              await companyFinancials.save();
            }
          })
          .catch((err) => {
            res.status(500).send();
          });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
    res.send({ "Upload status": "Done" });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
