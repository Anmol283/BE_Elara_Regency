document.addEventListener("DOMContentLoaded", () => {
  // Initialize components
  initNavbar()
  initAnimations()

  // Page specific initializations
  if (document.querySelector(".home-page")) {
    initHeroSlider()
  }

  if (document.querySelector(".rooms-page")) {
    initRoomGallery()
  }

  if (document.querySelector(".locations-page")) {
    initMap()
  }

  if (document.querySelector(".auth-form")) {
    initFormValidation()
  }

  if (document.querySelector(".reservation-form")) {
    initDatepickers()
  }
})

// Navbar functionality
function initNavbar() {
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  const header = document.querySelector(".header")

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Navbar scroll effect
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }
}

// Scroll animations
function initAnimations() {
  const elements = document.querySelectorAll(".animate")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
        }
      })
    },
    { threshold: 0.1 },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Hero slider for homepage
function initHeroSlider() {
  let currentSlide = 0
  const slides = document.querySelectorAll(".hero-slide")

  if (slides.length <= 1) return

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0"
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  // Initialize first slide
  showSlide(currentSlide)

  // Auto-advance slides
  setInterval(nextSlide, 5000)
}

// Room gallery functionality
function initRoomGallery() {
  const roomCards = document.querySelectorAll(".room-card")

  roomCards.forEach((card) => {
    const galleryThumbs = card.querySelectorAll(".gallery-thumb")
    const mainImage = card.querySelector(".room-img")

    galleryThumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        // Update main image
        mainImage.src = thumb.getAttribute("data-src")

        // Update active thumbnail
        galleryThumbs.forEach((t) => t.classList.remove("active"))
        thumb.classList.add("active")
      })
    })
  })
}

// Google Maps for locations page
function initMap() {
  // This would normally use the Google Maps API
  // For this example, we'll just create a placeholder
  const mapContainer = document.querySelector(".map-container")

  if (mapContainer) {
    mapContainer.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #1e1e1e; color: #d4af37; text-align: center;">
        <div>
          <h3>Interactive Map</h3>
          <p>Google Maps would be displayed here in a real implementation</p>
        </div>
      </div>
    `
  }
}

// Form validation
function initFormValidation() {
  const forms = document.querySelectorAll(".needs-validation")

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add("was-validated")
    })
  })

  // Login form submission
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Redirect based on user role
            if (data.isAdmin) {
              window.location.href = "/admin-dashboard"
            } else {
              window.location.href = "/"
            }
          } else {
            showAlert("error", data.message)
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          showAlert("error", "An error occurred. Please try again.")
        })
    })
  }

  // Registration form submission
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.location.href = "/"
          } else {
            showAlert("error", data.message)
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          showAlert("error", "An error occurred. Please try again.")
        })
    })
  }
}

// Datepickers for reservation form
function initDatepickers() {
  // This would normally use a datepicker library
  // For this example, we'll just use HTML5 date inputs
  const dateInputs = document.querySelectorAll('input[type="date"]')

  // Set min date to today
  const today = new Date().toISOString().split("T")[0]
  dateInputs.forEach((input) => {
    input.min = today
  })

  // Reservation form submission
  const reservationForm = document.getElementById("reservationForm")
  if (reservationForm) {
    reservationForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const checkIn = document.getElementById("checkIn").value
      const checkOut = document.getElementById("checkOut").value
      const roomType = document.getElementById("roomType").value
      const guests = document.getElementById("guests").value
      const specialRequests = document.getElementById("specialRequests").value

      fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkIn,
          checkOut,
          roomType,
          guests,
          specialRequests,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showAlert("success", "Reservation submitted successfully!")
            reservationForm.reset()
          } else {
            showAlert("error", data.message)
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          showAlert("error", "An error occurred. Please try again.")
        })
    })
  }
}

// Contact form submission
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showAlert("success", "Message sent successfully!")
            contactForm.reset()
          } else {
            showAlert("error", data.message)
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          showAlert("error", "An error occurred. Please try again.")
        })
    })
  }
}

// Alert helper function
function showAlert(type, message) {
  const alertContainer = document.createElement("div")
  alertContainer.className = `alert alert-${type}`
  alertContainer.innerHTML = message

  document.body.appendChild(alertContainer)

  // Auto remove after 3 seconds
  setTimeout(() => {
    alertContainer.remove()
  }, 3000)
}
