"use client"
import { ChevronDown } from "lucide-react"
import styles from "./search-filter.module.css"

export default function SearchFilter({ type = "text", placeholder, value, onChange, options }) {
  if (type === "select") {
    return (
      <div className={styles.selectContainer}>
        <select value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.selectIcon} />
      </div>
    )
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.input}
    />
  )
}
