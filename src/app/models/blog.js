// app/models/user.js
import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
 title: {
  type: String,
  required: true
 },
 slug: {
  type: String,
  required: true,
  unique: true
 },
 category: {
  type: String,
  required: true
 },
 description: {
  type: String,
  required: true
 },
 publishDate: {
  type: String,
  required: true
 },
 thumbnail: {
  type: String
 },
 image: {
  type: String
 }
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog
