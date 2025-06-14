'use client'
import {
  User,
  MapPin,
  GraduationCap,
  Briefcase,
  FileText,
  Info,
} from "lucide-react"
// import InfoCard from "../../../components/ui/infoCard"
import InfoCard from "../../../components/dashboard/infoCard/infoCard";

import React, { useState } from "react"
import InputField from '../../../components/ui/inputField';
import DashboardHeader from "../../../components/ui/dashboardHeader";


const AddLead = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    DOB: "",
    gender: "",
    email: "",
    phone: "",
    countryofresidence: "",
    highestQualification: "",
    passoutYear: "",
    academicScore: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <DashboardHeader title='Add Lead' subtitle='Enter student info to create a new lead.' />
  
      <div className="addLeadFormContainer">

        {/* Personal Info */}
        <InfoCard title="Personal Information" icon={User}>
          <div className="form-grid">
            <div className="form-field">
              <InputField
                label="Full Name"
                name="fullname"
                placeholder="Enter full name"
                value={formData.fullname}
                onChange={handleChange}
              />

            </div>
            <div className="form-field">

              <InputField
                label="Date of Birth"
                name="DOB"
                type="date"
                value={formData.DOB}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <InputField
                label="Gender"
                name="gender"
                type="select"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Select gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />
            </div>
          </div>
        </InfoCard>

        {/* Contact Info */}
        <InfoCard title="Contact Information" icon={MapPin}>
          <div className="form-grid-2">
            <div className="form-field">

              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
            <div className="form-field">
              <InputField
                label="Phone Number"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

            </div>
            <div className="form-field full-width">
              <InputField
                label="Country of Residence"
                name="countryofresidence"
                type="text"
                value={formData.countryofresidence}
                onChange={handleChange}
                placeholder="Enter country of residence"
              />
            </div>
          </div>
        </InfoCard>

        {/* Academic Info */}
        <InfoCard title="Academic Information" icon={GraduationCap}>
          <div className="form-grid-2">
            <div className="form-field">
              <InputField
                label="Highest Qualification"
                name="highestQualification"
                type="select"
                value={formData.highestQualification}
                onChange={handleChange}
                placeholder="Select qualification"
                options={[
                  { value: "12th", label: "12th" },
                  { value: "Diploma", label: "Diploma" },
                  { value: "Bachelor", label: "Bachelor's Degree" },
                  { value: "Master", label: "Master's Degree" },
                  { value: "PhD", label: "Ph.D" },
                ]}
              />
            </div>
            <div className="form-field">
              <InputField
                label="Pass-out Year"
                name="passoutYear"
                type="number"
                value={formData.passoutYear}
                onChange={handleChange}
                placeholder="e.g. 2023"
              />
            </div>
            <div className="form-field">
              <InputField
                label="Percentage / CGPA"
                name="academicScore"
                type="text"
                value={formData.academicScore}
                onChange={handleChange}
                placeholder="e.g. 82.5% or 8.2 CGPA"
              />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  )
}

export default AddLead;
