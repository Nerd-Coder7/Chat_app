const express = require("express");
const multer = require("multer")
const path = require("path")
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");
const uploadFilePath = path.resolve(__dirname, '../..', 'public/uploads');
const storage = multer.diskStorage({
  destination: uploadFilePath,
  filename: (req, file, cb) => {
      return cb(null, file.originalname,file.filetypes = /jpeg|jpg|png|gif|pdf/ )
  }
})
const upload = multer({
  storage: storage,
  limits: {
      fileSize: 10240000 * 10240000 * 5
    },
})
// console.log(upload,storage)
const router = express.Router();

router.get("/:id",allMessages)

router.route("/").post(upload.array("attachment",50),protect, sendMessage);

module.exports = router;