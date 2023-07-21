const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { secretKey } = require("../../config/config")
const User = require("../models/user")

const signup = async (req, res) => {
 try {
  const { email, password } = req.body
  const existingUser = await User.findOne({ email })

  if (existingUser) {
   return res.status(409).json({ error: "email already exists." })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ email, password: hashedPassword })
  res.status(201).json({ message: "User created successfully.", user })
 } catch (error) {
  res
   .status(500)
   .json({ error: "Error while creating user.", details: error.message })
 }
}

const login = async (req, res) => {
 try {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
   return res.status(404).json({ error: "User not found." })
  }
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
   return res.status(401).json({ error: "Invalid password." })
  }
  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" })

  res.json({ user, token })
 } catch (error) {
  res
   .status(500)
   .json({ error: "Error while logging in.", details: error.message })
 }
}

const adminLogin = async (req, res) => {
 try {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
   return res.status(404).json({ error: "User not found." })
  }
  if (email !== "admin@admin.com") {
   return res.status(401).json({ error: "You have not access to this login" })
  }
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
   return res.status(401).json({ error: "Invalid password." })
  }

  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" })

  res.json({ user, token })
 } catch (error) {
  res
   .status(500)
   .json({ error: "Error while logging in.", details: error.message })
 }
}

module.exports = {
 signup,
 login,
 adminLogin
}
