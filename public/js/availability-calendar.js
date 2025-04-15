// Room Availability Calendar

class AvailabilityCalendar {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId)
      if (!this.container) {
        console.error(`Container with ID ${containerId} not found`)
        return
      }
  
      this.options = {
        roomTypes: options.roomTypes || ["Standard Room", "Deluxe Suite", "Presidential Suite"],
        months: options.months || 2,
        startDate: options.startDate || new Date(),
        onDateSelect: options.onDateSelect || (() => {}),
        ...options,
      }
  
      this.selectedDates = {
        start: null,
        end: null,
      }
  
      this.availabilityData = this.generateDummyAvailability()
      this.init()
    }
  
    generateDummyAvailability() {
      // In a real application, this would come from an API
      const data = {}
      const startDate = new Date(this.options.startDate)
  
      // Generate 3 months of dummy data
      for (let m = 0; m < 3; m++) {
        const currentMonth = new Date(startDate)
        currentMonth.setMonth(currentMonth.getMonth() + m)
  
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
  
        for (let d = 1; d <= daysInMonth; d++) {
          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
  
          data[dateKey] = {}
  
          this.options.roomTypes.forEach((roomType) => {
            // Random availability between 0 and 5 rooms
            const availability = Math.floor(Math.random() * 6)
            // Random price between $200 and $1000 depending on room type
            let basePrice
            if (roomType === "Standard Room") basePrice = 200
            else if (roomType === "Deluxe Suite") basePrice = 500
            else basePrice = 900
  
            const price = basePrice + Math.floor(Math.random() * 200)
  
            data[dateKey][roomType] = {
              available: availability,
              price: price,
            }
          })
        }
      }
  
      return data
    }
  
    init() {
      this.render()
      this.attachEventListeners()
    }
  
    render() {
      this.container.innerHTML = ""
      this.container.classList.add("availability-calendar")
  
      // Create room type filter
      const filterContainer = document.createElement("div")
      filterContainer.className = "room-type-filter"
  
      const filterLabel = document.createElement("label")
      filterLabel.textContent = "Room Type:"
      filterContainer.appendChild(filterLabel)
  
      const filterSelect = document.createElement("select")
      filterSelect.id = "room-type-select"
  
      this.options.roomTypes.forEach((roomType) => {
        const option = document.createElement("option")
        option.value = roomType
        option.textContent = roomType
        filterSelect.appendChild(option)
      })
  
      filterContainer.appendChild(filterSelect)
      this.container.appendChild(filterContainer)
  
      // Create calendar container
      const calendarContainer = document.createElement("div")
      calendarContainer.className = "calendar-container"
  
      // Render months
      const startDate = new Date(this.options.startDate)
  
      for (let i = 0; i < this.options.months; i++) {
        const currentMonth = new Date(startDate)
        currentMonth.setMonth(startDate.getMonth() + i)
  
        const monthElement = this.renderMonth(currentMonth)
        calendarContainer.appendChild(monthElement)
      }
  
      this.container.appendChild(calendarContainer)
  
      // Create legend
      const legend = document.createElement("div")
      legend.className = "calendar-legend"
  
      const availableLegend = document.createElement("div")
      availableLegend.className = "legend-item"
      availableLegend.innerHTML = '<span class="legend-color available"></span> Available'
  
      const limitedLegend = document.createElement("div")
      limitedLegend.className = "legend-item"
      limitedLegend.innerHTML = '<span class="legend-color limited"></span> Limited Availability'
  
      const unavailableLegend = document.createElement("div")
      unavailableLegend.className = "legend-item"
      unavailableLegend.innerHTML = '<span class="legend-color unavailable"></span> Unavailable'
  
      const selectedLegend = document.createElement("div")
      selectedLegend.className = "legend-item"
      selectedLegend.innerHTML = '<span class="legend-color selected"></span> Selected Dates'
  
      legend.appendChild(availableLegend)
      legend.appendChild(limitedLegend)
      legend.appendChild(unavailableLegend)
      legend.appendChild(selectedLegend)
  
      this.container.appendChild(legend)
  
      // Create selected dates display
      const selectedDatesContainer = document.createElement("div")
      selectedDatesContainer.className = "selected-dates"
      selectedDatesContainer.innerHTML = `
        <div class="date-range">
          <div class="date-input">
            <label>Check-in:</label>
            <span id="check-in-display">Select a date</span>
          </div>
          <div class="date-input">
            <label>Check-out:</label>
            <span id="check-out-display">Select a date</span>
          </div>
        </div>
        <button id="reset-dates" class="btn btn-outline">Reset Dates</button>
      `
  
      this.container.appendChild(selectedDatesContainer)
    }
  
    renderMonth(date) {
      const year = date.getFullYear()
      const month = date.getMonth()
  
      const monthContainer = document.createElement("div")
      monthContainer.className = "month"
  
      // Month header
      const monthHeader = document.createElement("div")
      monthHeader.className = "month-header"
      monthHeader.textContent = date.toLocaleString("default", { month: "long", year: "numeric" })
      monthContainer.appendChild(monthHeader)
  
      // Days of week header
      const weekdaysContainer = document.createElement("div")
      weekdaysContainer.className = "weekdays"
  
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      weekdays.forEach((day) => {
        const dayElement = document.createElement("div")
        dayElement.className = "weekday"
        dayElement.textContent = day
        weekdaysContainer.appendChild(dayElement)
      })
  
      monthContainer.appendChild(weekdaysContainer)
  
      // Calendar days
      const daysContainer = document.createElement("div")
      daysContainer.className = "days"
  
      // Get first day of month and number of days
      const firstDay = new Date(year, month, 1).getDay()
      const daysInMonth = new Date(year, month + 1, 0).getDate()
  
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div")
        emptyDay.className = "day empty"
        daysContainer.appendChild(emptyDay)
      }
  
      // Add days of the month
      const selectedRoomType = document.getElementById("room-type-select")?.value || this.options.roomTypes[0]
  
      for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div")
        dayElement.className = "day"
  
        const dateObj = new Date(year, month, day)
        const dateKey = this.formatDate(dateObj)
  
        // Set data attributes
        dayElement.dataset.date = dateKey
  
        // Check availability
        let availabilityClass = "unavailable"
        let priceDisplay = ""
  
        if (this.availabilityData[dateKey] && this.availabilityData[dateKey][selectedRoomType]) {
          const availability = this.availabilityData[dateKey][selectedRoomType].available
          const price = this.availabilityData[dateKey][selectedRoomType].price
  
          if (availability > 3) {
            availabilityClass = "available"
          } else if (availability > 0) {
            availabilityClass = "limited"
          }
  
          priceDisplay = `$${price}`
        }
  
        // Check if date is selected
        if (this.isDateSelected(dateObj)) {
          availabilityClass += " selected"
        }
  
        dayElement.classList.add(availabilityClass)
  
        // Day content
        const dayNumber = document.createElement("div")
        dayNumber.className = "day-number"
        dayNumber.textContent = day
  
        const dayPrice = document.createElement("div")
        dayPrice.className = "day-price"
        dayPrice.textContent = priceDisplay
  
        dayElement.appendChild(dayNumber)
        dayElement.appendChild(dayPrice)
        daysContainer.appendChild(dayElement)
      }
  
      monthContainer.appendChild(daysContainer)
      return monthContainer
    }
  
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`
    }
  
    parseDate(dateString) {
      const [year, month, day] = dateString.split("-").map(Number)
      return new Date(year, month - 1, day)
    }
  
    isDateSelected(date) {
      if (!this.selectedDates.start || !this.selectedDates.end) return false
  
      const dateTime = date.getTime()
      const startTime = this.selectedDates.start.getTime()
      const endTime = this.selectedDates.end.getTime()
  
      return dateTime >= startTime && dateTime <= endTime
    }
  
    attachEventListeners() {
      // Room type filter change
      const roomTypeSelect = document.getElementById("room-type-select")
      if (roomTypeSelect) {
        roomTypeSelect.addEventListener("change", () => {
          this.render()
        })
      }
  
      // Day click events
      this.container.addEventListener("click", (e) => {
        const dayElement = e.target.closest(".day:not(.empty)")
        if (!dayElement) return
  
        const dateString = dayElement.dataset.date
        if (!dateString) return
  
        const date = this.parseDate(dateString)
  
        // Check if the date is available
        const roomType = document.getElementById("room-type-select")?.value || this.options.roomTypes[0]
        const dateKey = this.formatDate(date)
  
        if (
          !this.availabilityData[dateKey] ||
          !this.availabilityData[dateKey][roomType] ||
          this.availabilityData[dateKey][roomType].available === 0
        ) {
          return // Date is unavailable
        }
  
        this.handleDateSelection(date)
      })
  
      // Reset dates button
      const resetButton = document.getElementById("reset-dates")
      if (resetButton) {
        resetButton.addEventListener("click", () => {
          this.selectedDates.start = null
          this.selectedDates.end = null
          this.updateSelectedDatesDisplay()
          this.render()
        })
      }
    }
  
    handleDateSelection(date) {
      if (!this.selectedDates.start || (this.selectedDates.start && this.selectedDates.end)) {
        // Start a new selection
        this.selectedDates.start = date
        this.selectedDates.end = null
      } else {
        // Complete the selection
        if (date < this.selectedDates.start) {
          this.selectedDates.end = this.selectedDates.start
          this.selectedDates.start = date
        } else {
          this.selectedDates.end = date
        }
  
        // Call the onDateSelect callback
        if (typeof this.options.onDateSelect === "function") {
          this.options.onDateSelect(this.selectedDates)
        }
      }
  
      this.updateSelectedDatesDisplay()
      this.render()
    }
  
    updateSelectedDatesDisplay() {
      const checkInDisplay = document.getElementById("check-in-display")
      const checkOutDisplay = document.getElementById("check-out-display")
  
      if (checkInDisplay) {
        checkInDisplay.textContent = this.selectedDates.start
          ? this.selectedDates.start.toLocaleDateString()
          : "Select a date"
      }
  
      if (checkOutDisplay) {
        checkOutDisplay.textContent = this.selectedDates.end
          ? this.selectedDates.end.toLocaleDateString()
          : "Select a date"
      }
    }
  }
  
  // Initialize calendar when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    const calendarContainer = document.getElementById("availability-calendar")
    if (calendarContainer) {
      const calendar = new AvailabilityCalendar("availability-calendar", {
        onDateSelect: (dates) => {
          console.log("Selected dates:", dates)
  
          // Update reservation form if it exists
          const checkInInput = document.getElementById("checkIn")
          const checkOutInput = document.getElementById("checkOut")
  
          if (checkInInput && dates.start) {
            const formattedDate = dates.start.toISOString().split("T")[0]
            checkInInput.value = formattedDate
          }
  
          if (checkOutInput && dates.end) {
            const formattedDate = dates.end.toISOString().split("T")[0]
            checkOutInput.value = formattedDate
          }
        },
      })
    }
  })
  