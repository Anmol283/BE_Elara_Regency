/**
 * Authentication and authorization middleware for Elara Regency
 */

// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
      return res.redirect("/login")
    }
    try {
      // In a real app, you would verify the token
      // For this example, we'll just check if it exists
      next()
    } catch (error) {
      res.clearCookie("token")
      return res.redirect("/login")
    }
  }
  
  // Check if user is admin
  const isAdmin = (req, res, next) => {
    const token = req.cookies.token
    const isAdminUser = req.cookies.isAdmin === "true"
  
    if (!token || !isAdminUser) {
      return res.redirect("/login")
    }
    next()
  }
  
  // Redirect admin users to dashboard
  const redirectAdminToDashboard = (req, res, next) => {
    const isAdminUser = req.cookies.isAdmin === "true"
    if (isAdminUser && req.path !== "/admin-dashboard") {
      return res.redirect("/admin-dashboard")
    }
    next()
  }
  
  module.exports = {
    isAuthenticated,
    isAdmin,
    redirectAdminToDashboard,
  }
  