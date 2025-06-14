"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDownIcon, CheckIcon } from "lucide-react"
import "./custom-dropdown.css"

export function CustomDropdown({
  options,
  placeholder,
  icon,
  value = [],
  onChange,
  multiple = false,
  searchable = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
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

  // Filter options based on search term
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

  // Handle option selection
  const handleOptionClick = (optionValue) => {
    if (multiple) {
      const newValue = value ? [...value] : []
      if (newValue.includes(optionValue)) {
        onChange(newValue.filter((v) => v !== optionValue))
      } else {
        onChange([...newValue, optionValue])
      }
    } else {
      onChange([optionValue])
      setIsOpen(false)
    }
  }

  // Get display text for the dropdown button
  const getDisplayText = () => {
    if (!value || value.length === 0) return placeholder

    if (multiple) {
      if (value.length === 1) {
        return options.find((option) => option.value === value[0])?.label || placeholder
      }
      return `${value.length} selected`
    }

    return options.find((option) => option.value === value[0])?.label || placeholder
  }

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button type="button" className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown-icon">{icon}</span>
        <span className="dropdown-text">{getDisplayText()}</span>
        <ChevronDownIcon className="dropdown-icon" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          {searchable && (
            <div className="dropdown-search">
              <input
                type="text"
                className="dropdown-search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="dropdown-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div key={option.value} className="dropdown-option" onClick={() => handleOptionClick(option.value)}>
                  {multiple && (
                    <div className={`dropdown-checkbox ${value?.includes(option.value) ? "checked" : ""}`}>
                      {value?.includes(option.value) && <CheckIcon className="dropdown-checkbox-icon" />}
                    </div>
                  )}
                  <span className="dropdown-option-label">{option.label}</span>
                </div>
              ))
            ) : (
              <div className="dropdown-empty">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
