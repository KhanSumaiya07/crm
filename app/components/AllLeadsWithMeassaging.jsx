"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import SendMessageModal from "../components/SendMessageModal"; // adjust path if needed

const AllLeadsWithMessagging = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("/api/leads").then(res => setLeads(res.data));
  }, []);

  const handleSend = async ({ subject, message }) => {
    await axios.post("/api/leads/sendmessages", {
      leadIds: selectedLeads.map(l => l._id),
      subject,
      messageTemplate: message
    });
    alert("Messages sent");
    setSelectedLeads([]);
  };

  const toggleSelect = (lead, checked) => {
    setSelectedLeads(prev =>
      checked
        ? [...prev, lead]
        : prev.filter((l) => l._id !== lead._id)
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Send Bulk Notification</h2>
      
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Select</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedLeads.some((l) => l._id === lead._id)}
                  onChange={(e) => toggleSelect(lead, e.target.checked)}
                />
              </td>
              <td>{lead.fullname}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setShowModal(true)}
        disabled={selectedLeads.length === 0}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Compose Message
      </button>

      {showModal && (
        <SendMessageModal
          selectedLeads={selectedLeads}
          onClose={() => setShowModal(false)}
          onSend={handleSend}
        />
      )}
    </div>
  );
};

export default AllLeadsWithMessagging;
