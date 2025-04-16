const express = require("express")
const path = require("path")
const fs = require("fs")
const cookieParser = require("cookie-parser")
const apiRoutes = require("./api/apiRoutes")

// Import all middleware from index file
const {
  helmetConfig,
  corsConfig,
  morganLogger,
  requestLogger,
  compressionConfig,
  isAuthenticated,
  isAdmin,
  redirectAdminToDashboard,
} = require("./middlewares")

const app = express()
const PORT = process.env.PORT || 3000

// Set EJS as the view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Apply middleware
app.use(corsConfig)
app.use(helmetConfig)
app.use(morganLogger)
app.use(requestLogger)
app.use(compressionConfig)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

// API Routes
app.use("/api", apiRoutes)

// Admin routes
app.get("/admin-dashboard", isAdmin, (req, res) => {
  // Read users data
  const usersData = JSON.parse(fs.readFileSync("./models/users.json", "utf8"))

  res.render("admin-dashboard", {
    title: "Admin Dashboard - Elara Regency",
    users: usersData.users,
    isLoggedIn: true,
    isAdmin: true,
  })
})

// Page Routes for admin users
app.get("/", redirectAdminToDashboard, (req, res) => {
  res.render("home", {
    title: "Elara Regency - Luxury Hotel",
    isLoggedIn: !!req.cookies.token,
  })
})

app.get("/register", (req, res) => {
  if (req.cookies.token) {
    const isAdminUser = req.cookies.isAdmin === "true"
    if (isAdminUser) {
      return res.redirect("/admin-dashboard")
    }
    return res.redirect("/")
  }
  res.render("register", {
    title: "Register - Elara Regency",
    isLoggedIn: false,
  })
})

app.get("/login", (req, res) => {
  if (req.cookies.token) {
    const isAdminUser = req.cookies.isAdmin === "true"
    if (isAdminUser) {
      return res.redirect("/admin-dashboard")
    }
    return res.redirect("/")
  }
  res.render("login", {
    title: "Login - Elara Regency",
    isLoggedIn: false,
  })
})

// Apply admin redirection middleware to all regular pages
const regularPages = ["/rooms", "/locations", "/contact", "/about", "/blog"]
regularPages.forEach((page) => {
  app.get(page, redirectAdminToDashboard, (req, res) => {
    res.render(page.substring(1), {
      title: `${page.substring(1).charAt(0).toUpperCase() + page.substring(2)} - Elara Regency`,
      isLoggedIn: !!req.cookies.token,
    })
  })
})

app.get("/reservation", isAuthenticated, redirectAdminToDashboard, (req, res) => {
  res.render("reservation", {
    title: "Make a Reservation - Elara Regency",
    isLoggedIn: true,
  })
})

app.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.clearCookie("isAdmin")
  res.redirect("/")
})

// Location detail pages
app.get("/locations/:location", redirectAdminToDashboard, (req, res) => {
  const location = req.params.location
  res.render("location-detail", {
    title: `${location.charAt(0).toUpperCase() + location.slice(1)} - Elara Regency`,
    location: location,
    isLoggedIn: !!req.cookies.token,
  })
})

// Initialize users.json if it doesn't exist
const initializeUsersJson = () => {
  const usersFilePath = "./models/users.json"
  if (!fs.existsSync("./models")) {
    fs.mkdirSync("./models")
  }

  if (!fs.existsSync(usersFilePath)) {
    const initialData = {
      users: [
        {
          id: 1,
          name: "Admin User",
          email: "admin@elararegency.com",
          password: "admin123", // In a real app, this would be hashed
          isAdmin: true,
        },
      ],
    }
    fs.writeFileSync(usersFilePath, JSON.stringify(initialData, null, 2))
    console.log("Created initial users.json file")
  }
}

// Start the server
app.listen(PORT, () => {
  initializeUsersJson()
  console.log(`Server is running on http://localhost:${PORT}`)
})
