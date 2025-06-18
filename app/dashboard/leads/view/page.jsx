"use client"

import { useState, useEffect, useRef } from "react"
import { Mail, Phone, Eye, Edit, Search, Download, X ,ArrowUpFromLine} from "lucide-react"
import DashboardHeader from "../../../components/ui/dashboardHeader"
import SearchFilter from "../../../components/dashboard/search-filter"
import styles from "./style.module.css"
import Papa from 'papaparse'
import { GoUpload } from "react-icons/go";


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

  // Fetch leads from backend
  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/leads/list") // Adjust API endpoint as needed
      const data = await response.json()
      setLeads(data)
    } catch (error) {
      console.error("Error fetching leads:", error)
      // Fallback to sample data for demo
      setLeads(sampleLeads)
    } finally {
      setLoading(false)
    }
  }

 
  const formatDate = (dateString) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB") // DD/MM/YYYY format
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
      if (value && value.trim() !== "") {
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
    setFilters((prev) => ({
      ...prev,
      [filterKey]: "",
    }))

    // Remove from active filters and immediately apply
    const newActiveFilters = activeFilters.filter((filter) => filter.key !== filterKey)
    setActiveFilters(newActiveFilters)
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

    // Clear active filters immediately
    setActiveFilters([])
  }

  const filteredLeads = leads.filter((lead) => {
    // If no active filters, show all leads
    if (activeFilters.length === 0) {
      return true
    }

    const leadType = lead.followUps?.[0]?.leadType || ""
    const interestedCountry = lead.preferredCountry || lead.countryofresidence || ""
    const sourceOfLeads = lead.sourceOfLeads || ""

    // Create a map of active filters for easier checking
    const activeFilterMap = {}
    activeFilters.forEach((filter) => {
      activeFilterMap[filter.key] = filter.value
    })

    return (
      (!activeFilterMap.interestedCountry ||
        interestedCountry.toLowerCase().includes(activeFilterMap.interestedCountry.toLowerCase())) &&
      (!activeFilterMap.leadType || leadType.toLowerCase().includes(activeFilterMap.leadType.toLowerCase())) &&
      (!activeFilterMap.sourceOfLeads ||
        sourceOfLeads.toLowerCase().includes(activeFilterMap.sourceOfLeads.toLowerCase())) &&
      (!activeFilterMap.studentName || lead.fullname.toLowerCase().includes(activeFilterMap.studentName.toLowerCase()))
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
          `"${formatDate(lead.assignDate) || "-"}"`,
        ].join(",")
      }),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `leads_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
 const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input when button is clicked
  }

  const handleImportCSV = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // ✅ Preview the parsed data if needed
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      console.log('Parsed Data Preview:', results.data);
    },
  });

  // ✅ Prepare FormData
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/api/leads/uploadleads', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message); // Example: "10 leads imported"
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (err) {
    console.error('CSV Import Error:', err);
    alert('Something went wrong during CSV import');
  }
};

  const handleViewLead = (leadId) => {
    console.log("View lead:", leadId)
    // Add your view lead logic here
    // For example: router.push(`/leads/${leadId}`)
  }

  const handleEditLead = (leadId) => {
    console.log("Edit lead:", leadId)
    // Add your edit lead logic here
    // For example: router.push(`/leads/edit/${leadId}`)
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <DashboardHeader title="View Leads" subtitle="Manage and track all student leads" />
        <div className={styles.loading}>Loading leads...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <DashboardHeader title="View Leads" subtitle="Manage and track all student leads" />

      {/* Search Filters */}
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
              { value: "Dubai Team-Faizan", label: "Dubai Team-Faizan" },
              { value: "Dubai Team-Shilpa", label: "Dubai Team-Shilpa" },
              { value: "FB Ads", label: "FB Ads" },
              { value: "Message", label: "Message" },
              { value: "Others", label: "Others" },
              { value: "Reference", label: "Reference" },
              { value: "Seminar", label: "Seminar" },
              { value: "Social Media", label: "Social Media" },
              { value: "Walk In", label: "Walk In" },
              { value: "Website", label: "Website" },
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

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className={styles.activeFilters}>
            {activeFilters.map((filter) => (
              <div key={filter.key} className={styles.filterTag}>
                <span>{filter.label}</span>
                <button onClick={() => removeFilter(filter.key)} className={styles.removeFilter}>
                  <X className={styles.removeIcon} />
                </button>
              </div>
            ))}
            <button onClick={clearAllFilters} className={styles.clearAll}>
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>




         <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleImportCSV}
        style={{ display: 'none' }}
      />

      {/* Visible Import button only */}
      <button onClick={handleButtonClick} className={styles.downloadButton}>
        <GoUpload className={styles.downloadIcon} />
        Upload
      </button>
        <button onClick={downloadCSV} className={styles.downloadButton}>
          <Download className={styles.downloadIcon} />
          Download
        </button>


       
      </div>
      

      {/* Leads Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.th}>Student Name</th>
              <th className={styles.th}>Mobile</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Interested Country</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Application Generated</th>
              <th className={styles.th}>Lead Date</th>
              <th className={styles.th}>Assign Date</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => {
              const followUp = lead.followUps?.[0] || {}
              return (
                <tr key={lead._id} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  <td className={styles.td}>
                    <div className={styles.nameCell}>
                      
                      <span className={styles.name}>{lead.fullname || "N/A"}</span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.contactCell}>
                      <Phone className={styles.contactIcon} />
                      <span>{lead.phone || "N/A"}</span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.contactCell}>
                      <Mail className={styles.contactIcon} />
                      <span>{lead.email || "N/A"}</span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.country}>{lead.preferredCountry || lead.countryofresidence || "N/A"}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.statusBadge} ${getStatusClass(followUp.status)}`}>
                      {followUp.status || "N/A"}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.applicationBadge} ${lead.applicationGenerated ? styles.generated : styles.notGenerated}`}
                    >
                      {lead.applicationGenerated ? "Generated" : "Not Generated"}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.date}>{formatDate(lead.leaddate)}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.date}>{formatDate(lead.assignDate) || "-"}</span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleViewLead(lead._id)}
                        title="View Lead"
                      >
                        <Eye className={styles.actionIcon} />
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleEditLead(lead._id)}
                        title="Edit Lead"
                      >
                        <Edit className={styles.actionIcon} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className={styles.tableFooter}>
        <div className={styles.resultsInfo}>
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
        <div className={styles.pagination}>
          <button className={styles.paginationButton}>Previous</button>
          <span className={styles.pageInfo}>Page 1 of 1</span>
          <button className={styles.paginationButton}>Next</button>
        </div>
      </div>
    </div>
  )
}
