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
  const [counsellors, setCounsellors] = useState([]);

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

    // Study Preferences
    preferredCountry: '',
    preferredCourse: '',
    intake: '',
    qualification: '',
    ieltsScore: '',
    budget: '',

    // Follow-up Info
    followupDate: '',
    notes: '',
    priority: ''
  });

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
          <InputField label="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} />
          <InputField label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} />
          <InputField
            label="Gender"
            name="gender"
            type="select"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' }
            ]}
          />
        </div>
      </InfoCard>

      <InfoCard title="Contact Information" icon={MapPin}>
        <div className={styles.formGridTwo}>
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
          <InputField label="Country of Residence" name="countryofresidence" value={formData.countryofresidence} onChange={handleChange} />
        </div>
      </InfoCard>

      <InfoCard title="Academic Information" icon={GraduationCap}>
        <div className={styles.formGridTwo}>
          <InputField
            label="Highest Qualification"
            name="highestQualification"
            type="select"
            value={formData.highestQualification}
            onChange={handleChange}
            options={[
              { value: '12th', label: '12th' },
              { value: 'Diploma', label: 'Diploma' },
              { value: 'Bachelor', label: "Bachelor's" },
              { value: 'Master', label: 'Master' },
              { value: 'PhD', label: 'Ph.D' }
            ]}
          />
          <InputField label="Pass-out Year" name="passoutYear" type="number" value={formData.passoutYear} onChange={handleChange} />
          <InputField label="Percentage / CGPA" name="academicScore" value={formData.academicScore} onChange={handleChange} />
        </div>
      </InfoCard>

      <InfoCard title="Assign Counsellor" icon={User}>
        <InputField
          label="Assign to Counsellor"
          name="assignedCounsellor"
          type="select"
          value={formData.assignedCounsellor}
          onChange={handleChange}
          options={counsellors.map((c) => ({ value: c._id, label: c.name }))}
        />
      </InfoCard>
    </>
  );

  const renderStep2 = () => (
    <InfoCard title="Study Preferences" icon={GraduationCap}>
      <div className={styles.formGrid}>
        <InputField label="Preferred Country" name="preferredCountry" value={formData.preferredCountry} onChange={handleChange} />
        <InputField label="Preferred Course" name="preferredCourse" value={formData.preferredCourse} onChange={handleChange} />
        <InputField label="Intake" name="intake" value={formData.intake} onChange={handleChange} />
        <InputField label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
        <InputField label="IELTS/TOEFL Score" name="ieltsScore" value={formData.ieltsScore} onChange={handleChange} />
        <InputField label="Budget" name="budget" value={formData.budget} onChange={handleChange} />
      </div>
    </InfoCard>
  );

  const renderStep3 = () => (
    <InfoCard title="Follow-up Information" icon={Phone}>
      <div className={styles.formGridTwo}>
        <InputField label="Follow-up Date" name="followupDate" type="date" value={formData.followupDate} onChange={handleChange} />
        <InputField
          label="Priority"
          name="priority"
          type="select"
          value={formData.priority}
          onChange={handleChange}
          options={[
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' }
          ]}
        />
        <InputField label="Notes" name="notes" value={formData.notes} onChange={handleChange} />
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
