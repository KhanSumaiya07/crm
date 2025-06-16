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

const AddLead = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
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
    ieltsScore: "",
    budget: "",

    // Follow-up Info
    followUps: [
      {
        leadType: "",
        date: "",
        time: "",
        mode: "",
        status: "New",
        remark: "",
      },
    ],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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

 

  // Add a separate handler for the Submit Lead button
  const handleFinalSubmit = async () => {
    if (currentStep === 3) {
      console.log("Submit Lead button clicked - proceeding with submission")

      try {
        const res = await fetch("/api/leads/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        const result = await res.json()
        console.log("API Response:", result)

        if (res.ok) {
          alert("Lead added successfully")
          // Reset form
          setFormData({
            fullname: "",
            DOB: "",
            gender: "",
            email: "",
            phone: "",
            countryofresidence: "",
            highestQualification: "",
            passoutYear: "",
            academicScore: "",
            preferredCountry: "",
            preferredCourse: "",
            intake: "",
            ieltsScore: "",
            budget: "",
            followUps: [
              {
                leadType: "",
                date: "",
                time: "",
                mode: "",
                status: "New",
                remark: "",
              },
            ],
          })
          setCurrentStep(1)
        } else {
          alert(result.error || "Something went wrong")
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        alert("An error occurred while submitting the form")
      }
    }
  }

  const renderStep1 = () => (
    <>
      <InfoCard title="Personal Information" icon={User}>
        <div className={styles.formGrid}>
          <InputField
            label="Full Name"
            placeholder="Enter full name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          <InputField label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} />
          <InputField
            label="Gender"
            name="gender"
            placeholder="Select gender"
            type="select"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
          />
        </div>
      </InfoCard>

      <InfoCard title="Contact Information" icon={MapPin}>
        <div className={styles.formGrid}>
          <InputField
            label="Email"
            name="email"
            placeholder="Enter email address"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Phone Number"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          <InputField
            label="Country of Residence"
            name="countryofresidence"
            placeholder="Enter country of residence"
            value={formData.countryofresidence}
            onChange={handleChange}
          />
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
              { value: "12th", label: "12th" },
              { value: "Diploma", label: "Diploma" },
              { value: "Bachelor", label: "Bachelor's" },
              { value: "Master", label: "Master" },
              { value: "PhD", label: "Ph.D" },
            ]}
          />
          <InputField
            label="Pass-out Year"
            name="passoutYear"
            placeholder="e.g. 2023"
            type="number"
            value={formData.passoutYear}
            onChange={handleChange}
          />
          <InputField
            label="Percentage / CGPA"
            name="academicScore"
            placeholder="e.g. 82.5% or 8.2 CGPA"
            value={formData.academicScore}
            onChange={handleChange}
          />
        </div>
      </InfoCard>
    </>
  )

  const renderStep2 = () => (
    <InfoCard title="Study Preferences" icon={GraduationCap}>
      <div className={styles.formGrid}>
        <InputField
          label="Preferred Country"
          placeholder="Enter preferred country"
          name="preferredCountry"
          value={formData.preferredCountry}
          onChange={handleChange}
        />
        <InputField
          label="Preferred Course"
          placeholder="Enter preferred course"
          name="preferredCourse"
          value={formData.preferredCourse}
          onChange={handleChange}
        />
        <InputField
          label="Intake"
          name="intake"
          placeholder="Enter intake period"
          value={formData.intake}
          onChange={handleChange}
        />
        <InputField
          label="IELTS/TOEFL Score"
          name="ieltsScore"
          placeholder="Enter test score"
          value={formData.ieltsScore}
          onChange={handleChange}
        />
        <InputField
          label="Budget"
          name="budget"
          placeholder="Budget (in ₹ / USD)"
          value={formData.budget}
          onChange={handleChange}
        />
      </div>
    </InfoCard>
  )

  const renderStep3 = () => (
    <InfoCard title="Follow-up Information" icon={Phone}>
      <div className={styles.formGridTwo}>
        <InputField
          label="Follow-up Date"
          name="date"
          type="date"
          value={formData.followUps[0].date}
          onChange={(e) => {
            const newFollowUps = [...formData.followUps]
            newFollowUps[0].date = e.target.value
            setFormData({ ...formData, followUps: newFollowUps })
          }}
        />

        <InputField
          label="Follow-up Time"
          name="time"
          type="time"
          value={formData.followUps[0].time}
          onChange={(e) => {
            const newFollowUps = [...formData.followUps]
            newFollowUps[0].time = e.target.value
            setFormData({ ...formData, followUps: newFollowUps })
          }}
        />

        <InputField
          label="Lead Type"
          name="leadType"
          type="select"
          value={formData.followUps[0].leadType}
          onChange={(e) => {
            const newFollowUps = [...formData.followUps]
            newFollowUps[0].leadType = e.target.value
            setFormData({ ...formData, followUps: newFollowUps })
          }}
          options={[
            { value: "Hot", label: "Hot" },
            { value: "Warm", label: "Warm" },
            { value: "Cold", label: "Cold" },
          ]}
        />

        <InputField
          label="Mode"
          name="mode"
          type="select"
          value={formData.followUps[0].mode}
          onChange={(e) => {
            const newFollowUps = [...formData.followUps]
            newFollowUps[0].mode = e.target.value
            setFormData({ ...formData, followUps: newFollowUps })
          }}
          options={[
            { value: "Call", label: "Call" },
            { value: "Email", label: "Email" },
            { value: "WhatsApp", label: "WhatsApp" },
            { value: "In-person", label: "In-person" },
          ]}
        />

        <InputField
          label="Status"
          name="status"
          type="select"
          value={formData.followUps[0].status}
          onChange={(e) => {
            const newFollowUps = [...formData.followUps]
            newFollowUps[0].status = e.target.value
            setFormData({ ...formData, followUps: newFollowUps })
          }}
          options={[
            { value: "New", label: "New" },
            { value: "In Process", label: "In Process" },
            { value: "Completed", label: "Completed" },
            { value: "Future Lead", label: "Future Lead" },
            { value: "Not responding", label: "Not Responding" },
            { value: "Failed", label: "Failed" },
          ]}
        />

        <InputField
          label="Remarks"
          name="remark"
          placeholder="Enter any additional remarks"
          value={formData.followUps[0].remark}
          onChange={(e) => {
            const newFollowUps = [...formData.followUps]
            newFollowUps[0].remark = e.target.value
            setFormData({ ...formData, followUps: newFollowUps })
          }}
        />
      </div>
    </InfoCard>
  )

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <DashboardHeader title="Add Lead" subtitle="Enter student info to create a new lead." />

      <StepProgress
        steps={steps.map((step, index) => ({
          ...step,
          status: index + 1 < currentStep ? "complete" : index + 1 === currentStep ? "current" : "pending",
        }))}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.content}>{getCurrentStepContent()}</div>

        <div className={styles.navigation}>
          <button type="button" onClick={handleBack} disabled={currentStep === 1} className={styles.buttonSecondary}>
            Back
          </button>

          {currentStep < steps.length ? (
            <button type="button" onClick={handleNext} className={styles.buttonPrimary}>
              Next
            </button>
          ) : (
            <button type="button" onClick={handleFinalSubmit} className={styles.buttonPrimary}>
              Submit Lead
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddLead
