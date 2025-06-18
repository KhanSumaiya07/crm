'use client';
import { useEffect, useState } from 'react';

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);

  const isAdmin = true; // Replace with real auth check

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(setCountries)
      .catch(console.error);
  }, []);

  const handleEdit = (country) => {
    alert(`Edit ${country.name}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this country?')) return;
    const res = await fetch(`/api/countries/${id}`, { method: 'DELETE' });
    if (res.ok) setCountries(prev => prev.filter(c => c._id !== id));
  };

  if (!isAdmin) return <div>Unauthorized</div>;

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ fontSize: '26px', marginBottom: '20px' }}>Representing Countries</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th style={thStyle}>Flag</th>
            <th style={thStyle}>Country Name</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(country => (
            <tr key={country._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>
                <img
                  src={country.flag}
                  alt={country.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    boxShadow: '0 0 3px rgba(0,0,0,0.2)'
                  }}
                />
              </td>
              <td style={tdStyle}>{country.name}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(country)} style={buttonStyle}>✏️ Edit</button>
                <button onClick={() => handleDelete(country._id)} style={{ ...buttonStyle, color: 'red' }}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ccc'
};

const tdStyle = {
  padding: '12px',
  verticalAlign: 'middle'
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  marginRight: '10px'
};
