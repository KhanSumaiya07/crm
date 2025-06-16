"use client"

import { CalendarIcon } from "lucide-react"
import { CustomDropdown } from "../ui/custom-dropdown"

const months = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
]

export function IntakeDropdown({ value, onChange }) {
  return (
    <CustomDropdown
      options={months}
      placeholder="Select Intake"
      icon={<CalendarIcon />}
      value={value}
      onChange={onChange}
      multiple={true}
    />
  )
}
