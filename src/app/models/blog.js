// app/models/user.js
const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
 title: {
  type: String,
  required: true,
  unique: true
 },
 slug: {
  type: String,
  required: true,
  unique: true
 },
 category: {
  type: String,
  required: true,
  unique: true
 },
 description: {
  type: String,
  required: true
 },
 publishDate: {
  type: String,
  required: true,
  unique: true
 },
 thumbnail: {
  type: String,
  required: true
 },
 image: {
  type: String,
  required: true
 }
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog
