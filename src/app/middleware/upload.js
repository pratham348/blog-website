const multer = require("multer")
const path = require("path")

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

module.exports = upload
