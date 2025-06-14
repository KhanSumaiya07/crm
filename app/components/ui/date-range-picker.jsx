"use client"

import { useState, useRef, useEffect } from "react"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react"
import { Button } from "./button"
import "./date-range-picker.css"

export function DateRangePicker({ value, onChange, icon = <CalendarIcon className="date-picker-icon" /> }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Parse initial value
  useEffect(() => {
    if (value) {
      const dates = value.split(" - ")
      if (dates.length === 2) {
        const start = parseDate(dates[0])
        const end = parseDate(dates[1])
        if (start && end) {
          setStartDate(start)
          setEndDate(end)
          setCurrentDate(new Date(start.getFullYear(), start.getMonth(), 1))
        }
      }
    }
  }, [])

  // Helper to parse date from DD/MM/YYYY format
  const parseDate = (dateStr) => {
    const parts = dateStr.split("/")
    if (parts.length === 3) {
      return new Date(Number.parseInt(parts[2]), Number.parseInt(parts[1]) - 1, Number.parseInt(parts[0]))
    }
    return null
  }

  // Helper to format date to DD/MM/YYYY
  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`
  }

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" })
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Handle date click
  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date)
      setEndDate(null)
    } else {
      // Complete selection
      if (date < startDate) {
        setEndDate(startDate)
        setStartDate(date)
      } else {
        setEndDate(date)
      }
    }
  }

  // Handle date hover
  const handleDateHover = (date) => {
    if (startDate && !endDate) {
      setHoverDate(date)
    }
  }

  // Check if date is in range
  const isInRange = (date) => {
    if (startDate && endDate) {
      return date >= startDate && date <= endDate
    }
    if (startDate && hoverDate) {
      return (date >= startDate && date <= hoverDate) || (date >= hoverDate && date <= startDate)
    }
    return false
  }

  // Check if date is start or end
  const isStartOrEnd = (date) => {
    if (!startDate) return false
    if (!endDate) return date.getTime() === startDate.getTime()
    return date.getTime() === startDate.getTime() || date.getTime() === endDate.getTime()
  }

  // Apply selection
  const applySelection = () => {
    if (startDate && endDate) {
      onChange(`${formatDate(startDate)} - ${formatDate(endDate)}`)
      setIsOpen(false)
    }
  }

  // Clear selection
  const clearSelection = () => {
    setStartDate(null)
    setEndDate(null)
    setHoverDate(null)
  }

  // Render calendar for a specific month
  const renderCalendar = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    // Get days from previous month to fill first week
    const prevMonthDays = []
    const prevMonth = month === 0 ? 11 : month - 1
    const prevMonthYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)

    for (let i = firstDay - 1; i >= 0; i--) {
      prevMonthDays.push(new Date(prevMonthYear, prevMonth, daysInPrevMonth - i))
    }

    // Current month days
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push(new Date(year, month, i))
    }

    // Next month days to fill last week
    const nextMonthDays = []
    const nextMonth = month === 11 ? 0 : month + 1
    const nextMonthYear = month === 11 ? year + 1 : year
    const daysNeeded = 42 - (prevMonthDays.length + currentMonthDays.length)

    for (let i = 1; i <= daysNeeded; i++) {
      nextMonthDays.push(new Date(nextMonthYear, nextMonth, i))
    }

    // All days to display
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

    return (
      <div className="date-picker-month">
        <div className="date-picker-month-title">
          {getMonthName(date)} {year}
        </div>
        <div className="date-picker-weekdays">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>
        <div className="date-picker-days">
          {allDays.map((day, index) => {
            const isCurrentMonth = day.getMonth() === month
            const isToday = day.toDateString() === new Date().toDateString()
            const isSelected = isStartOrEnd(day)
            const inRange = isInRange(day)

            let dayClasses = "date-picker-day"
            if (!isCurrentMonth) dayClasses += " other-month"
            if (isCurrentMonth) dayClasses += " current-month"
            if (isToday) dayClasses += " today"
            if (isSelected) dayClasses += " selected"
            if (inRange && !isSelected) dayClasses += " in-range"

            return (
              <button
                key={index}
                type="button"
                className={dayClasses}
                onClick={() => isCurrentMonth && handleDateClick(day)}
                onMouseEnter={() => isCurrentMonth && handleDateHover(day)}
              >
                {day.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Get display text for selected range
  const getDisplayText = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`
    }
    return value || "Select Date Range"
  }

  // Get next month for side-by-side display
  const getNextMonthDate = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  }

  // Get range text for footer
  const getRangeText = () => {
    if (startDate && endDate) {
      const startDay = startDate.getDate()
      const endDay = endDate.getDate()
      const startMonth = getMonthName(startDate).substring(0, 3)
      const endMonth = getMonthName(endDate).substring(0, 3)

      if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
        return `${startDay} ${startMonth} - ${endDay} ${startMonth}`
      }

      return `${startDay} ${startMonth} - ${endDay} ${endMonth}`
    }

    return ""
  }

  return (
    <div className="date-picker-container" ref={dropdownRef}>
      {/* Date Range Button */}
      <button type="button" className="date-picker-button" onClick={() => setIsOpen(!isOpen)}>
        {icon}
        <span className="date-picker-text">{getDisplayText()}</span>
        <ChevronDownIcon className="date-picker-icon" />
      </button>

      {/* Date Range Picker Dropdown */}
      {isOpen && (
        <div className="date-picker-dropdown">
          <div className="date-picker-header">
            <button type="button" className="date-picker-nav-button" onClick={prevMonth}>
              <ChevronLeftIcon />
            </button>
            <div className="flex-1" />
            <button type="button" className="date-picker-nav-button" onClick={nextMonth}>
              <ChevronRightIcon />
            </button>
          </div>

          <div className="date-picker-calendars">
            {renderCalendar(currentDate)}
            {renderCalendar(getNextMonthDate())}
          </div>

          <div className="date-picker-footer">
            <div className="date-picker-range-text">{getRangeText()}</div>
            <div className="date-picker-actions">
              <Button variant="outline" size="sm" onClick={clearSelection}>
                Clear
              </Button>
              <Button size="sm" onClick={applySelection} disabled={!startDate || !endDate}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
