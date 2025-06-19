"use client"
import { useEffect, useState } from 'react';
import styles from './style.module.css';

const ApplicationForm = () => {
  const [leads, setLeads] = useState([]);
  const [leadDetails, setLeadDetails] = useState({});
  const [step, setStep] = useState(1);
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

  const handleChange = async (e, section, field, index = 0) => {
    const { name, value, type, checked } = e.target;

    if (section === 'root') {
      if (name === 'lead') {
        const leadId = value;
        const res = await fetch(`/api/leads/${leadId}`);
        const data = await res.json();
        setLeadDetails(data);

        setFormData(prev => ({
          ...prev,
          lead: leadId,
          referenceNo: data.referenceNo || '',
          address: {
            ...prev.address,
            permanent: data.address?.permanent || prev.address.permanent,
            correspondence: data.address?.correspondence || prev.address.correspondence,
          },
          passportDetails: {
            ...prev.passportDetails,
            number: data.passportNumber || '',
          }
        }));
      } else {
        setFormData({ ...formData, [name]: value });
      }
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

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Application Form</h2>

      <div className={styles.steps}>
        <div className={`${styles.step} ${step === 1 ? styles.active : ''}`}>1. Lead Info</div>
        <div className={`${styles.step} ${step === 2 ? styles.active : ''}`}>2. Address</div>
        <div className={`${styles.step} ${step === 3 ? styles.active : ''}`}>3. Course & Status</div>
      </div>

    {step === 1 && (
  <div>
    <label className={styles.label}>Select Lead</label>
    <select name="lead" value={formData.lead} onChange={(e) => handleChange(e, 'root')} className={styles.input}>
      <option value=''>Select Lead</option>
      {leads.map(lead => (
        <option key={lead._id} value={lead._id}>{lead.fullname} - {lead.email}</option>
      ))}
    </select>

    <label className={styles.label}>Reference No</label>
    <input name="referenceNo" value={formData.referenceNo} onChange={(e) => handleChange(e, 'root')} className={styles.input} />

    <h3 className={styles.subTitle}>Passport Details</h3>

    <label className={styles.label}>Passport Number</label>
    <input name="number" placeholder="Passport No" value={formData.passportDetails.number} onChange={(e) => handleChange(e, 'passportDetails', '')} className={styles.input} />

    <label className={styles.label}>Issue Date</label>
    <input name="issueDate" type="date" value={formData.passportDetails.issueDate} onChange={(e) => handleChange(e, 'passportDetails', '')} className={styles.input} />

    <label className={styles.label}>Expiry Date</label>
    <input name="expiryDate" type="date" value={formData.passportDetails.expiryDate} onChange={(e) => handleChange(e, 'passportDetails', '')} className={styles.input} />

    <label className={styles.checkboxLabel}>
      <input type="checkbox" name="valid" checked={formData.passportDetails.valid} onChange={(e) => handleChange(e, 'passportDetails', '')} />
      Valid
    </label>
  </div>
)}

{step === 2 && (
  <div>
    <h3 className={styles.subTitle}>Permanent Address</h3>
    {Object.keys(formData.address.permanent).map((key) => (
      <div key={key}>
        <label className={styles.label}>{key}</label>
        <input name={key} placeholder={key} value={formData.address.permanent[key]} onChange={(e) => handleChange(e, 'address', 'permanent')} className={styles.input} />
      </div>
    ))}

    <h3 className={styles.subTitle}>Correspondence Address</h3>
    {Object.keys(formData.address.correspondence).map((key) => (
      <div key={key}>
        <label className={styles.label}>{key}</label>
        <input name={key} placeholder={key} value={formData.address.correspondence[key]} onChange={(e) => handleChange(e, 'address', 'correspondence')} className={styles.input} />
      </div>
    ))}
  </div>
)}

{step === 3 && (
  <div>
    <h3 className={styles.subTitle}>Fee Details</h3>
    {Object.keys(formData.feeDetails).map((key) => (
      <div key={key}>
        <label className={styles.label}>{key}</label>
        <input name={key} placeholder={key} value={formData.feeDetails[key]} onChange={(e) => handleChange(e, 'feeDetails', '')} className={styles.input} />
      </div>
    ))}

    <h3 className={styles.subTitle}>Course Details</h3>
    {formData.courseDetails.map((course, index) => (
      <div key={index} className={styles.courseBox}>
        {Object.keys(course).map((field) => (
          <div key={field}>
            <label className={styles.label}>{field}</label>
            <input name={field} placeholder={field} value={course[field]} onChange={(e) => handleChange(e, 'courseDetails', '', index)} className={styles.input} />
          </div>
        ))}
      </div>
    ))}

    <label className={styles.label}>Status</label>
    <select name="status" value={formData.status} onChange={(e) => handleChange(e, 'root')} className={styles.input}>
      {['New Lead', 'Application Submitted', 'Documents Pending', 'Fee Paid', 'Visa Applied', 'Completed', 'Rejected'].map(status => (
        <option key={status} value={status}>{status}</option>
      ))}
    </select>
  </div>
)}


      <div className={styles.buttons}>
  {step > 1 && (
    <button type="button" onClick={prevStep} className={styles.btn}>
      Previous
    </button>
  )}

  {step < 3 ? (
    <button type="button" onClick={nextStep} className={styles.btnPrimary}>
      Next
    </button>
  ) : (
    <button type="submit" className={styles.btnPrimary}>
      Submit
    </button>
  )}
</div>

    </form>
  );
};

export default ApplicationForm;
