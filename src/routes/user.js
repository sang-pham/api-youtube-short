const { Router } = require("express");
const { requireSignin } = require("../controllers/auth");
const { v4 } = require("uuid");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/users-avatars");
  },
  filename: function (req, file, cb) {
    cb(null, v4() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const { getUserAvatar, update, searchUsers } = require("../controllers/user");

const router = Router();

router.get("/", searchUsers);

router.get("/:userId/avatar", getUserAvatar);

// router.use(requireSignin);

router.put("/:userId/profile", upload.single("avatar"), update);

module.exports = router;
