"use client"

import { useState, useEffect, useRef } from "react"
import { Mail, Phone, Eye, Edit, Search, Download, Upload, X } from "lucide-react"
import DashboardHeader from "../../../components/ui/dashboardHeader"
import SearchFilter from "../../../components/dashboard/search-filter"
import styles from "./style.module.css"

export default function ViewLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    interestedCountry: "",
    counsellor: "",
    leadType: "",
    sourceOfLeads: "",
    applicationGenerated: "",
    studentName: "",
  })
  const [activeFilters, setActiveFilters] = useState([])
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/leads/list")
      const data = await response.json()
      setLeads(data)
    } catch (error) {
      console.error("Error fetching leads:", error)
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB")
  }

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return styles.statusNew
      case "in process":
        return styles.statusProgress
      case "completed":
        return styles.statusCompleted
      case "future lead":
        return styles.statusReview
      case "not responding":
        return styles.statusFollowup
      case "failed":
        return styles.statusDefault
      default:
        return styles.statusDefault
    }
  }

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  const handleSearch = () => {
    const newActiveFilters = []
    Object.entries(filters).forEach(([key, value]) => {
      if (value?.trim()) {
        newActiveFilters.push({
          key,
          value,
          label: getFilterLabel(key, value),
        })
      }
    })
    setActiveFilters(newActiveFilters)
  }

  const getFilterLabel = (key, value) => {
    const labels = {
      interestedCountry: "Country",
      counsellor: "Counsellor",
      leadType: "Lead Type",
      sourceOfLeads: "Source",
      applicationGenerated: "App Generated",
      studentName: "Student",
    }
    return `${labels[key]}: ${value}`
  }

  const removeFilter = (filterKey) => {
    setFilters((prev) => ({ ...prev, [filterKey]: "" }))
    setActiveFilters(activeFilters.filter((filter) => filter.key !== filterKey))
  }

  const clearAllFilters = () => {
    setFilters({
      interestedCountry: "",
      counsellor: "",
      leadType: "",
      sourceOfLeads: "",
      applicationGenerated: "",
      studentName: "",
    })
    setActiveFilters([])
  }

  const filteredLeads = leads.filter((lead) => {
    if (activeFilters.length === 0) return true
    const leadType = lead.followUps?.[0]?.leadType || ""
    const interestedCountry = lead.preferredCountry || lead.countryofresidence || ""
    const sourceOfLeads = lead.sourceOfLeads || ""
    const activeMap = Object.fromEntries(activeFilters.map((f) => [f.key, f.value.toLowerCase()]))

    return (
      (!activeMap.interestedCountry || interestedCountry.toLowerCase().includes(activeMap.interestedCountry)) &&
      (!activeMap.leadType || leadType.toLowerCase().includes(activeMap.leadType)) &&
      (!activeMap.sourceOfLeads || sourceOfLeads.toLowerCase().includes(activeMap.sourceOfLeads)) &&
      (!activeMap.studentName || lead.fullname?.toLowerCase().includes(activeMap.studentName))
    )
  })

  const downloadCSV = () => {
    const headers = [
      "Student Name",
      "Mobile",
      "Email",
      "Interested Country",
      "Status",
      "Application Generated",
      "Lead Date",
      "Assign Date",
    ]

    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) => {
        const followUp = lead.followUps?.[0] || {}
        return [
          `"${lead.fullname || ""}"`,
          `"${lead.phone || ""}"`,
          `"${lead.email || ""}"`,
          `"${lead.preferredCountry || lead.countryofresidence || ""}"`,
          `"${followUp.status || ""}"`,
          `"${lead.applicationGenerated ? "Generated" : "Not Generated"}"`,
          `"${formatDate(lead.leaddate)}"`,
          `"${formatDate(lead.assignDate)}"`,
        ].join(",")
      }),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.setAttribute("href", URL.createObjectURL(blob))
    link.setAttribute("download", `leads_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // ✅ Upload Logic
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await fetch("/api/leads/uploadleads", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Upload failed")
      alert("Upload successful!")
      fetchLeads()
    } catch (err) {
      console.error("Upload error:", err)
      alert("Upload failed.")
    }
  }

  const handleViewLead = (leadId) => {
    console.log("View", leadId)
  }

  const handleEditLead = (leadId) => {
    console.log("Edit", leadId)
  }

  if (loading) {
    return <div className={styles.loading}>Loading leads...</div>
  }

  return (
    <div className={styles.container}>
      <DashboardHeader title="View Leads" subtitle="Manage and track all student leads" />

      {/* Filters UI */}
      <div className={styles.searchContainer}>
        <div className={styles.filtersRow}>
          <SearchFilter
            type="select"
            placeholder="Interested Country"
            value={filters.interestedCountry}
            onChange={(value) => handleFilterChange("interestedCountry", value)}
            options={[
              { value: "Canada", label: "Canada" },
              { value: "Australia", label: "Australia" },
              { value: "UK", label: "UK" },
              { value: "USA", label: "USA" },
              { value: "Germany", label: "Germany" },
              { value: "New Zealand", label: "New Zealand" },
              { value: "India", label: "India" },
            ]}
          />
          <SearchFilter
            type="select"
            placeholder="Lead Type"
            value={filters.leadType}
            onChange={(value) => handleFilterChange("leadType", value)}
            options={[
              { value: "Cold", label: "Cold" },
              { value: "Completed", label: "Completed" },
              { value: "Failed", label: "Failed" },
              { value: "Future Lead", label: "Future Lead" },
              { value: "Hot", label: "Hot" },
              { value: "Medium", label: "Medium" },
              { value: "Not Responding", label: "Not Responding" },
            ]}
          />
          <SearchFilter
            type="select"
            placeholder="Source of Leads"
            value={filters.sourceOfLeads}
            onChange={(value) => handleFilterChange("sourceOfLeads", value)}
            options={[
              { value: "App Lead", label: "App Lead" },
              { value: "Associate", label: "Associate" },
              { value: "Calling", label: "Calling" },
              { value: "FB Ads", label: "FB Ads" },
              { value: "Message", label: "Message" },
              { value: "Others", label: "Others" },
              { value: "Reference", label: "Reference" },
              { value: "Seminar", label: "Seminar" },
              { value: "Walk In", label: "Walk In" },
            ]}
          />
        </div>

        <div className={styles.searchRow}>
          <SearchFilter
            type="text"
            placeholder="Student Name"
            value={filters.studentName}
            onChange={(value) => handleFilterChange("studentName", value)}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            <Search className={styles.searchIcon} />
            Search
          </button>
        </div>

        {activeFilters.length > 0 && (
          <div className={styles.activeFilters}>
            {activeFilters.map((filter) => (
              <div key={filter.key} className={styles.filterTag}>
                <span>{filter.label}</span>
                <button onClick={() => removeFilter(filter.key)} className={styles.removeFilter}>
                  <X />
                </button>
              </div>
            ))}
            <button onClick={clearAllFilters} className={styles.clearAll}>Clear All</button>
          </div>
        )}
      </div>

      {/* ✅ Actions */}
      <div className={styles.actions}>
        <button onClick={downloadCSV} className={styles.downloadButton}>
          <Download className={styles.downloadIcon} /> Download Leads CSV
        </button>
        <button onClick={handleUploadClick} className={`${styles.downloadButton} ${styles.uploadButton}`}>
          <Upload className={styles.downloadIcon} /> Upload Leads CSV
        </button>
        <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
      </div>

      {/* ✅ Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Country</th>
              <th>Status</th>
              <th>App Gen</th>
              <th>Lead Date</th>
              <th>Assign Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => {
              const followUp = lead.followUps?.[0] || {}
              return (
                <tr key={lead._id}>
                  <td>{lead.fullname || "N/A"}</td>
                  <td>{lead.phone || "N/A"}</td>
                  <td>{lead.email || "N/A"}</td>
                  <td>{lead.preferredCountry || lead.countryofresidence || "N/A"}</td>
                  <td><span className={`${styles.statusBadge} ${getStatusClass(followUp.status)}`}>{followUp.status || "N/A"}</span></td>
                  <td>{lead.applicationGenerated ? "Generated" : "Not Generated"}</td>
                  <td>{formatDate(lead.leaddate)}</td>
                  <td>{formatDate(lead.assignDate)}</td>
                  <td>
                    <button onClick={() => handleViewLead(lead._id)}><Eye /></button>
                    <button onClick={() => handleEditLead(lead._id)}><Edit /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className={styles.tableFooter}>
        <div>Showing {filteredLeads.length} of {leads.length} leads</div>
        <div className={styles.pagination}>
          <button>Previous</button>
          <span>Page 1 of 1</span>
          <button>Next</button>
        </div>
      </div>
    </div>
  )
}
