// ApplicationForm.jsx
"use client"
import { useEffect, useState } from 'react';

const ApplicationForm = () => {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    lead: '',
    referenceNo: '',
    passportDetails: {
      number: '',
      issueDate: '',
      expiryDate: '',
      valid: false
    },
    address: {
      permanent: { address: '', city: '', state: '', zip: '', country: '' },
      correspondence: { address: '', city: '', state: '', zip: '', country: '' }
    },
    feeDetails: {
      scholarship: '',
      proof: '',
      tuitionFee: '',
      paidAmount: '',
      dueFirstYear: '',
      totalFee: '',
      paymentMethod: '',
      paymentReference: '',
      paymentDate: ''
    },
    courseDetails: [{
      country: '',
      institute: '',
      course: '',
      intakeMonth: '',
      intakeYear: '',
      applicationFee: '',
      currency: '',
      paymentMethod: '',
      paymentReference: '',
      paymentDate: '',
      remarks: ''
    }],
    status: 'New Lead'
  });

  useEffect(() => {
    fetch('/api/leads/list')
      .then(res => res.json())
      .then(data => setLeads(data));
  }, []);

  const handleChange = (e, section, field, index = 0) => {
    const { name, value, type, checked } = e.target;
    if (section === 'root') {
      setFormData({ ...formData, [name]: value });
    } else if (section === 'courseDetails') {
      const updatedCourses = [...formData.courseDetails];
      updatedCourses[index][name] = value;
      setFormData({ ...formData, courseDetails: updatedCourses });
    } else {
      const updatedSection = { ...formData[section] };
      if (typeof updatedSection[field] === 'object') {
        updatedSection[field][name] = value;
      } else {
        updatedSection[name] = type === 'checkbox' ? checked : value;
      }
      setFormData({ ...formData, [section]: updatedSection });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      alert('Application submitted successfully');
    } catch (error) {
      alert('Error submitting application');
      console.error(error);
    }
  };

  const inputStyle = {
    display: 'block',
    margin: '8px 0',
    padding: '8px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginTop: '12px',
    display: 'block'
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Application Form</h2>

      <label style={labelStyle}>Lead</label>
      <select name="lead" value={formData.lead} onChange={(e) => handleChange(e, 'root')} style={inputStyle}>
        <option value=''>Select Lead</option>
        {leads.map(lead => (
          <option key={lead._id} value={lead._id}>{lead.fullname} - {lead.email}</option>
        ))}
      </select>

      <label style={labelStyle}>Reference No</label>
      <input name="referenceNo" value={formData.referenceNo} onChange={(e) => handleChange(e, 'root')} style={inputStyle} />

      <h3 style={{ marginTop: '20px' }}>Passport Details</h3>
      <input name="number" placeholder="Passport No" value={formData.passportDetails.number} onChange={(e) => handleChange(e, 'passportDetails', '')} style={inputStyle} />
      <input name="issueDate" type="date" value={formData.passportDetails.issueDate} onChange={(e) => handleChange(e, 'passportDetails', '')} style={inputStyle} />
      <input name="expiryDate" type="date" value={formData.passportDetails.expiryDate} onChange={(e) => handleChange(e, 'passportDetails', '')} style={inputStyle} />
      <label style={labelStyle}>
        <input type="checkbox" name="valid" checked={formData.passportDetails.valid} onChange={(e) => handleChange(e, 'passportDetails', '')} /> Valid
      </label>

      <h3 style={{ marginTop: '20px' }}>Permanent Address</h3>
      {Object.keys(formData.address.permanent).map((key) => (
        <input key={key} name={key} placeholder={key} value={formData.address.permanent[key]} onChange={(e) => handleChange(e, 'address', 'permanent')} style={inputStyle} />
      ))}

      <h3 style={{ marginTop: '20px' }}>Correspondence Address</h3>
      {Object.keys(formData.address.correspondence).map((key) => (
        <input key={key} name={key} placeholder={key} value={formData.address.correspondence[key]} onChange={(e) => handleChange(e, 'address', 'correspondence')} style={inputStyle} />
      ))}

      <h3 style={{ marginTop: '20px' }}>Fee Details</h3>
      {Object.keys(formData.feeDetails).map((key) => (
        <input key={key} name={key} placeholder={key} value={formData.feeDetails[key]} onChange={(e) => handleChange(e, 'feeDetails', '')} style={inputStyle} />
      ))}

      <h3 style={{ marginTop: '20px' }}>Course Details</h3>
      {formData.courseDetails.map((course, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          {Object.keys(course).map((field) => (
            <input key={field} name={field} placeholder={field} value={course[field]} onChange={(e) => handleChange(e, 'courseDetails', '', index)} style={inputStyle} />
          ))}
        </div>
      ))}

      <label style={labelStyle}>Status</label>
      <select name="status" value={formData.status} onChange={(e) => handleChange(e, 'root')} style={inputStyle}>
        {['New Lead','Application Submitted','Documents Pending','Fee Paid','Visa Applied','Completed','Rejected'].map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>Submit Application</button>
    </form>
  );
};

export default ApplicationForm;
