'use client';

import { useEffect, useState } from 'react';

export default function MessageLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [templateMsg, setTemplateMsg] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await fetch('/api/leads/list');
      const data = await res.json();
      console.log(data)
      setLeads(data);
    };
    fetchLeads();
  }, []);

  const toggleSelect = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedLeads.length === leads.length) setSelectedLeads([]);
    else setSelectedLeads(leads.map((lead) => lead._id));
  };

  const sendMessages = async () => {
    if (!templateMsg.trim() || selectedLeads.length === 0) {
      alert('Select leads and enter a message.');
      return;
    }

    const res = await fetch('/api/leads/sendmessages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadIds: selectedLeads,
        messageTemplate: templateMsg,
      }),
    });

    if (res.ok) {
      alert('Messages sent!');
      setSelectedLeads([]);
      setTemplateMsg('');
    } else {
      alert('Failed to send');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Send Bulk Message to Leads</h1>

      <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">
                <input type="checkbox" onChange={selectAll} checked={selectedLeads.length === leads.length} />
              </th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t hover:bg-gray-50">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead._id)}
                    onChange={() => toggleSelect(lead._id)}
                  />
                </td>
                <td className="p-2">{lead.fullname}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <textarea
        className="w-full border rounded p-3 h-32 mb-4"
        placeholder="Message template (you can use {{name}}, {{email}}, etc.)"
        value={templateMsg}
        onChange={(e) => setTemplateMsg(e.target.value)}
      />

      <button
        onClick={sendMessages}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Send Message to Selected Leads
      </button>
    </div>
  );
}
