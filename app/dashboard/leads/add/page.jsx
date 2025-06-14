"use client"

import { useState } from "react"
import { User, GraduationCap, Phone, MapPin } from "lucide-react"
import InfoCard from "../../../components/dashboard/infoCard/infoCard"
import InputField from "../../../components/ui/inputField"
import DashboardHeader from "../../../components/ui/dashboardHeader"
import StepProgress from "../../../components/ui/step-progress"
import styles from "./style.module.css"

const steps = [
  { id: 1, title: "Personal Information", status: "complete" },
  { id: 2, title: "Study Preferences", status: "current" },
  { id: 3, title: "Follow-up Info", status: "pending" },
]

export default function AddLeadForm() {
  const [currentStep, setCurrentStep] = useState(2)
  const [formData, setFormData] = useState({
    // Personal Information
    fullname: "",
    DOB: "",
    gender: "",
    email: "",
    phone: "",
    countryofresidence: "",
    highestQualification: "",
    passoutYear: "",
    academicScore: "",

    // Study Preferences
    preferredCountry: "",
    preferredCourse: "",
    intake: "",
    qualification: "",
    ieltsScore: "",
    budget: "",

    // Follow-up Info
    followupDate: "",
    notes: "",
    priority: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId)
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderPersonalInformation = () => (
    <>
      <InfoCard title="Personal Information" icon={User}>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <InputField
              label="Full Name"
              name="fullname"
              placeholder="Enter full name"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formField}>
            <InputField label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} />
          </div>
          <div className={styles.formField}>
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

      <InfoCard title="Contact Information" icon={MapPin}>
        <div className={styles.formGridTwo}>
          <div className={styles.formField}>
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </div>
          <div className={styles.formField}>
            <InputField
              label="Phone Number"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
          <div className={styles.formFieldFull}>
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

      <InfoCard title="Academic Information" icon={GraduationCap}>
        <div className={styles.formGridTwo}>
          <div className={styles.formField}>
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
          <div className={styles.formField}>
            <InputField
              label="Pass-out Year"
              name="passoutYear"
              type="number"
              value={formData.passoutYear}
              onChange={handleChange}
              placeholder="e.g. 2023"
            />
          </div>
          <div className={styles.formField}>
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
    </>
  )

  const renderStudyPreferences = () => (
    <InfoCard title="Study Preferences" icon={GraduationCap}>
      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <InputField
            label="Preferred Country"
            name="preferredCountry"
            placeholder="Enter preferred country"
            value={formData.preferredCountry}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formField}>
          <InputField
            label="Preferred Course"
            name="preferredCourse"
            placeholder="Enter preferred course"
            value={formData.preferredCourse}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formField}>
          <InputField
            label="Intake"
            name="intake"
            placeholder="Enter intake period"
            value={formData.intake}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formField}>
          <InputField
            label="Qualification"
            name="qualification"
            placeholder="Enter qualification"
            value={formData.qualification}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formField}>
          <InputField
            label="IELTS/TOEFL Score"
            name="ieltsScore"
            placeholder="Enter test score"
            value={formData.ieltsScore}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formField}>
          <InputField
            label="Budget"
            name="budget"
            placeholder="Budget (in ₹ / USD)"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>
      </div>
    </InfoCard>
  )

  const renderFollowUpInfo = () => (
    <InfoCard title="Follow-up Information" icon={Phone}>
      <div className={styles.formGridTwo}>
        <div className={styles.formField}>
          <InputField
            label="Follow-up Date"
            name="followupDate"
            type="date"
            value={formData.followupDate}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formField}>
          <InputField
            label="Priority"
            name="priority"
            type="select"
            placeholder="Select priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
          />
        </div>
        <div className={styles.formFieldFull}>
          <InputField
            label="Notes"
            name="notes"
            placeholder="Add any additional notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
      </div>
    </InfoCard>
  )

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInformation()
      case 2:
        return renderStudyPreferences()
      case 3:
        return renderFollowUpInfo()
      default:
        return renderPersonalInformation()
    }
  }

  return (
    <div className={styles.container}>
      <DashboardHeader title="Add Lead" subtitle="Enter student info to create a new lead." />

      <StepProgress
        steps={steps.map((step) => ({
          ...step,
          status: step.id < currentStep ? "complete" : step.id === currentStep ? "current" : "pending",
        }))}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      <div className={styles.content}>{getCurrentStepContent()}</div>

      <div className={styles.navigation}>
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
