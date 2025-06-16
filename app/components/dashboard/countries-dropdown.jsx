"use client"

import { GlobeIcon } from "lucide-react"
import { CustomDropdown } from "../ui/custom-dropdown"


// Sample list of countries
const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "nz", label: "New Zealand" },
  { value: "in", label: "India" },
  { value: "sg", label: "Singapore" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "br", label: "Brazil" },
  { value: "za", label: "South Africa" },
  { value: "ng", label: "Nigeria" },
  { value: "ke", label: "Kenya" },
  { value: "gh", label: "Ghana" },
  { value: "eg", label: "Egypt" },
]

export function CountriesDropdown({ value, onChange }) {
  return (
   
    <CustomDropdown
      options={countries}
      placeholder="Select Countries"
      icon={<GlobeIcon />}
      value={value}
      onChange={onChange}
      multiple={true}
      searchable={true}
    />

   
  )
}
