import multer from "multer"
import path from "path"

// Set up storage for uploaded files
// Multer configuration for file uploads
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, "uploads/")
 },
 filename: function (req, file, cb) {
  cb(null, Date.now() + path.extname(file.originalname))
 }
})

// Create the multer instance
const upload = multer({ storage: storage })

export default upload
