'use client';

import { useEffect, useState } from 'react';

export default function AllLeadsWithMessaging() {
  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [templateMsg, setTemplateMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleSelect = (leadId) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map((lead) => lead._id));
    }
  };

  const handleSendMessages = async () => {
    if (selectedLeads.length === 0 || !templateMsg.trim()) {
      alert('Please select leads and enter a message.');
      return;
    }

    const res = await fetch('/api/leads/send-messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadIds: selectedLeads,
        messageTemplate: templateMsg,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Messages sent successfully!');
      setSelectedLeads([]);
      setTemplateMsg('');
    } else {
      alert('Failed to send messages');
      console.error(data);
    }
  };

  if (loading) return <p className="p-4">Loading leads...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Leads Messaging Center</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">
                <input
                  type="checkbox"
                  checked={selectedLeads.length === leads.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Country</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-gray-50 border-t border-gray-200"
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead._id)}
                    onChange={() => handleSelect(lead._id)}
                  />
                </td>
                <td className="p-2">{lead.fullname}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.phone}</td>
                <td className="p-2">{lead.preferencecountry || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <label className="block font-medium mb-1">
          Message Template:
        </label>
        <textarea
          className="w-full border rounded p-2 h-32"
          placeholder="Type your email or WhatsApp message template here. You can use {{name}}, {{email}}, etc."
          value={templateMsg}
          onChange={(e) => setTemplateMsg(e.target.value)}
        />
      </div>

      <button
        onClick={handleSendMessages}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send Message to Selected Leads
      </button>
    </div>
  );
}
