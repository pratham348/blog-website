const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const blogController = require("../controllers/blogController")
const upload = require("../middleware/upload")

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/admin/login", authController.adminLogin)

router.post("/blog/add", blogController.addBlog)
router.post(
 "/blog/image",
 upload.fields([
  { name: "image", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 }
 ]),
 blogController.fileUpload
)

module.exports = router
