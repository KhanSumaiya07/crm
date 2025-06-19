"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads ,updateFollowUp} from "../../../../store/leadsSlice";
import DashboardHeader from "../../../components/ui/dashboardHeader";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import EditFollowUpModal from "../../../components/EditFollowUpModal";
import { toast } from "react-toastify"


const ManageFollowUps = () => {
  const dispatch = useDispatch();
  const { leads, loading } = useSelector((state) => state.leads);
  const [editingFollowUp, setEditingFollowUp] = useState(null);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const getUpcomingFollowUps = () => {
    const now = new Date();
    return leads
      .flatMap((lead) =>
        lead.followUps.map((followUp) => ({
          ...followUp,
          leadId: lead._id,
          fullname: lead.fullname,
        }))
      )
      .filter((f) => f.date )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const followUps = getUpcomingFollowUps();

const handleSave = (updatedFollowUp) => {
  dispatch(updateFollowUp({
    leadId: updatedFollowUp.leadId,
    followUpId: updatedFollowUp._id,
    updatedData: {
      date: updatedFollowUp.date,
      time: updatedFollowUp.time,
      mode: updatedFollowUp.mode,
      status: updatedFollowUp.status,
      remark: updatedFollowUp.remark,
    }
  }))
    .unwrap()
    .then(() => {
      toast.success("Follow-up updated successfully");
      setEditingFollowUp(null); // Close modal
    })
    .catch((err) => {
      toast.error(`Update failed: ${err}`);
    });
};


  return (
    <div style={{ padding: "2rem" }}>
      <DashboardHeader
        title="Manage Follow-Ups"
        subtitle="Manage and track all your follow-up leads here"
      />

      {loading ? (
        <p style={{ textAlign: "center", padding: "2rem" }}>Loading...</p>
      ) : followUps.length === 0 ? (
        <p style={{ textAlign: "center", padding: "2rem" }}>
          No upcoming follow-ups found.
        </p>
      ) : (
        <div
          style={{
            marginTop: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.75rem",
            overflowX: "auto",
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f9fafb" }}>
              <tr>
                <th style={thStyle}>Student</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Mode</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Remark</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {followUps.map((f, idx) => (
                <tr
                  key={idx}
                  style={{ backgroundColor: idx % 2 === 0 ? "white" : "#f9fafb" }}
                >
                  <td style={tdStyle}>{f.fullname}</td>
                  <td style={tdStyle}>{format(new Date(f.date), "dd MMM yyyy")}</td>
                  <td style={tdStyle}>{f.time}</td>
                  <td style={tdStyle}>{f.mode}</td>
                  <td style={tdStyle}>{f.status}</td>
                  <td style={tdStyle}>{f.remark}</td>
                  <td style={{ ...tdStyle, display: "flex", gap: "0.5rem" }}>
                    <Link href={`/dashboard/leads/viewLeads/${f.leadId}`}>
                      <button style={actionButtonStyle} title="View Lead">
                        <Eye size={16} />
                      </button>
                    </Link>
                    <button
                      style={{ ...actionButtonStyle, backgroundColor: "#fef3c7" }}
                      title="Edit Follow-Up"
                      onClick={() => setEditingFollowUp(f)}
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingFollowUp && (
        <EditFollowUpModal
          followUp={editingFollowUp}
          onClose={() => setEditingFollowUp(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

const thStyle = {
  padding: "1rem",
  textAlign: "left",
  fontWeight: 600,
  color: "#374151",
  fontSize: "0.875rem",
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "1rem",
  borderBottom: "1px solid #f3f4f6",
  fontSize: "0.875rem",
  verticalAlign: "middle",
};

const actionButtonStyle = {
  padding: "0.5rem",
  border: "none",
  backgroundColor: "#dbeafe",
  cursor: "pointer",
  borderRadius: "0.375rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default ManageFollowUps;
