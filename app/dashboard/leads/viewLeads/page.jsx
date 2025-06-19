// ViewLeads.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  Eye,
  Edit,
  Search,
  Download,
  X,
  Trash2,
  AlertTriangle,
  Archive,
  MoreVertical,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads } from "../../../../store/leadsSlice";
import DashboardHeader from "../../../components/ui/dashboardHeader";
import SearchFilter from "../../../components/dashboard/search-filter";
import styles from "./style.module.css";
import { GoUpload } from "react-icons/go";

export default function ViewLeads() {
  const router = useRouter();
  const [selectedLeads, setSelectedLeads] = useState([]);
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "new": return styles.statusNew;
      case "in process": return styles.statusProgress;
      case "completed": return styles.statusCompleted;
      case "future lead": return styles.statusReview;
      case "not responding": return styles.statusFollowup;
      case "failed": return styles.statusDefault;
      default: return styles.statusDefault;
    }
  };

  const handleDelete = async (leadId) => {
    const confirmDelete = confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete lead");
      alert("Lead deleted successfully");
      dispatch(fetchLeads());
    } catch (error) {
      console.error(error);
      alert("Error deleting lead");
    }
  };

  const handleBulkDelete = () => {
    if (confirm("Are you sure you want to delete selected leads?")) {
      selectedLeads.forEach((id) => handleDelete(id));
      setSelectedLeads([]);
    }
  };

  const handleViewLead = (id) => router.push(`/dashboard/leads/${id}/view`);
  const handleEditLead = (id) => router.push(`/dashboard/leads/${id}/edit`);

  const filteredLeads = leads || [];

  return (
    <div className={styles.container}>
      <DashboardHeader title="View Leads" subtitle="Manage and track all student leads" />

      {/* Toolbar like Gmail */}
      {selectedLeads.length > 0 && (
        <div className={styles.bulkActionBar}>
          <input
            type="checkbox"
            checked={selectedLeads.length === filteredLeads.length}
            onChange={(e) =>
              setSelectedLeads(
                e.target.checked ? filteredLeads.map((l) => l._id) : []
              )
            }
          />
          <button className={styles.iconButton}></button>
          
          
          <button className={styles.iconButton} onClick={handleBulkDelete}><Trash2 size={18} /></button>
          <span className={styles.divider}></span>
          <button className={styles.iconButton}><Mail size={18} /></button>
          <button className={styles.iconButton} ><Download size={18} /></button>
          <button className={styles.iconButton}><MoreVertical size={18} /></button>
        </div>
      )}

      {/* Leads Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>
              
              </th>
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
                const followUp = lead.followUps?.[0] || {};
                return (
                  <tr
                    key={lead._id}
                    className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                  >
                    <td>
                        <div className={styles.checkboxWrapper}>
    <input
      type="checkbox"
      className={styles.customCheckbox}
      checked={selectedLeads.includes(lead._id)}
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedLeads([...selectedLeads, lead._id]);
        } else {
          setSelectedLeads(selectedLeads.filter((id) => id !== lead._id));
        }
      }}
    />
  </div>
                    </td>
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
                      <span className={`${styles.applicationBadge} ${lead.applicationGenerated ? styles.generated : styles.notGenerated}`}>
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
                        <button
                          className={styles.actionButton}
                          onClick={() => handleDelete(lead._id)}
                        >
                          <Trash2 className={styles.actionIcon} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className={styles.noResults}>
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
