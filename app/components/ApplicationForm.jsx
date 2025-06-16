'use client';
import { useEffect, useState } from 'react';

export default function ApplicationForm({ lead }) {
  const [formData, setFormData] = useState({
    lead: lead?._id || '',
    passportDetails: {
      number: '',
      issueDate: '',
      expiryDate: '',
    },
    address: {
      permanent: {
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      },
    },
    feeDetails: {
      tuitionFee: '',
      paidAmount: '',
    },
    courseDetails: [
      {
        country: '',
        institute: '',
        course: '',
        intakeMonth: '',
        intakeYear: '',
      },
    ],
  });

  useEffect(() => {
    if (lead) {
      setFormData((prev) => ({
        ...prev,
        lead: lead._id,
      }));
    }
  }, [lead]);

  const handleChange = (section, field, value, index = 0) => {
    if (section === 'passportDetails' || section === 'feeDetails') {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else if (section === 'address') {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          permanent: { ...prev.address.permanent, [field]: value },
        },
      }));
    } else if (section === 'courseDetails') {
      const updatedCourses = [...formData.courseDetails];
      updatedCourses[index][field] = value;
      setFormData((prev) => ({ ...prev, courseDetails: updatedCourses }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.passportDetails.number) {
      alert('Passport number is required');
      return;
    }

    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert('✅ Application created successfully');
    } else {
      alert('❌ Failed to create application');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 border p-4 rounded bg-white shadow">
      {lead && (
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-1">Lead Information</h2>
          <p><strong>Name:</strong> {lead.fullname}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone}</p>
        </div>
      )}

      <h3 className="text-md font-semibold">Passport Details</h3>
      <input
        className="border p-2 w-full"
        placeholder="Passport Number"
        onChange={(e) => handleChange('passportDetails', 'number', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="date"
        placeholder="Issue Date"
        onChange={(e) => handleChange('passportDetails', 'issueDate', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="date"
        placeholder="Expiry Date"
        onChange={(e) => handleChange('passportDetails', 'expiryDate', e.target.value)}
      />

      <h3 className="text-md font-semibold">Permanent Address</h3>
      <input
        className="border p-2 w-full"
        placeholder="Address"
        onChange={(e) => handleChange('address', 'address', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="City"
        onChange={(e) => handleChange('address', 'city', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="State"
        onChange={(e) => handleChange('address', 'state', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Zip Code"
        onChange={(e) => handleChange('address', 'zip', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Country"
        onChange={(e) => handleChange('address', 'country', e.target.value)}
      />

      <h3 className="text-md font-semibold">Fee Details</h3>
      <input
        className="border p-2 w-full"
        placeholder="Tuition Fee"
        onChange={(e) => handleChange('feeDetails', 'tuitionFee', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Paid Amount"
        onChange={(e) => handleChange('feeDetails', 'paidAmount', e.target.value)}
      />

      <h3 className="text-md font-semibold">Course Details</h3>
      <input
        className="border p-2 w-full"
        placeholder="Country"
        onChange={(e) => handleChange('courseDetails', 'country', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Institute"
        onChange={(e) => handleChange('courseDetails', 'institute', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Course"
        onChange={(e) => handleChange('courseDetails', 'course', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Intake Month"
        onChange={(e) => handleChange('courseDetails', 'intakeMonth', e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Intake Year"
        onChange={(e) => handleChange('courseDetails', 'intakeYear', e.target.value)}
      />

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Submit Application
      </button>
    </form>
  );
}
