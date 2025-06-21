"use client"
import { useState } from "react"
import { User, GraduationCap, Phone, MapPin } from "lucide-react"
import InfoCard from "../../../components/dashboard/infoCard/infoCard"
import InputField from "../../../components/ui/inputField"
import DashboardHeader from "../../../components/ui/dashboardHeader"
import StepProgress from "../../../components/ui/step-progress"
import ValidationModal from "../../../components/ui/validation-modal"
import styles from "./style.module.css"

const steps = [
  { id: 1, title: "Personal Information", status: "current" },
  { id: 2, title: "Study Preferences", status: "pending" },
  { id: 3, title: "Follow-up Info", status: "pending" },
]

const AddLead = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showValidationModal, setShowValidationModal] = useState(false)

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    DOB: "",
    gender: "",
    countryofresidence: "",
    preferencecountry: "",
    prefferredcourse: "",
    intake: "",
    percentage: "",
    qualification: "",
    score: "",
    budget: "",
    passOutyear: "",
    editRequest: "",
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

  const validatePersonalInformation = () => {
    const requiredFields = ["fullname", "phone"]
    const missingFields = requiredFields.filter((field) => !(formData[field] || "").trim())
    return missingFields.length === 0
  }

  const validateStudyPreferences = () => {
    const requiredFields = ["preferencecountry"]
    const missingFields = requiredFields.filter((field) => !(formData[field] || "").trim())
    return missingFields.length === 0
  }

  const validateFollowUpInfo = () => {
    const followUp = formData.followUps[0]
    const requiredFields = ["leadType", "mode", "status", "remark"]
    const missingFields = requiredFields.filter((field) => !(followUp[field] || "").trim())
    return missingFields.length === 0
  }

  const handleNext = () => {
    let isValid = true

    if (currentStep === 1) {
      isValid = validatePersonalInformation()
    } else if (currentStep === 2) {
      isValid = validateStudyPreferences()
    } else if (currentStep === 3) {
      isValid = validateFollowUpInfo()
    }

    if (!isValid) {
      setShowValidationModal(true)
      return
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepClick = (stepId) => {
    if (stepId > currentStep) {
      let isValid = true
      if (currentStep === 1) isValid = validatePersonalInformation()
      else if (currentStep === 2) isValid = validateStudyPreferences()
      else if (currentStep === 3) isValid = validateFollowUpInfo()

      if (!isValid) {
        setShowValidationModal(true)
        return
      }
    }
    setCurrentStep(stepId)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinalSubmit = async () => {
    if (currentStep === 3) {
      if (!validateFollowUpInfo()) {
        setShowValidationModal(true)
        return
      }

      try {
        const res = await fetch("/api/leads/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        const result = await res.json()
        if (res.ok) {
          alert("Lead added successfully")
          setFormData({
            fullname: "",
            email: "",
            phone: "",
            DOB: "",
            gender: "",
            countryofresidence: "",
            preferencecountry: "",
            prefferredcourse: "",
            intake: "",
            percentage: "",
            qualification: "",
            score: "",
            budget: "",
            passOutyear: "",
            editRequest: "",
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
      <InfoCard title="Personal Information" icon={User} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField label="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} required />
          <InputField label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} />
          <InputField
            label="Gender"
            name="gender"
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

      <InfoCard title="Contact Information" icon={MapPin} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
          <InputField
            label="Country of Residence"
            name="countryofresidence"
            value={formData.countryofresidence}
            onChange={handleChange}
          />
        </div>
      </InfoCard>

      <InfoCard title="Academic Information" icon={GraduationCap} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField
            label="Highest Qualification"
            name="qualification"
            type="select"
            value={formData.qualification}
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
            name="passOutyear"
            type="number"
            value={formData.passOutyear}
            onChange={handleChange}
          />
          <InputField
            label="Percentage / CGPA"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
          />
        </div>
      </InfoCard>
    </>
  )

  const renderStep2 = () => (
    <InfoCard title="Study Preferences" icon={GraduationCap} showEditButton={false}>
      <div className={styles.formGrid}>
        <InputField
          label="Preferred Country"
          name="preferencecountry"
          value={formData.preferencecountry}
          onChange={handleChange}
          required
        />
        <InputField
          label="Preferred Course"
          name="prefferredcourse"
          value={formData.prefferredcourse}
          onChange={handleChange}
        />
        <InputField label="Intake" name="intake" value={formData.intake} onChange={handleChange} />
        <InputField label="IELTS/TOEFL Score" name="score" value={formData.score} onChange={handleChange} />
        <InputField label="Budget" name="budget" value={formData.budget} onChange={handleChange} />
      </div>
    </InfoCard>
  )

  const renderStep3 = () => (
    <InfoCard title="Follow-up Information" icon={Phone} showEditButton={false}>
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
            { value: "Cold", label: "Cold" },
            { value: "Completed", label: "Completed" },
            { value: "Failed", label: "Failed" },
            { value: "Future Lead", label: "Future Lead" },
            { value: "Hot", label: "Hot" },
            { value: "Medium", label: "Medium" },
            { value: "Not Responding", label: "Not Responding" },
          ]}
        />
        <InputField
          label="Follow-up Mode"
          name="mode"
          type="select"
          value={formData.followUps[0].mode}
          onChange={(e) => {
            const newFollowUps = [...formData.followUps]
            newFollowUps[0].mode = e.target.value
            setFormData({ ...formData, followUps: newFollowUps })
          }}
          options={[
            { value: "BBM", label: "BBM" },
            { value: "Email", label: "Email" },
            { value: "Google Meet", label: "Google Meet" },
            { value: "Meeting", label: "Meeting" },
            { value: "Phone", label: "Phone" },
            { value: "Skype", label: "Skype" },
            { value: "We Chat", label: "We Chat" },
            { value: "Whatsapp", label: "Whatsapp" },
            { value: "Zoom", label: "Zoom" },
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

  return (
    <div className={styles.container}>
      <DashboardHeader title="Add Lead" subtitle="Enter student info to create a new lead." />
      <div className={styles.addLeadPage}>
        <StepProgress
          steps={steps.map((step, index) => ({
            ...step,
            status: index + 1 < currentStep ? "complete" : index + 1 === currentStep ? "current" : "pending",
          }))}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.content}>{[renderStep1, renderStep2, renderStep3][currentStep - 1]()}</div>
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
        <ValidationModal isOpen={showValidationModal} onClose={() => setShowValidationModal(false)} />
      </div>
    </div>
  )
}

export default AddLead
