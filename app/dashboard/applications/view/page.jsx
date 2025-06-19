"use client"
import { useEffect, useState } from 'react';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    dateCreated: '',
    country: '',
    university: '',
    intake: '',
    year: [],
    status: '',
    program: '',
    studentName: ''
  });

  useEffect(() => {
  fetch('/api/applications/list')
    .then(res => res.json())
    .then(data => {
      console.log("Fetched applications:", data); // 🔍 Console log here
      setApplications(data);
    })
    .catch(err => console.error("Error fetching applications:", err));
}, []);


  const inputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    margin: '4px'
  };

  const badgeStyle = (status) => {
    const colors = {
      'Received Application at KC': '#e6eaff',
      'Application submitted to the Institution': '#c5f7c6',
      'Conditional Offer Received': '#d9f7d6',
      'Case Closed – Program Closed': '#ffd4d4'
    };
    return {
      backgroundColor: colors[status] || '#eee',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '14px'
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '16px' }}>Applications</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
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
        <button style={{ padding: '8px 16px', backgroundColor: '#084cdf', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Search
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={tdStyle}>ACK. No</th>
            <th style={tdStyle}>Date Created</th>
            <th style={tdStyle}>Student Name</th>
            <th style={tdStyle}>University Name</th>
            <th style={tdStyle}>Program Name</th>
            <th style={tdStyle}>Intake</th>
            <th style={tdStyle}>Created By</th>
            <th style={tdStyle}>Application Status</th>
            <th style={tdStyle}>KC Assignee</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, idx) => (
           <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
  <td style={tdStyle}>
    <a href={`/applications/${app._id}`} style={{ color: '#084cdf', textDecoration: 'underline' }}>
      {app.referenceNo?.split('/')?.[0]}
    </a>
  </td>
  <td style={tdStyle}>{new Date(app.createdAt).toLocaleDateString()}<br />{new Date(app.createdAt).toLocaleTimeString()}</td>
  <td style={tdStyle}>
    {app.lead?.fullname}<br />
    <span style={{ fontSize: '12px', color: '#555' }}>{app.lead?.email}</span><br />
    <span style={{ fontSize: '12px', color: '#555' }}>{app.lead?.phone}</span>
  </td>
  <td style={tdStyle}>{app.courseDetails?.[0]?.institute}</td>
  <td style={tdStyle}>{app.courseDetails?.[0]?.course}</td>
  <td style={tdStyle}>{app.courseDetails?.[0]?.intakeMonth}–{app.courseDetails?.[0]?.intakeYear}</td>
  <td style={tdStyle}>EduWire Team 1</td>
  <td style={tdStyle}><span style={badgeStyle(app.status)}>{app.status}</span></td>
  <td style={tdStyle}>Samiksha Ingole<br />8669960961</td>
</tr>

          ))}
        </tbody>
      </table>
    </div>
  );
};

const tdStyle = {
  padding: '10px',
  fontSize: '14px',
  textAlign: 'left',
  verticalAlign: 'top'
};

export default ApplicationList;
