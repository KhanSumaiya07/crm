"use client"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter, useParams } from "next/navigation"
import { User, GraduationCap, Phone, MapPin, ArrowLeft } from "lucide-react"
import InfoCard from "../../../../components/dashboard/infoCard/infoCard"
import InputField from "../../../../components/ui/inputField"
import DashboardHeader from "../../../../components/ui/dashboardHeader"
import StepProgress from "../../../../components/ui/step-progress"
import ValidationModal from "../../../../components/ui/validation-modal"
import { fetchSingleLead, updateLead, clearSingleLead } from "../../../../../store/leadsSlice"
import styles from "../../add/style.module.css"

const steps = [
  { id: 1, title: "Personal Information", status: "current" },
  { id: 2, title: "Study Preferences", status: "pending" },
  { id: 3, title: "Follow-up Info", status: "pending" },
]

export default function EditLeadPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const { singleLead, singleLeadLoading, updateLoading, error } = useSelector((state) => state.leads)

  const [currentStep, setCurrentStep] = useState(1)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [formData, setFormData] = useState({
    fullname: "",
    DOB: "",
    gender: "",
    email: "",
    phone: "",
    countryofresidence: "",
    qualification: "",
    passOutyear: "",
    percentage: "",
    sourceOfLeads: "",
    preferencecountry: "",
    prefferredcourse: "",
    intake: "",
    score: "",
    budget: "",
    followUps: [{
      leadType: "",
      date: "",
      time: "",
      mode: "",
      status: "New",
      remark: "",
    }],
  })

  useEffect(() => {
    if (params.id) dispatch(fetchSingleLead(params.id))
    return () => dispatch(clearSingleLead())
  }, [dispatch, params.id])

  useEffect(() => {
    if (singleLead) {
      setFormData({
        fullname: singleLead.fullname || "",
        DOB: singleLead.DOB || "",
        gender: singleLead.gender || "",
        email: singleLead.email || "",
        phone: singleLead.phone || "",
        countryofresidence: singleLead.countryofresidence || "",
        qualification: singleLead.qualification || "",
        passOutyear: singleLead.passOutyear || "",
        percentage: singleLead.percentage || "",
        sourceOfLeads: singleLead.sourceOfLeads || "",
        preferencecountry: singleLead.preferencecountry || "",
        prefferredcourse: singleLead.prefferredcourse || "",
        intake: singleLead.intake || "",
        score: singleLead.score || "",
        budget: singleLead.budget || "",
        followUps: singleLead.followUps?.length
          ? singleLead.followUps
          : [{
              leadType: "",
              date: "",
              time: "",
              mode: "",
              status: "New",
              remark: "",
            }],
      })
    }
  }, [singleLead])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validatePersonalInformation = () => {
    const requiredFields = ["fullname", "phone"]
    return requiredFields.every((field) => formData[field]?.trim())
  }

  const validateStudyPreferences = () => {
    const requiredFields = ["preferencecountry"]
    return requiredFields.every((field) => formData[field]?.trim())
  }

  const validateFollowUpInfo = () => {
    const followUp = formData.followUps?.[0] || {}
    const requiredFields = ["leadType", "mode", "status", "remark"]
    return requiredFields.every((field) => followUp[field]?.trim())
  }

  const handleNext = () => {
    const isValid = currentStep === 1
      ? validatePersonalInformation()
      : currentStep === 2
        ? validateStudyPreferences()
        : validateFollowUpInfo()

    if (!isValid) return setShowValidationModal(true)
    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }

  const handleStepClick = (stepId) => {
    if (stepId > currentStep) {
      const isValid = currentStep === 1
        ? validatePersonalInformation()
        : currentStep === 2
          ? validateStudyPreferences()
          : validateFollowUpInfo()

      if (!isValid) return setShowValidationModal(true)
    }
    setCurrentStep(stepId)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
    else router.back()
  }

  const handleFinalSubmit = async () => {
    if (!validateFollowUpInfo()) return setShowValidationModal(true)
    try {
      const resultAction = await dispatch(updateLead({ id: params.id, data: formData }))
      if (updateLead.fulfilled.match(resultAction)) {
        alert("Lead updated successfully")
        router.back()
      } else {
        alert("Failed to update lead")
      }
    } catch (err) {
      console.error(err)
      alert("Error occurred while updating")
    }
  }

  if (singleLeadLoading) return (
    <div className={styles.container}>
      <DashboardHeader title="Edit Lead" subtitle="Loading lead details..." />
      <div className={styles.addLeadPage}><div className={styles.loading}>Loading...</div></div>
    </div>
  )

  if (error) return (
    <div className={styles.container}>
      <DashboardHeader title="Edit Lead" subtitle="Error loading lead details" />
      <div className={styles.addLeadPage}><div className={styles.error}>Error: {error}</div></div>
    </div>
  )

  const renderStep1 = () => (
    <>
      <InfoCard title="Personal Information" icon={User} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField label="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} required />
          <InputField label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} />
          <InputField label="Gender" name="gender" type="select" value={formData.gender} onChange={handleChange}
            options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }]} />
        </div>
      </InfoCard>
      <InfoCard title="Contact Information" icon={MapPin} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
          <InputField label="Country of Residence" name="countryofresidence" value={formData.countryofresidence} onChange={handleChange} />
        </div>
      </InfoCard>
      <InfoCard title="Academic Information" icon={GraduationCap} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField label="Highest Qualification" name="qualification" type="select" value={formData.qualification} onChange={handleChange}
            options={[{ value: "12th", label: "12th" }, { value: "Diploma", label: "Diploma" }, { value: "Bachelor", label: "Bachelor's" }, { value: "Master", label: "Master" }, { value: "PhD", label: "Ph.D" }]} />
          <InputField label="Pass-out Year" name="passOutyear" type="number" value={formData.passOutyear} onChange={handleChange} />
          <InputField label="Percentage / CGPA" name="percentage" value={formData.percentage} onChange={handleChange} />
        </div>
      </InfoCard>
      <InfoCard title="Source Information" icon={User} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField label="Source of Leads" name="sourceOfLeads" type="select" value={formData.sourceOfLeads} onChange={handleChange}
            options={[{ value: "App Lead", label: "App Lead" }, { value: "Associate", label: "Associate" }, { value: "Calling", label: "Calling" }, { value: "Dubai Team-Faizan", label: "Dubai Team-Faizan" }, { value: "Dubai Team-Shilpa", label: "Dubai Team-Shilpa" }, { value: "FB Ads", label: "FB Ads" }, { value: "Message", label: "Message" }, { value: "Others", label: "Others" }, { value: "Reference", label: "Reference" }, { value: "Seminar", label: "Seminar" }, { value: "Social Media", label: "Social Media" }, { value: "Walk In", label: "Walk In" }, { value: "Website", label: "Website" }]} />
        </div>
      </InfoCard>
    </>
  )

  const renderStep2 = () => (
    <InfoCard title="Study Preferences" icon={GraduationCap} showEditButton={false}>
      <div className={styles.formGrid}>
        <InputField label="Preferred Country" name="preferencecountry" value={formData.preferencecountry} onChange={handleChange} required />
        <InputField label="Preferred Course" name="prefferredcourse" value={formData.prefferredcourse} onChange={handleChange} />
        <InputField label="Intake" name="intake" value={formData.intake} onChange={handleChange} />
        <InputField label="IELTS/TOEFL Score" name="score" value={formData.score} onChange={handleChange} />
        <InputField label="Budget" name="budget" value={formData.budget} onChange={handleChange} />
      </div>
    </InfoCard>
  )

  const renderStep3 = () => {
    const followUp = formData.followUps?.[0] || {
      leadType: "",
      date: "",
      time: "",
      mode: "",
      status: "New",
      remark: "",
    }

    return (
      <InfoCard title="Follow-up Information" icon={Phone} showEditButton={false}>
        <div className={styles.formGridTwo}>
          {["date", "time", "leadType", "mode", "status", "remark"].map((field) => (
            <InputField
              key={field}
              label={field === "remark" ? "Remarks" : field.replace(/^\w/, (c) => c.toUpperCase())}
              name={field}
              type={field === "date" ? "date" : field === "time" ? "time" : field === "remark" ? "text" : "select"}
              value={followUp[field] || ""}
              onChange={(e) => {
                const updated = [...formData.followUps]
                if (!updated[0]) updated[0] = {}
                updated[0][field] = e.target.value
                setFormData({ ...formData, followUps: updated })
              }}
              required={["leadType", "mode", "status", "remark", "date"].includes(field)}
              options={
                field === "leadType"
                  ? ["Cold", "Completed", "Failed", "Future Lead", "Hot", "Medium", "Not Responding"].map((v) => ({ value: v, label: v }))
                  : field === "mode"
                    ? ["BBM", "Email", "Google Meet", "Meeting", "Phone", "Skype", "We Chat", "Whatsapp", "Zoom"].map((v) => ({ value: v, label: v }))
                    : field === "status"
                      ? ["New", "In Process", "Completed", "Future Lead", "Not responding", "Failed"].map((v) => ({ value: v, label: v }))
                      : undefined
              }
            />
          ))}
        </div>
      </InfoCard>
    )
  }

  return (
    <div className={styles.container}>
      <DashboardHeader title="Edit Lead" subtitle="Update student information and lead details." />
      <div className={styles.addLeadPage}>
        <div className={styles.headerActions}>
          <button onClick={handleBack} className={styles.buttonSecondary}><ArrowLeft className="w-4 h-4" />Back</button>
        </div>

        <StepProgress
          steps={steps.map((step, idx) => ({
            ...step,
            status: idx + 1 < currentStep ? "complete" : idx + 1 === currentStep ? "current" : "pending",
          }))}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.content}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          <div className={styles.navigation}>
            <button type="button" onClick={handleBack} disabled={currentStep === 1} className={styles.buttonSecondary}>Back</button>
            {currentStep < steps.length ? (
              <button type="button" onClick={handleNext} className={styles.buttonPrimary}>Next</button>
            ) : (
              <button type="button" onClick={handleFinalSubmit} className={styles.buttonPrimary} disabled={updateLoading}>
                {updateLoading ? "Updating..." : "Update Lead"}
              </button>
            )}
          </div>
        </form>

        <ValidationModal isOpen={showValidationModal} onClose={() => setShowValidationModal(false)} />
      </div>
    </div>
  )
}
