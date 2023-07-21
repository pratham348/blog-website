const Blog = require("../models/blog")

const addBlog = async (req, res) => {
 try {
  const { title, slug, category, description, publishDate, thumbnail, image } =
   req.body
  const existingBlog = await Blog.findOne({ slug })

  if (existingBlog) {
   return res.status(409).json({ error: "slug already exists." })
  }

  const blog = await Blog.create({
   title,
   slug,
   category,
   description,
   publishDate,
   thumbnail,
   image
  })
  res.status(201).json({ message: "User created successfully.", blog })
 } catch (error) {
  res
   .status(500)
   .json({ error: "Error while creating user.", details: error.message })
 }
}

// Set up a route for file uploads
const fileUpload = (req, res) => {
 const fileField1 = req.files["image"][0]
 console.log("fileField1: ", fileField1)

 const fileField2 = req.files["thumbnail"][0]
 console.log("fileField2: ", fileField2)

 const otherData = req.body
 console.log("otherData: ", otherData)

 // Handle the uploaded file
 res.json({ message: "File uploaded successfully!" })
}
module.exports = {
 addBlog,
 fileUpload
}
