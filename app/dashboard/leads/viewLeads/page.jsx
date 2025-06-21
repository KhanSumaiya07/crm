// ViewLeads.jsx
"use client";

<<<<<<< HEAD
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from "react"
import { Mail, Phone, Eye, Edit, Search, Download, X } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchLeads } from '../../../../store/leadsSlice'
import DashboardHeader from "../../../components/ui/dashboardHeader"
import SearchFilter from "../../../components/dashboard/search-filter"
import styles from "./style.module.css"
=======
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
  UserRoundPen,
   Shuffle
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads } from "../../../../store/leadsSlice";
import DashboardHeader from "../../../components/ui/dashboardHeader";
import SearchFilter from "../../../components/dashboard/search-filter";
import styles from "./style.module.css";
import { GoUpload } from "react-icons/go";
import SendMessageModal from "../../../components/SendMessageModal";
>>>>>>> 63b04068246e2c0b5ef866f1ed72decb6482b8a2

export default function ViewLeads() {
  const router = useRouter();
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [counsellors, setCounsellors] = useState([]);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState("");

  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);
  useEffect(() => {
    fetch("/api/counsellor/list")
      .then((res) => res.json())
      .then(setCounsellors);
  }, []);


  const dropdownRef = useRef();


useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowAssignDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const assignToCounsellor = async () => {
    if (!selectedCounsellor) return alert("Please select a counsellor");
    const res = await fetch("/api/leads/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadIds: selectedLeads,
        counsellorId: selectedCounsellor,
      }),
    });

    if (res.ok) {
      alert("Leads assigned!");
      setShowAssignModal(false);
      dispatch(fetchLeads());
      setSelectedLeads([]);
    } else {
      const err = await res.json();
      alert("❌ Failed: " + err.error);
    }
  };

  const handleRandomAssign = async () => {
    const res = await fetch("/api/leads/random-assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadIds: selectedLeads }),
    });

    if (res.ok) {
      alert("Randomly assigned!");
      dispatch(fetchLeads());
      setSelectedLeads([]);
    } else {
      const err = await res.json();
      alert("❌ Failed: " + err.error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return styles.statusNew;
      case "in process":
        return styles.statusProgress;
      case "completed":
        return styles.statusCompleted;
      case "future lead":
        return styles.statusReview;
      case "not responding":
        return styles.statusFollowup;
      case "failed":
        return styles.statusDefault;
      default:
        return styles.statusDefault;
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

  const sendMessages = async ({ subject, message }) => {
    const res = await fetch("/api/leads/sendmessages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadIds: selectedLeads, // ✅ NOT .map((l) => l._id)
        subject,
        messageTemplate: message,
      }),
    });

    if (res.ok) {
      alert("Messages sent!");
      setSelectedLeads([]);
    } else {
      const err = await res.json();
      alert("❌ Failed to send: " + err.error);
    }
  };

  const handleBulkDelete = () => {
    if (confirm("Are you sure you want to delete selected leads?")) {
      selectedLeads.forEach((id) => handleDelete(id));
      setSelectedLeads([]);
    }
  };

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
    ];

    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) => {
        const followUp = lead.followUps?.[0] || {};
        return [
          `${lead.fullname || ""}`,
          `${lead.phone || ""}`,
          `${lead.email || ""}`,
          `${lead.preferredCountry || lead.countryofresidence || ""}`,
          `${followUp.status || ""}`,
          `${lead.applicationGenerated ? "Generated" : "Not Generated"}`,
          `${formatDate(lead.leaddate)}`,
          `${formatDate(lead.assignDate) || "-"}`,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `leads_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const slecteddownloadCSV = () => {
    const headers = [
      "Student Name",
      "Mobile",
      "Email",
      "Interested Country",
      "Status",
      "Application Generated",
      "Lead Date",
      "Assign Date",
    ];

<<<<<<< HEAD
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
  router.push(`/dashboard/leads/${leadId}/view`);
};
=======
    // Filter only selected leads
    const selectedLeadData = filteredLeads.filter((lead) =>
      selectedLeads.includes(lead._id)
    );
>>>>>>> 63b04068246e2c0b5ef866f1ed72decb6482b8a2

    if (selectedLeadData.length === 0) {
      alert("❌ No leads selected to download.");
      return;
    }

    const csvContent = [
      headers.join(","),
      ...selectedLeadData.map((lead) => {
        const followUp = lead.followUps?.[0] || {};
        return [
          `${lead.fullname || ""}`,
          `${lead.phone || ""}`,
          `${lead.email || ""}`,
          `${lead.preferredCountry || lead.countryofresidence || ""}`,
          `${followUp.status || ""}`,
          `${lead.applicationGenerated ? "Generated" : "Not Generated"}`,
          `${formatDate(lead.leaddate)}`,
          `${formatDate(lead.assignDate) || "-"}`,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `selected_leads_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewLead = (id) => router.push(`/dashboard/leads/${id}/view`);
  const handleEditLead = (id) => router.push(`/dashboard/leads/${id}/edit`);

  const filteredLeads = leads || [];

  return (
    <div className={styles.container}>
      <DashboardHeader
        title="View Leads"
        subtitle="Manage and track all student leads"
      />

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
          <button className={styles.iconButton} onClick={() => setShowModal(true)}>
            <Mail size={18} />
          </button>
          <button className={styles.iconButton} onClick={handleRandomAssign}>
            <Shuffle size={18} />
          </button>

  <div ref={dropdownRef} className={styles.assignDropdownWrapper}>
  <button
    onClick={() => setShowAssignDropdown(!showAssignDropdown)}
    className={styles.iconButton}
    title="Assign Leads"
  >
    <UserRoundPen size={18} />
  </button>

  {showAssignDropdown && (
    <div className={styles.assignDropdown}>
      <h4 className={styles.dropdownTitle}>Assign to Counsellor</h4>
      <select
        value={selectedCounsellor}
        onChange={(e) => setSelectedCounsellor(e.target.value)}
        className={styles.dropdownSelect}
      >
        <option value="">-- Select Counsellor --</option>
        {counsellors.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <button className={styles.assignBtn} onClick={assignToCounsellor}>
        ✅ Assign
      </button>
    </div>
  )}
</div>


<<<<<<< HEAD
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
      
=======

          <button onClick={slecteddownloadCSV} className={styles.iconButton}><Download size={18} /></button>
          <button onClick={handleBulkDelete} className={styles.iconButton}><Trash2 size={18} /></button>
          <button className={styles.iconButton}><MoreVertical size={18} /></button>
        </div>
      )}
>>>>>>> 63b04068246e2c0b5ef866f1ed72decb6482b8a2

      {/* Leads Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th></th>
              <th className={styles.th}>Student Name</th>
              <th className={styles.th}>Mobile</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Interested Country</th>
              <th className={styles.th}>Assign To</th>
              <th className={styles.th}>Status</th>
              
              
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
                              setSelectedLeads(
                                selectedLeads.filter((id) => id !== lead._id)
                              );
                            }
                          }}
                        />
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.nameCell}>
                        <span className={styles.name}>
                          {lead.fullname || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.contactCell}>
                        <span>{lead.phone || "N/A"}</span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.contactCell}>
                        <span>{lead.email || "N/A"}</span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.country}>
                        {lead.preferredCountry ||
                          lead.countryofresidence ||
                          "N/A"}
                      </span>
                    </td>
                    
                    <td className={styles.td}>
                      <span>{lead.assignedTo?.name || "N/A"}</span>
                    </td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          followUp.status
                        )}`}
                      >
                        {followUp.status || "N/A"}
                      </span>
                    </td>
                 
                    <td className={styles.td}>
                      <span className={styles.date}>
                        {formatDate(lead.assignDate) || "-"}
                      </span>
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
      {showAssignModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>Select Counsellor to Assign</h3>
            <select
              value={selectedCounsellor}
              onChange={(e) => setSelectedCounsellor(e.target.value)}
            >
              <option value="">-- Select --</option>
              {counsellors.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className={styles.modalActions}>
              <button onClick={assignToCounsellor}>Assign</button>
              <button onClick={() => setShowAssignModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <SendMessageModal
          selectedLeads={selectedLeads}
          onClose={() => setShowModal(false)}
          onSend={sendMessages}
        />
      )}
    </div>
  );
}
