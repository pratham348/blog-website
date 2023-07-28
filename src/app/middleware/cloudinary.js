import cloudinary from "cloudinary"

export const cloudinaryUpload = async (inputs) => {
 // Configuration
 cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
 })

 try {
  const response = await cloudinary.v2.uploader.upload(inputs.filePath, {
   folder: inputs.destinationDir,
   use_filename: true
  })
  return response.url
 } catch (err) {
  return err
 }
}
