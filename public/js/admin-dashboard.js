// Admin Dashboard JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize sidebar navigation
  initSidebar()

  // Initialize charts
  initCharts()

  // Initialize data tables
  initDataTables()
})

// Sidebar navigation
function initSidebar() {
  const navLinks = document.querySelectorAll(".admin-nav a")
  const sections = document.querySelectorAll(".admin-section")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetSection = this.getAttribute("data-section")

      // Update active link
      navLinks.forEach((link) => {
        link.parentElement.classList.remove("active")
      })
      this.parentElement.classList.add("active")

      // Show target section, hide others
      sections.forEach((section) => {
        section.classList.remove("active")
        if (section.id === targetSection) {
          section.classList.add("active")
        }
      })

      // Update URL hash
      window.location.hash = targetSection

      // Save the active section to localStorage
      localStorage.setItem("activeAdminSection", targetSection)
    })
  })

  // Check for hash in URL on page load
  const hash = window.location.hash ? window.location.hash.substring(1) : null
  const savedSection = localStorage.getItem("activeAdminSection")
  const sectionToActivate = hash || savedSection || "overview"

  const targetLink = document.querySelector(`.admin-nav a[data-section="${sectionToActivate}"]`)
  if (targetLink) {
    targetLink.click()
  } else {
    // Default to overview if no section is found
    const defaultLink = document.querySelector(`.admin-nav a[data-section="overview"]`)
    if (defaultLink) defaultLink.click()
  }

  // Add keyboard shortcuts for navigation
  document.addEventListener("keydown", (e) => {
    // Alt + number keys for quick navigation
    if (
      e.altKey &&
      !isNaN(Number.parseInt(e.key)) &&
      Number.parseInt(e.key) >= 1 &&
      Number.parseInt(e.key) <= navLinks.length
    ) {
      e.preventDefault()
      const index = Number.parseInt(e.key) - 1
      if (navLinks[index]) navLinks[index].click()
    }
  })
}

// Initialize charts
function initCharts() {
  // Revenue Chart
  const revenueCtx = document.getElementById("revenueChart")
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Revenue",
            data: [65000, 59000, 80000, 81000, 56000, 85000, 90000, 92000, 88000, 75000, 85000, 95000],
            borderColor: "#d4af37",
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
              callback: (value) => "$" + value.toLocaleString(),
            },
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
      },
    })
  }

  // Occupancy Chart
  const occupancyCtx = document.getElementById("occupancyChart")
  if (occupancyCtx) {
    new Chart(occupancyCtx, {
      type: "bar",
      data: {
        labels: ["Standard Room", "Deluxe Suite", "Presidential Suite"],
        datasets: [
          {
            label: "Occupancy Rate",
            data: [85, 75, 60],
            backgroundColor: ["rgba(76, 175, 80, 0.7)", "rgba(33, 150, 243, 0.7)", "rgba(156, 39, 176, 0.7)"],
            borderColor: ["rgba(76, 175, 80, 1)", "rgba(33, 150, 243, 1)", "rgba(156, 39, 176, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
              callback: (value) => value + "%",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
      },
    })
  }

  // Revenue by Location Chart
  const revenueByLocationCtx = document.getElementById("revenueByLocationChart")
  if (revenueByLocationCtx) {
    new Chart(revenueByLocationCtx, {
      type: "bar",
      data: {
        labels: ["New York", "Paris", "Dubai", "Tokyo", "Sydney", "Maldives"],
        datasets: [
          {
            label: "Revenue",
            data: [120000, 95000, 85000, 75000, 65000, 55000],
            backgroundColor: "rgba(212, 175, 55, 0.7)",
            borderColor: "rgba(212, 175, 55, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
              callback: (value) => "$" + value.toLocaleString(),
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
      },
    })
  }

  // Room Type Distribution Chart
  const roomTypeCtx = document.getElementById("roomTypeChart")
  if (roomTypeCtx) {
    new Chart(roomTypeCtx, {
      type: "doughnut",
      data: {
        labels: ["Standard Room", "Deluxe Suite", "Presidential Suite"],
        datasets: [
          {
            data: [50, 35, 15],
            backgroundColor: ["rgba(76, 175, 80, 0.7)", "rgba(33, 150, 243, 0.7)", "rgba(156, 39, 176, 0.7)"],
            borderColor: ["rgba(76, 175, 80, 1)", "rgba(33, 150, 243, 1)", "rgba(156, 39, 176, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "rgba(255, 255, 255, 0.7)",
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    })
  }

  // Booking Source Chart
  const bookingSourceCtx = document.getElementById("bookingSourceChart")
  if (bookingSourceCtx) {
    new Chart(bookingSourceCtx, {
      type: "pie",
      data: {
        labels: ["Direct Website", "OTAs", "Phone/Email", "Travel Agents"],
        datasets: [
          {
            data: [45, 30, 15, 10],
            backgroundColor: [
              "rgba(212, 175, 55, 0.7)",
              "rgba(33, 150, 243, 0.7)",
              "rgba(76, 175, 80, 0.7)",
              "rgba(156, 39, 176, 0.7)",
            ],
            borderColor: [
              "rgba(212, 175, 55, 1)",
              "rgba(33, 150, 243, 1)",
              "rgba(76, 175, 80, 1)",
              "rgba(156, 39, 176, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "rgba(255, 255, 255, 0.7)",
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    })
  }
}

// Initialize data tables
function initDataTables() {
  // Add sorting functionality to table headers
  const tableHeaders = document.querySelectorAll(".data-table th")

  tableHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const table = this.closest("table")
      const index = Array.from(this.parentNode.children).indexOf(this)
      const rows = Array.from(table.querySelectorAll("tbody tr"))
      const isAscending = this.classList.contains("asc")

      // Remove sorting classes from all headers
      tableHeaders.forEach((h) => {
        h.classList.remove("asc", "desc")
      })

      // Add sorting class to clicked header
      this.classList.add(isAscending ? "desc" : "asc")

      // Sort rows
      rows.sort((a, b) => {
        const aValue = a.children[index].textContent.trim()
        const bValue = b.children[index].textContent.trim()

        // Check if values are numbers
        const aNum = Number.parseFloat(aValue.replace(/[^0-9.-]+/g, ""))
        const bNum = Number.parseFloat(bValue.replace(/[^0-9.-]+/g, ""))

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return isAscending ? bNum - aNum : aNum - bNum
        }

        // Sort as strings
        return isAscending ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue)
      })

      // Reorder rows in the table
      const tbody = table.querySelector("tbody")
      rows.forEach((row) => tbody.appendChild(row))
    })
  })

  // Add filter functionality
  const filterInputs = document.querySelectorAll(".filter-group select, .filter-group input")

  filterInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const filterType = this.id.split("-")[0] // booking, user, room, etc.
      const filterValue = this.value
      const section = this.closest(".admin-section")
      const table = section.querySelector(".data-table")
      const rows = table.querySelectorAll("tbody tr")

      if (filterValue === "all") {
        // Show all rows if 'all' is selected
        rows.forEach((row) => (row.style.display = ""))
        return
      }

      // Filter rows based on the filter type and value
      rows.forEach((row) => {
        let showRow = true

        // Different filtering logic based on the filter type
        switch (filterType) {
          case "booking":
            if (this.id === "booking-status") {
              const statusCell = row.querySelector(".status")
              if (statusCell && !statusCell.classList.contains(filterValue)) {
                showRow = false
              }
            } else if (this.id === "booking-location") {
              const locationCell = row.cells[3].textContent.toLowerCase()
              if (locationCell !== filterValue.toLowerCase()) {
                showRow = false
              }
            }
            break
          case "user":
            if (this.id === "user-role") {
              const roleCell = row.querySelector(".role")
              if (roleCell && !roleCell.classList.contains(filterValue)) {
                showRow = false
              }
            }
            break
          case "room":
            if (this.id === "room-type") {
              const typeCell = row.cells[1].textContent.toLowerCase()
              if (!typeCell.includes(filterValue.toLowerCase()) && filterValue !== "all") {
                showRow = false
              }
            } else if (this.id === "room-location") {
              const locationCell = row.cells[2].textContent.toLowerCase()
              if (locationCell !== filterValue.toLowerCase()) {
                showRow = false
              }
            } else if (this.id === "room-status") {
              const statusCell = row.querySelector(".status")
              if (statusCell && !statusCell.classList.contains(filterValue)) {
                showRow = false
              }
            }
            break
        }

        row.style.display = showRow ? "" : "none"
      })
    })
  })

  // Add search functionality
  const searchInputs = document.querySelectorAll(".search-input input")

  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const table = this.closest(".admin-section").querySelector(".data-table")
      const rows = table.querySelectorAll("tbody tr")

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase()
        row.style.display = text.includes(searchTerm) ? "" : "none"
      })
    })
  })

  // Add action button functionality
  const actionButtons = document.querySelectorAll(".action-btn")

  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.classList.contains("view")
        ? "view"
        : this.classList.contains("edit")
          ? "edit"
          : this.classList.contains("delete")
            ? "delete"
            : this.classList.contains("maintenance")
              ? "maintenance"
              : ""

      const row = this.closest("tr")
      const id = row.cells[0].textContent

      // Handle different actions
      switch (action) {
        case "view":
          showDetailsModal(row)
          break
        case "edit":
          showEditModal(row)
          break
        case "delete":
          if (confirm("Are you sure you want to delete this item?")) {
            // Simulate deletion by removing the row
            row.remove()
          }
          break
        case "maintenance":
          // Toggle maintenance status
          const statusCell = row.querySelector(".status")
          if (statusCell) {
            if (statusCell.classList.contains("maintenance")) {
              statusCell.classList.remove("maintenance")
              statusCell.classList.add("available")
              statusCell.textContent = "Available"
            } else {
              statusCell.classList.remove("available", "occupied")
              statusCell.classList.add("maintenance")
              statusCell.textContent = "Maintenance"
            }
          }
          break
      }
    })
  })

  // Add pagination functionality
  const paginationButtons = document.querySelectorAll(".pagination-btn")

  paginationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.disabled) return

      // Get all pagination buttons in this section
      const section = this.closest(".admin-section")
      const buttons = section.querySelectorAll(".pagination-btn")

      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // In a real application, this would load the corresponding page of data
      console.log("Pagination clicked:", this.textContent.trim())
    })
  })
}

// Helper function to show details modal
function showDetailsModal(row) {
  // Create modal
  const modal = document.createElement("div")
  modal.className = "admin-modal"

  // Get data from row
  const id = row.cells[0].textContent
  const title =
    row.closest(".admin-section").id === "users"
      ? "User Details"
      : row.closest(".admin-section").id === "bookings"
        ? "Booking Details"
        : "Room Details"

  // Create modal content based on section
  let content = ""

  if (row.closest(".admin-section").id === "users") {
    const name = row.cells[1].textContent
    const email = row.cells[2].textContent
    const role = row.cells[3].textContent

    content = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-item">
            <span class="detail-label">ID:</span>
            <span class="detail-value">${id}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Name:</span>
            <span class="detail-value">${name}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${email}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Role:</span>
            <span class="detail-value">${role}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary modal-close">Close</button>
        </div>
      </div>
    `
  } else if (row.closest(".admin-section").id === "bookings") {
    const guest = row.cells[1].querySelector(".guest-name").textContent
    const room = row.cells[2].textContent
    const location = row.cells[3].textContent
    const checkIn = row.cells[4].textContent
    const checkOut = row.cells[5].textContent
    const total = row.cells[6].textContent
    const status = row.cells[7].textContent

    content = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-item">
            <span class="detail-label">Booking ID:</span>
            <span class="detail-value">${id}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Guest:</span>
            <span class="detail-value">${guest}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Room Type:</span>
            <span class="detail-value">${room}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Location:</span>
            <span class="detail-value">${location}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Check-in:</span>
            <span class="detail-value">${checkIn}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Check-out:</span>
            <span class="detail-value">${checkOut}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Total:</span>
            <span class="detail-value">${total}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Status:</span>
            <span class="detail-value">${status}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary modal-close">Close</button>
        </div>
      </div>
    `
  } else {
    const roomNumber = row.cells[0].textContent
    const type = row.cells[1].textContent
    const location = row.cells[2].textContent
    const capacity = row.cells[3].textContent
    const price = row.cells[4].textContent
    const status = row.cells[5].textContent

    content = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-item">
            <span class="detail-label">Room Number:</span>
            <span class="detail-value">${roomNumber}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Room Type:</span>
            <span class="detail-value">${type}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Location:</span>
            <span class="detail-value">${location}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Capacity:</span>
            <span class="detail-value">${capacity}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Price:</span>
            <span class="detail-value">${price}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Status:</span>
            <span class="detail-value">${status}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary modal-close">Close</button>
        </div>
      </div>
    `
  }

  modal.innerHTML = content
  document.body.appendChild(modal)

  // Add event listeners to close buttons
  const closeButtons = modal.querySelectorAll(".modal-close")
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.remove()
    })
  })

  // Close on click outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
}

// Helper function to show edit modal
function showEditModal(row) {
  // Create modal
  const modal = document.createElement("div")
  modal.className = "admin-modal"

  // Get data from row
  const id = row.cells[0].textContent
  const title =
    row.closest(".admin-section").id === "users"
      ? "Edit User"
      : row.closest(".admin-section").id === "bookings"
        ? "Edit Booking"
        : "Edit Room"

  // Create modal content based on section
  let content = ""

  if (row.closest(".admin-section").id === "users") {
    const name = row.cells[1].textContent
    const email = row.cells[2].textContent
    const role = row.cells[3].textContent

    content = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form id="edit-user-form">
            <div class="form-group">
              <label for="edit-name">Name</label>
              <input type="text" id="edit-name" class="form-control" value="${name}">
            </div>
            <div class="form-group">
              <label for="edit-email">Email</label>
              <input type="email" id="edit-email" class="form-control" value="${email}">
            </div>
            <div class="form-group">
              <label for="edit-role">Role</label>
              <select id="edit-role" class="form-control">
                <option value="user" ${role === "User" ? "selected" : ""}>User</option>
                <option value="admin" ${role === "Admin" ? "selected" : ""}>Admin</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary save-changes">Save Changes</button>
          <button class="btn btn-outline modal-close">Cancel</button>
        </div>
      </div>
    `
  } else if (row.closest(".admin-section").id === "bookings") {
    const guest = row.cells[1].querySelector(".guest-name").textContent
    const room = row.cells[2].textContent
    const location = row.cells[3].textContent
    const checkIn = row.cells[4].textContent
    const checkOut = row.cells[5].textContent
    const status = row.cells[7].querySelector(".status").textContent

    content = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form id="edit-booking-form">
            <div class="form-group">
              <label for="edit-guest">Guest Name</label>
              <input type="text" id="edit-guest" class="form-control" value="${guest}">
            </div>
            <div class="form-group">
              <label for="edit-room">Room Type</label>
              <select id="edit-room" class="form-control">
                <option value="Standard Room" ${room === "Standard Room" ? "selected" : ""}>Standard Room</option>
                <option value="Deluxe Suite" ${room === "Deluxe Suite" ? "selected" : ""}>Deluxe Suite</option>
                <option value="Presidential Suite" ${room === "Presidential Suite" ? "selected" : ""}>Presidential Suite</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-location">Location</label>
              <select id="edit-location" class="form-control">
                <option value="New York" ${location === "New York" ? "selected" : ""}>New York</option>
                <option value="Paris" ${location === "Paris" ? "selected" : ""}>Paris</option>
                <option value="Dubai" ${location === "Dubai" ? "selected" : ""}>Dubai</option>
                <option value="Tokyo" ${location === "Tokyo" ? "selected" : ""}>Tokyo</option>
                <option value="Sydney" ${location === "Sydney" ? "selected" : ""}>Sydney</option>
                <option value="Maldives" ${location === "Maldives" ? "selected" : ""}>Maldives</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-check-in">Check-in Date</label>
              <input type="date" id="edit-check-in" class="form-control" value="${formatDateForInput(checkIn)}">
            </div>
            <div class="form-group">
              <label for="edit-check-out">Check-out Date</label>
              <input type="date" id="edit-check-out" class="form-control" value="${formatDateForInput(checkOut)}">
            </div>
            <div class="form-group">
              <label for="edit-status">Status</label>
              <select id="edit-status" class="form-control">
                <option value="confirmed" ${status === "Confirmed" ? "selected" : ""}>Confirmed</option>
                <option value="pending" ${status === "Pending" ? "selected" : ""}>Pending</option>
                <option value="cancelled" ${status === "Cancelled" ? "selected" : ""}>Cancelled</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary save-changes">Save Changes</button>
          <button class="btn btn-outline modal-close">Cancel</button>
        </div>
      </div>
    `
  } else {
    const roomNumber = row.cells[0].textContent
    const type = row.cells[1].textContent
    const location = row.cells[2].textContent
    const capacity = row.cells[3].textContent
    const price = row.cells[4].textContent
    const status = row.cells[5].querySelector(".status").textContent

    content = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form id="edit-room-form">
            <div class="form-group">
              <label for="edit-room-number">Room Number</label>
              <input type="text" id="edit-room-number" class="form-control" value="${roomNumber}">
            </div>
            <div class="form-group">
              <label for="edit-room-type">Room Type</label>
              <select id="edit-room-type" class="form-control">
                <option value="Standard Room" ${type === "Standard Room" ? "selected" : ""}>Standard Room</option>
                <option value="Deluxe Suite" ${type === "Deluxe Suite" ? "selected" : ""}>Deluxe Suite</option>
                <option value="Presidential Suite" ${type === "Presidential Suite" ? "selected" : ""}>Presidential Suite</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-room-location">Location</label>
              <select id="edit-room-location" class="form-control">
                <option value="New York" ${location === "New York" ? "selected" : ""}>New York</option>
                <option value="Paris" ${location === "Paris" ? "selected" : ""}>Paris</option>
                <option value="Dubai" ${location === "Dubai" ? "selected" : ""}>Dubai</option>
                <option value="Tokyo" ${location === "Tokyo" ? "selected" : ""}>Tokyo</option>
                <option value="Sydney" ${location === "Sydney" ? "selected" : ""}>Sydney</option>
                <option value="Maldives" ${location === "Maldives" ? "selected" : ""}>Maldives</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-room-capacity">Capacity</label>
              <input type="text" id="edit-room-capacity" class="form-control" value="${capacity}">
            </div>
            <div class="form-group">
              <label for="edit-room-price">Price</label>
              <input type="text" id="edit-room-price" class="form-control" value="${price}">
            </div>
            <div class="form-group">
              <label for="edit-room-status">Status</label>
              <select id="edit-room-status" class="form-control">
                <option value="available" ${status === "Available" ? "selected" : ""}>Available</option>
                <option value="occupied" ${status === "Occupied" ? "selected" : ""}>Occupied</option>
                <option value="maintenance" ${status === "Maintenance" ? "selected" : ""}>Maintenance</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary save-changes">Save Changes</button>
          <button class="btn btn-outline modal-close">Cancel</button>
        </div>
      </div>
    `
  }

  modal.innerHTML = content
  document.body.appendChild(modal)

  // Add event listeners to close buttons
  const closeButtons = modal.querySelectorAll(".modal-close")
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.remove()
    })
  })

  // Add event listener to save button
  const saveButton = modal.querySelector(".save-changes")
  saveButton.addEventListener("click", () => {
    // In a real application, this would save the changes to the server
    // For this demo, we'll just update the row in the table

    if (row.closest(".admin-section").id === "users") {
      const name = document.getElementById("edit-name").value
      const email = document.getElementById("edit-email").value
      const role = document.getElementById("edit-role").value

      row.cells[1].textContent = name
      row.cells[2].textContent = email
      row.cells[3].innerHTML = `<span class="role ${role}">${role === "admin" ? "Admin" : "User"}</span>`
    } else if (row.closest(".admin-section").id === "bookings") {
      const guest = document.getElementById("edit-guest").value
      const room = document.getElementById("edit-room").value
      const location = document.getElementById("edit-location").value
      const checkIn = document.getElementById("edit-check-in").value
      const checkOut = document.getElementById("edit-check-out").value
      const status = document.getElementById("edit-status").value

      row.cells[1].querySelector(".guest-name").textContent = guest
      row.cells[2].textContent = room
      row.cells[3].textContent = location
      row.cells[4].textContent = formatDate(checkIn)
      row.cells[5].textContent = formatDate(checkOut)
      row.cells[7].innerHTML = `<span class="status ${status}">${capitalizeFirstLetter(status)}</span>`
    } else {
      const roomNumber = document.getElementById("edit-room-number").value
      const type = document.getElementById("edit-room-type").value
      const location = document.getElementById("edit-room-location").value
      const capacity = document.getElementById("edit-room-capacity").value
      const price = document.getElementById("edit-room-price").value
      const status = document.getElementById("edit-room-status").value

      row.cells[0].textContent = roomNumber
      row.cells[1].textContent = type
      row.cells[2].textContent = location
      row.cells[3].textContent = capacity
      row.cells[4].textContent = price
      row.cells[5].innerHTML = `<span class="status ${status}">${capitalizeFirstLetter(status)}</span>`
    }

    modal.remove()
  })

  // Close on click outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
}

// Helper function to format date for input fields
function formatDateForInput(dateString) {
  try {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  } catch (e) {
    return ""
  }
}

// Helper function to format date for display
function formatDate(dateString) {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  } catch (e) {
    return dateString
  }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Add CSS for modals
const modalStyle = document.createElement("style")
modalStyle.textContent = `
  .admin-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: var(--dark-secondary);
    border-radius: 5px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .modal-header h3 {
    margin: 0;
    color: var(--gold);
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--cream);
    cursor: pointer;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .detail-item {
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
  }
  
  .detail-label {
    font-weight: 600;
    width: 150px;
    color: var(--gold);
  }
  
  .detail-value {
    flex: 1;
    color: var(--cream);
  }
`

document.head.appendChild(modalStyle)
