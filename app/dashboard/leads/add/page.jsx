// ======= FRONTEND: AddLead.jsx =======
'use client';
import React, { useState, useEffect } from 'react';
import {
  User,
  MapPin,
  GraduationCap
} from 'lucide-react';
import InputField from '../../../components/ui/inputField';
import InfoCard from '../../../components/dashboard/infoCard/infoCard';
import DashboardHeader from '../../../components/ui/dashboardHeader';

const AddLead = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    DOB: '',
    gender: '',
    email: '',
    phone: '',
    countryofresidence: '',
    highestQualification: '',
    passoutYear: '',
    academicScore: '',
    assignedCounsellor: '',
  });

  const [counsellors, setCounsellors] = useState([]);

  useEffect(() => {
    const fetchCounsellors = async () => {
      const res = await fetch('/api/counsellor/list');
      const data = await res.json();
      setCounsellors(data);
    };
    fetchCounsellors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/leads/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (res.ok) {
      alert('Lead added successfully');
      setFormData({
        fullname: '', DOB: '', gender: '', email: '', phone: '',
        countryofresidence: '', highestQualification: '', passoutYear: '',
        academicScore: '', assignedCounsellor: ''
      });
    } else alert(result.error);
  };

  return (
    <div>
      <DashboardHeader title='Add Lead' subtitle='Enter student info to create a new lead.' />
      <form onSubmit={handleSubmit} className="addLeadFormContainer">
        <InfoCard title="Personal Information" icon={User}>
          <div className="form-grid">
            <InputField label="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} />
            <InputField label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} />
            <InputField label="Gender" name="gender" type="select" value={formData.gender} onChange={handleChange}
              options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]} />
          </div>
        </InfoCard>

        <InfoCard title="Contact Information" icon={MapPin}>
          <div className="form-grid-2">
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
            <InputField label="Country of Residence" name="countryofresidence" value={formData.countryofresidence} onChange={handleChange} />
          </div>
        </InfoCard>

        <InfoCard title="Academic Information" icon={GraduationCap}>
          <div className="form-grid-2">
            <InputField label="Highest Qualification" name="highestQualification" type="select" value={formData.highestQualification} onChange={handleChange}
              options={[{ value: '12th', label: '12th' }, { value: 'Diploma', label: 'Diploma' }, { value: 'Bachelor', label: "Bachelor's" }, { value: 'Master', label: 'Master' }, { value: 'PhD', label: 'Ph.D' }]} />
            <InputField label="Pass-out Year" name="passoutYear" type="number" value={formData.passoutYear} onChange={handleChange} />
            <InputField label="Percentage / CGPA" name="academicScore" value={formData.academicScore} onChange={handleChange} />
          </div>
        </InfoCard>

        <InfoCard title="Assign Counsellor" icon={User}>
          <div className="form-field full-width">
            <InputField label="Assign to Counsellor" name="assignedCounsellor" type="select" value={formData.assignedCounsellor} onChange={handleChange}
              options={counsellors.map(c => ({ value: c._id, label: c.name }))} placeholder="Select Counsellor" />
          </div>
        </InfoCard>

        <button type="submit" className="submit-btn mt-4">Submit Lead</button>
      </form>
    </div>
  );
};

export default AddLead;

