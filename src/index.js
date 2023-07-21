// index.js
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Connect to MongoDB
connectDB()

// Set up bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use("/api", require("./app/routes/router"))

// Start the server
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`)
})
