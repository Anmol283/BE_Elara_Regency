const express = require("express")
const fs = require("fs")
const path = require("path")
const router = express.Router()

// Middleware to read users.json
const getUsersData = () => {
  const usersFilePath = path.join(__dirname, "../models/users.json")
  const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"))
  return usersData
}

// Middleware to write to users.json
const saveUsersData = (data) => {
  const usersFilePath = path.join(__dirname, "../models/users.json")
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2))
}

// Register a new user
router.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const usersData = getUsersData()
    const userExists = usersData.users.some((user) => user.email === email)

    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" })
    }

    const newUser = {
      id: usersData.users.length + 1,
      name,
      email,
      password, // In real apps, hash the password!
      isAdmin: false,
    }

    usersData.users.push(newUser)
    saveUsersData(usersData)

    res.cookie("token", "user-token-" + newUser.id, { httpOnly: true })
    res.cookie("isAdmin", "false", { httpOnly: true })

    return res.status(201).json({ success: true, message: "User registered successfully" })
  } catch (error) {
    console.error("Registration error:", error)
    return res.status(500).json({ success: false, message: "Server error" })
  }
})

// Login user
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" })
    }

    const usersData = getUsersData()
    const user = usersData.users.find((user) => user.email === email && user.password === password)

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    res.cookie("token", "user-token-" + user.id, { httpOnly: true })
    res.cookie("isAdmin", user.isAdmin.toString(), { httpOnly: true })

    return res.status(200).json({
      success: true,
      message: "Login successful",
      isAdmin: user.isAdmin,
      redirectUrl: user.isAdmin ? "/admin-dashboard" : "/",
    })
  } catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({ success: false, message: "Server error" })
  }
})

// Get all users (admin only)
router.get("/users", (req, res) => {
  try {
    const isAdmin = req.cookies.isAdmin === "true"

    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized" })
    }

    const usersData = getUsersData()
    const safeUsers = usersData.users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }))

    return res.status(200).json({ success: true, users: safeUsers })
  } catch (error) {
    console.error("Get users error:", error)
    return res.status(500).json({ success: false, message: "Server error" })
  }
})

// Submit reservation
router.post("/reservation", (req, res) => {
  try {
    const { checkIn, checkOut, roomType, guests, specialRequests } = req.body

    if (!checkIn || !checkOut || !roomType || !guests) {
      return res.status(400).json({ success: false, message: "Required fields missing" })
    }

    return res.status(200).json({
      success: true,
      message: "Reservation submitted successfully",
      reservation: {
        checkIn,
        checkOut,
        roomType,
        guests,
        specialRequests: specialRequests || "None",
      },
    })
  } catch (error) {
    console.error("Reservation error:", error)
    return res.status(500).json({ success: false, message: "Server error" })
  }
})

// Submit contact form
router.post("/contact", (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return res.status(500).json({ success: false, message: "Server error" })
  }
})

// 404 handler (must be the last route)
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

module.exports = router
