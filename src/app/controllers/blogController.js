import Blog from "../models/blog.js"
import { cloudinaryUpload } from "../middleware/cloudinary.js"

export const addBlog = async (req, res) => {
 try {
  let uploadedImage
  let uploadedThumbnail
  const image = req.files["image"][0]
  const thumbnail = req.files["thumbnail"][0]
  const { title, slug, category, description, publishDate } = req.body

  const existingBlog = await Blog.findOne({ slug })

  if (existingBlog) {
   return res.status(409).json({ error: "slug already exists." })
  }
  if (image) {
   uploadedImage = await cloudinaryUpload({
    filePath: image.path,
    destinationDir: "blog-images"
   })
  }
  if (thumbnail) {
   uploadedThumbnail = await cloudinaryUpload({
    filePath: thumbnail.path,
    destinationDir: "blog-thumbnails"
   })
  }

  const blog = await Blog.create({
   title,
   slug,
   category,
   description,
   publishDate,
   thumbnail: uploadedThumbnail,
   image: uploadedImage
  })
  res.status(201).json({ message: "Blog created successfully.", blog })
 } catch (error) {
  res
   .status(500)
   .json({ error: "Error while creating blog.", details: error.message })
 }
}
// Update Blog
export const updateBlog = async (req, res) => {
 try {
  let uploadedImage
  let uploadedThumbnail
  const image = req.files["image"][0]
  const thumbnail = req.files["thumbnail"][0]
  const { id, title, slug, category, description, publishDate } = req.body

  const existingBlog = await Blog.findById(id)

  if (!existingBlog) {
   return res.status(404).json({ error: "Blog not found." })
  }
  if (image) {
   uploadedImage = await cloudinaryUpload({
    filePath: image.path,
    destinationDir: "blog-images"
   })
   existingBlog.image = uploadedImage
  }
  if (thumbnail) {
   uploadedThumbnail = await cloudinaryUpload({
    filePath: thumbnail.path,
    destinationDir: "blog-thumbnails"
   })
   existingBlog.thumbnail = uploadedThumbnail
  }

  // You can add additional checks here if you want to prevent updating certain fields.

  // Update the blog data
  existingBlog.title = title
  existingBlog.slug = slug
  existingBlog.category = category
  existingBlog.description = description
  existingBlog.publishDate = publishDate

  // Save the updated blog to the database
  await existingBlog.save()

  res
   .status(200)
   .json({ message: "Blog updated successfully.", blog: existingBlog })
 } catch (error) {
  res
   .status(500)
   .json({ error: "Error while updating blog.", details: error.message })
 }
}

export const deleteBlog = async (req, res) => {
 try {
  const { id } = req.params // Get the blog ID from the URL parameter

  const existingBlog = await Blog.findById(id)

  if (!existingBlog) {
   return res.status(404).json({ error: "Blog not found." })
  }

  // Delete the blog from the database
  await Blog.deleteOne({ _id: id })

  res.status(200).json({ message: "Blog deleted successfully." })
 } catch (error) {
  res
   .status(500)
   .json({ error: "Error while deleting blog.", details: error.message })
 }
}
export const getBlogs = async (req, res) => {
 const page = parseInt(req.query.page) || 1 // Default page is 1
 const pageSize = parseInt(req.query.pageSize) || 5 // Default page size is 5

 try {
  // Get the total count of Blog in the collection
  const total = await Blog.countDocuments()

  // Calculate the number of skip Blog based on the pagination parameters
  const skip = (page - 1) * pageSize

  // Query the database to get the paginated data
  const blogs = await Blog.find().skip(skip).limit(pageSize)

  res.status(200).json({ blogs, total })
 } catch (error) {
  res
   .status(500)
   .json({ error: "Error while fetching blogs.", details: error.message })
 }
}
