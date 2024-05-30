const express = require('express');
const usercontroller = require('../controlerr/user.controlerr');
const multer = require("multer");
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

const app = express();
const controllerInstance = new usercontroller();

const jwt = require("jsonwebtoken"); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avatars");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname+".png");
  },
});

const upload = multer({ storage: storage });
const router = express.Router();
router.post("/addimage", upload.single("profile"), controllerInstance.AddImage);

// UPDATE IMAGE 
router.post("/updateImage", upload.single("profile"), controllerInstance.updatedImage);

module.exports = router;
