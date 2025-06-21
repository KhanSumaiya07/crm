"use client";
import { Trash, TrashIcon } from "lucide-react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../../../../store/applicationSlice";

const ApplicationList = () => {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);


  const handleDelete = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this application?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/applications/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Application deleted successfully.");
      dispatch(fetchApplications()); // refresh the list
    } else {
      const data = await res.json();
      alert("Failed to delete: " + data?.message || "Unknown error");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting application.");
  }
};


  const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    margin: "4px",
  };

  const badgeStyle = (status) => {
    const colors = {
      "Received Application at KC": "#e6eaff",
      "Application submitted to the Institution": "#c5f7c6",
      "Conditional Offer Received": "#d9f7d6",
      "Case Closed – Program Closed": "#ffd4d4",
    };
    return {
      backgroundColor: colors[status] || "#eee",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "14px",
    };
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "16px" }}>Applications</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input placeholder="Date Created" style={inputStyle} />
        <input placeholder="Country" style={inputStyle} />
        <input placeholder="University" style={inputStyle} />
        <input placeholder="Intake" style={inputStyle} />
        <input placeholder="Acknowledgement No." style={inputStyle} />
        <input placeholder="Program Name" style={inputStyle} />
        <input placeholder="Student Name" style={inputStyle} />
        <select style={inputStyle}>
          <option>Status</option>
        </select>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#084cdf",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={tdStyle}>ACK. No</th>
              <th style={tdStyle}>Date Created</th>
              <th style={tdStyle}>Student Name</th>
              <th style={tdStyle}>University Name</th>
              <th style={tdStyle}>Program Name</th>
              <th style={tdStyle}>Intake</th>
              <th style={tdStyle}>Created By</th>
              <th style={tdStyle}>Application Status</th>
              <th style={tdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>
                  <a
                    href={`/applications/${app._id}`}
                    style={{ color: "#084cdf", textDecoration: "underline" }}
                  >
                    {app.referenceNo?.split("/")?.[0]}
                  </a>
                </td>
                <td style={tdStyle}>
                  {new Date(app.createdAt).toLocaleDateString()}
                  <br />
                  {new Date(app.createdAt).toLocaleTimeString()}
                </td>
                <td style={tdStyle}>
                  {app.lead?.fullname}
                  <br />
                  <span style={{ fontSize: "12px", color: "#555" }}>
                    {app.lead?.email}
                  </span>
                  <br />
                  <span style={{ fontSize: "12px", color: "#555" }}>
                    {app.lead?.phone}
                  </span>
                </td>
                <td style={tdStyle}>{app.courseDetails?.[0]?.institute}</td>
                <td style={tdStyle}>{app.courseDetails?.[0]?.course}</td>
                <td style={tdStyle}>
                  {app.courseDetails?.[0]?.intakeMonth}–
                  {app.courseDetails?.[0]?.intakeYear}
                </td>
                <td style={tdStyle}>EduWire Team 1</td>
                <td style={tdStyle}>
                  <span style={badgeStyle(app.status)}>{app.status}</span>
                </td>
                <td style={tdStyle}>
                  <TrashIcon
                    style={{ color: "red", cursor: "pointer" }}
                    size={18}
                    onClick={() => handleDelete(app._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const tdStyle = {
  padding: "10px",
  fontSize: "14px",
  textAlign: "left",
  verticalAlign: "top",
};

export default ApplicationList;
