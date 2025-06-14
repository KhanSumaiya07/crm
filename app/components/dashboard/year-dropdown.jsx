"use client"

import { CalendarIcon } from "lucide-react"
import { CustomDropdown } from "../ui/custom-dropdown"

// Generate years from current year to 10 years ahead
const generateYears = () => {
  const currentYear = new Date().getFullYear()
  const years = []

  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push({ value: i.toString(), label: i.toString() })
  }

  return years
}

export function YearDropdown({ value, onChange }) {
  return (
    <CustomDropdown
      options={generateYears()}
      placeholder="Select Year"
      icon={<CalendarIcon />}
      value={value}
      onChange={onChange}
      multiple={false}
    />
  )
}
