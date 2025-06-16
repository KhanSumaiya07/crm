"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, ChevronDown, ExternalLink, Filter, Search, Plus } from "lucide-react";
import DashboardHeader from "../../../components/ui/dashboardHeader";
import styles from "./style.module.css";

export default function ViewLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/leads/list");
        const data = await res.json();
        console.log("Fetched leads:", data);
        setLeads(data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "new lead":
        return styles.statusNew;
      case "in progress":
        return styles.statusProgress;
      case "document review":
        return styles.statusReview;
      case "application submitted":
        return styles.statusSubmitted;
      case "follow-up required":
        return styles.statusFollowup;
      case "completed":
        return styles.statusCompleted;
      default:
        return styles.statusDefault;
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.interestedCountry?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <DashboardHeader title="View Leads" subtitle="Manage and track all student leads" />

      {/* Filters */}
      <div className={styles.toolbar}>
        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterBox}>
            <Filter className={styles.filterIcon} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="new lead">New Lead</option>
              <option value="in progress">In Progress</option>
              <option value="document review">Document Review</option>
              <option value="application submitted">Application Submitted</option>
              <option value="follow-up required">Follow-up Required</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <button className={styles.addButton}>
          <Plus className={styles.addIcon} />
          Add New Lead
        </button>
      </div>

      {/* Leads Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Mobile</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Interested Country</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Assignment</th>
              <th className={styles.th}>Add Lead Date</th>
              <th className={styles.th}>Assign Date</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => (
              <tr key={lead._id || index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={styles.td}>
                  <div className={styles.nameCell}>
                    <span className={styles.name}>{lead.name}</span>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.contactCell}>
                    <Phone className={styles.contactIcon} />
                    <span>{lead.mobile}</span>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.contactCell}>
                    <Mail className={styles.contactIcon} />
                    <span>{lead.email}</span>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.country}>{lead.interestedCountry}</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${getStatusClass(lead.status)}`}>{lead.status}</span>
                </td>
                <td className={styles.td}>
                  {lead.isAssigned ? (
                    <div className={styles.assignmentCell}>
                      <span className={styles.assignedTo}>{lead.assignedTo}</span>
                      <ChevronDown className={styles.dropdownIcon} />
                    </div>
                  ) : (
                    <span className={styles.notAssigned}>Not Assigned</span>
                  )}
                </td>
                <td className={styles.td}>
                  <span className={styles.date}>{lead.addLeadDate}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.date}>{lead.assignLeadDate || "-"}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button className={styles.actionButton}>
                      <ExternalLink className={styles.actionIcon} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
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
  );
}
