"use client";

import { useState } from "react";

const EditFollowUpModal = ({ followUp, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...followUp,
    date: followUp.date?.substring(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "0.75rem",
      width: "90%",
      maxWidth: "500px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    label: {
      display: "block",
      marginBottom: "1rem",
      fontWeight: "500",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "0.5rem 0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      marginTop: "0.25rem",
      fontSize: "0.875rem",
    },
    textarea: {
      width: "100%",
      padding: "0.5rem 0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      marginTop: "0.25rem",
      fontSize: "0.875rem",
      resize: "vertical",
    },
    buttonRow: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "1rem",
      marginTop: "1.5rem",
    },
    saveButton: {
      backgroundColor: "#10b981",
      color: "#fff",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "0.375rem",
      fontWeight: "600",
      cursor: "pointer",
    },
    cancelButton: {
      backgroundColor: "#f3f4f6",
      color: "#374151",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "0.375rem",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Edit Follow-Up</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Mode:
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Call">Call</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
            </select>
          </label>
          <label style={styles.label}>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="New">New</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </label>
          <label style={styles.label}>
            Remark:
            <textarea
              name="remark"
              rows={3}
              value={formData.remark}
              onChange={handleChange}
              style={styles.textarea}
            />
          </label>
          <div style={styles.buttonRow}>
            <button type="submit" style={styles.saveButton}>
              Save
            </button>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFollowUpModal;
