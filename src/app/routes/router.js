import express from "express"
import { signup, login, adminLogin } from "../controllers/authController.js"
import {
 addBlog,
 getBlogs,
 updateBlog,
 deleteBlog
} from "../controllers/blogController.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/admin/login", adminLogin)

router.post(
 "/blog/add",
 upload.fields([
  { name: "image", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 }
 ]),
 addBlog
)

router.get("/blogs", getBlogs)
router.post(
 "/blog/update",
 upload.fields([
  { name: "image", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 }
 ]),
 updateBlog
)
router.delete("/blog/:id", deleteBlog)

//View routes
router.get("/", (req, res) => {
 console.log("called")
 res.render("pages/dashboard")
})

export default router
