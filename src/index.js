// index.js
import express from "express"
import dotenv from "dotenv"
import router from "./app/routes/router.js"
import cors from "cors"
import bodyParser from "body-parser"
import connectDB from "./config/db.js"
import multer from "multer"
import path from "path"
import ejs from "ejs"
import { fileURLToPath } from "url"

dotenv.config()

const upload = multer()
const app = express()
const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicFolderPath = path.resolve(__dirname, "../public")

// Middleware
app.use(upload.array())
app.use(cors())
app.use(express.json())

// Set up bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to MongoDB
connectDB()

app.set("view engine", "ejs")
// app.set("views", "views")
app.set("views", __dirname + "/views")

app.use(express.static(publicFolderPath))
// Routes
app.use("/api", router)

// Start the server
app.listen(PORT, () => console.log(`Server starts on port ${PORT}`))
