'use client';
import { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Phone,
  MapPin
} from 'lucide-react';
import InfoCard from '../../../components/dashboard/infoCard/infoCard';
import InputField from '../../../components/ui/inputField';
import DashboardHeader from '../../../components/ui/dashboardHeader';
import StepProgress from '../../../components/ui/step-progress';
import styles from './style.module.css';

const steps = [
  { id: 1, title: 'Personal Information', status: 'complete' },
  { id: 2, title: 'Study Preferences', status: 'current' },
  { id: 3, title: 'Follow-up Info', status: 'pending' }
];

const AddLead = () => {
  const [currentStep, setCurrentStep] = useState(1);


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
   

    // Study Preferences
    preferredCountry: '',
    preferredCourse: '',
    intake: '',
    qualification: '',
    ieltsScore: '',
    budget: '',

    // Follow-up Info
    followupDate: '',
    followupTime: '',
    notes: '',
    priority: '',
    // followupMode,
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/leads/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await res.json();
    if (res.ok) {
      alert('Lead added successfully');
      setFormData({});
      setCurrentStep(1);
    } else {
      alert(result.error || 'Something went wrong');
    }
  };

  const renderStep1 = () => (
    <>
      <InfoCard title="Personal Information" icon={User}>
        <div className={styles.formGrid}>
          <InputField label="Full Name" placeholder="Enter full name" name="fullname" value={formData.fullname} onChange={handleChange} />
          <InputField label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} />
          <InputField
            label="Gender"
            name="gender"
             placeholder="Select gender"
            type="select"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' }
            ]}
          />
        </div>
      </InfoCard>

      <InfoCard title="Contact Information" icon={MapPin}>
        <div className={styles.formGrid}>
          <InputField label="Email" name="email" placeholder="Enter email address" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Phone Number" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} />
          <InputField label="Country of Residence" name="countryofresidence" placeholder="Enter country of residence" value={formData.countryofresidence} onChange={handleChange} />
        </div>
      </InfoCard>

      <InfoCard title="Academic Information" icon={GraduationCap}>
        <div className={styles.formGrid}>
          <InputField
            label="Highest Qualification"
            name="highestQualification"
            type="select"
            value={formData.highestQualification}
            placeholder="Select qualification"
            onChange={handleChange}
            options={[
              { value: '12th', label: '12th' },
              { value: 'Diploma', label: 'Diploma' },
              { value: 'Bachelor', label: "Bachelor's" },
              { value: 'Master', label: 'Master' },
              { value: 'PhD', label: 'Ph.D' }
            ]}
          />
          <InputField label="Pass-out Year" name="passoutYear" placeholder="e.g. 2023" type="number" value={formData.passoutYear} onChange={handleChange} />
          <InputField label="Percentage / CGPA" name="academicScore" placeholder="e.g. 82.5% or 8.2 CGPA" value={formData.academicScore} onChange={handleChange} />
        </div>
      </InfoCard>

    </>
  );

  const renderStep2 = () => (
    <InfoCard title="Study Preferences" icon={GraduationCap}>
      <div className={styles.formGrid}>
        <InputField label="Preferred Country" placeholder="Enter preferred country" name="preferredCountry" value={formData.preferredCountry} onChange={handleChange} />
        <InputField label="Preferred Course" placeholder="Enter preferred course" name="preferredCourse" value={formData.preferredCourse} onChange={handleChange} />
        <InputField label="Intake" name="intake" placeholder="Enter intake period" value={formData.intake} onChange={handleChange} />
        
        <InputField label="IELTS/TOEFL Score" name="ieltsScore" placeholder="Enter test score" value={formData.ieltsScore} onChange={handleChange} />
        <InputField label="Budget" name="budget" placeholder="Budget (in ₹ / USD)" value={formData.budget} onChange={handleChange} />
      </div>
    </InfoCard>
  );

  const renderStep3 = () => (
   <InfoCard title="Follow-up Information" icon={Phone}>
  <div className={styles.formGridTwo}>

    {/* Follow-up Date */}
    <InputField
      label="Follow-up Date"
      name="followupDate"
      type="date"
      value={formData.followupDate}
      onChange={handleChange}
    />

    {/* Follow-up Time */}
    <InputField
      label="Follow-up Time"
      name="followupTime"
      type="time"
      value={formData.followupTime}
      onChange={handleChange}
    />

    {/* Lead Type Dropdown */}
    <InputField
      label="Lead Type"
      name="leadType"
      type="select"
      value={formData.leadType}
      placeholder="Select Lead Type"
      onChange={handleChange}
      options={[
        { value: '', label: 'Select Lead Type' },
        { value: 'Cold', label: 'Cold' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Failed', label: 'Failed' },
        { value: 'Future Lead', label: 'Future Lead' },
        { value: 'Hot', label: 'Hot' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Not Responding', label: 'Not Responding' },
      ]}
    />

    {/* Follow-up Mode Dropdown */}
    {/* <InputField
      label="Follow-up Mode"
      name="followupMode"
      type="select"
      placeholder="Select Follow-up Mode"
      value={formData.followupMode}
      onChange={handleChange}
      options={[
        { value: '', label: 'Select Mode' },
        { value: 'BBM', label: 'BBM' },
        { value: 'Email', label: 'Email' },
        { value: 'Google Meet', label: 'Google Meet' },
        { value: 'Meeting', label: 'Meeting' },
        { value: 'Phone', label: 'Phone' },
        { value: 'Skype', label: 'Skype' },
        { value: 'We Chat', label: 'We Chat' },
        { value: 'Whatsapp', label: 'Whatsapp' },
        { value: 'Zoom', label: 'Zoom' },
      ]}
    /> */}

    {/* status dropdown  */}
    <InputField
  label="Status"
  name="status"
  type="select"
  value={formData.status}
  onChange={handleChange}
  options={[
    { value: '', label: 'Select Status' },
    { value: 'New', label: 'New' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Follow-up Scheduled', label: 'Follow-up Scheduled' },
    { value: 'Converted', label: 'Converted' },
    { value: 'Not Interested', label: 'Not Interested' },
    { value: 'Closed', label: 'Closed' }
  ]}
/>

    {/* Notes or Remarks */}
    <InputField
      label="Remarks"
      name="remarks"
      value={formData.remarks}
      onChange={handleChange}
    />
  </div>
</InfoCard>

  );

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <DashboardHeader title="Add Lead" subtitle="Enter student info to create a new lead." />

      <StepProgress
        steps={steps.map((step) => ({
          ...step,
          status: step.id < currentStep ? 'complete' : step.id === currentStep ? 'current' : 'pending'
        }))}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      <form onSubmit={handleSubmit}>
        <div className={styles.content}>{getCurrentStepContent()}</div>

        <div className={styles.navigation}>
          <button type="button" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1} className={styles.buttonSecondary}>
            Back
          </button>

          {currentStep < steps.length ? (
            <button type="button" onClick={() => setCurrentStep(currentStep + 1)} className={styles.buttonPrimary}>
              Next
            </button>
          ) : (
            <button type="submit" className={styles.buttonPrimary}>
              Submit Lead
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddLead;
