'use client';
import { useEffect, useState } from 'react';

export default function LeadDropdown({ onSelectLead }) {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch('/api/leads/list')
      .then(res => res.json())
      .then(data => setLeads(data));
  }, []);

  return (
    <select className="border p-2" onChange={(e) => {
      const lead = leads.find(l => l._id === e.target.value);
      onSelectLead(lead);
    }}>
      <option>Select Lead</option>
      {leads.map((lead) => (
        <option key={lead._id} value={lead._id}>
          {lead.fullname} ({lead.email})
        </option>
      ))}
    </select>
  );
}