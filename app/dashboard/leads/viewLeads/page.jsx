"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react"
import { Mail, Phone, Eye, Edit, Search, Download, X } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchLeads } from '../../../../store/leadsSlice'
import DashboardHeader from "../../../components/ui/dashboardHeader"
import SearchFilter from "../../../components/dashboard/search-filter"
import styles from "./style.module.css"

export default function ViewLeads() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    interestedCountry: "",
    counsellor: "",
    leadType: "",
     status: "",
    sourceOfLeads: "",
    applicationGenerated: "",
    studentName: "",
  })
  const [activeFilters, setActiveFilters] = useState([])

  // Redux state management
  const dispatch = useDispatch()
  const { leads, loading, error } = useSelector((state) => state.leads)

  // Fetch leads from Redux
  useEffect(() => {
    dispatch(fetchLeads())
  }, [dispatch])

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
       status: 'status',
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

    const newActiveFilters = activeFilters.filter((filter) => filter.key !== filterKey)
    setActiveFilters(newActiveFilters)
  }

  const clearAllFilters = () => {
    setFilters({
      interestedCountry: "",
      counsellor: "",
      leadType: "",
       status: "",
      sourceOfLeads: "",
      applicationGenerated: "",
      studentName: "",
    })
    setActiveFilters([])
  }

  const filteredLeads = leads?.filter((lead) => {
    if (activeFilters.length === 0) return true

    const leadType = lead.followUps?.[0]?.leadType || ""
    const interestedCountry = lead.preferredCountry || lead.countryofresidence || ""
    const sourceOfLeads = lead.sourceOfLeads || ""

    const activeFilterMap = {}
    activeFilters.forEach((filter) => {
      activeFilterMap[filter.key] = filter.value
    })

    return (
      (!activeFilterMap.interestedCountry ||
        interestedCountry.toLowerCase().includes(activeFilterMap.interestedCountry.toLowerCase())) &&
      (!activeFilterMap.leadType || 
        leadType.toLowerCase().includes(activeFilterMap.leadType.toLowerCase())) &&
      (!activeFilterMap.sourceOfLeads ||
        sourceOfLeads.toLowerCase().includes(activeFilterMap.sourceOfLeads.toLowerCase())) &&
      (!activeFilterMap.studentName || 
        lead.fullname?.toLowerCase().includes(activeFilterMap.studentName.toLowerCase()))
    )
  }) || []

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

 const handleViewLead = (leadId) => {
  router.push(`/dashboard/leads/${leadId}/view`);
};

const handleEditLead = (leadId) => {
  router.push(`/dashboard/leads/${leadId}/edit`);
};


  if (loading) {
    return (
      <div className={styles.container}>
        <DashboardHeader title="View Leads" subtitle="Manage and track all student leads" />
        <div className={styles.loading}>Loading leads...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <DashboardHeader title="View Leads" subtitle="Manage and track all student leads" />
        <div className={styles.error}>Error loading leads: {error}</div>
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
    {/* ✅ New Status Filter */}
    <SearchFilter
      type="select"
      placeholder="Status"
      value={filters.status}
      onChange={(value) => handleFilterChange("status", value)}
      options={[
        { value: "Open", label: "Open" },
        { value: "In Progress", label: "In Progress" },
        { value: "Closed", label: "Closed" },
        { value: "Pending", label: "Pending" },
      ]}
    />
    {/* ✅ Student Name Text Search */}
    <SearchFilter
      type="text"
      placeholder="Student Name"
      value={filters.studentName}
      onChange={(value) => handleFilterChange("studentName", value)}
    />
  </div>

  <div className={styles.searchRow}>
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
        <button onClick={downloadCSV} className={styles.downloadButton}>
          <Download className={styles.downloadIcon} />
          Download Leads CSV
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
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead, index) => {
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
                      <span className={styles.country}>
                        {lead.preferredCountry || lead.countryofresidence || "N/A"}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.statusBadge} ${getStatusClass(followUp.status)}`}>
                        {followUp.status || "N/A"}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.applicationBadge} ${
                          lead.applicationGenerated ? styles.generated : styles.notGenerated
                        }`}
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
              })
            ) : (
              <tr>
                <td colSpan={9} className={styles.noResults}>
                  No leads found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className={styles.tableFooter}>
        <div className={styles.resultsInfo}>
          Showing {filteredLeads.length} of {leads?.length || 0} leads
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