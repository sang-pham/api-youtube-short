const { Router } = require('express')
const { mediaUpload } = require('../controllers')
const { v4 } = require("uuid");
const multer = require("multer");

const router = Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/public/upload-media");
    },
    filename: function (req, file, cb) {
      cb(null, v4() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

router.post("/upload-media", upload.single("media"), mediaUpload);
 
module.exports = router