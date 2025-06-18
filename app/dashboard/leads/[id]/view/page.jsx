"use client"
import { useState } from "react"
import { User, GraduationCap, Phone, MapPin, ArrowLeft, Edit, Save, X, Calendar, Plus } from "lucide-react"
import InputField from "../../../../components/ui/inputField"
import StepProgress from "../../../../components/ui/step-progress"
import InfoCard from "../../../../components/dashboard/infoCard/infoCard"
import DashboardHeader from "../../../../components/ui/dashboardHeader"
import styles from "../../add/style.module.css"

// Mock data
const initialLeadData = {
  id: "1",
  fullname: "Sumaiya Khan",
  DOB: "1998-05-15",
  gender: "Female",
  email: "eng.sumaiyakhan1234@gmail.com",
  phone: "8305260165",
  countryofresidence: "India",
  highestQualification: "Bachelor",
  passoutYear: "2020",
  academicScore: "82.5%",
  sourceOfLeads: "Website",
  preferredCountry: "Canada",
  preferredCourse: "Computer Science",
  intake: "Fall 2024",
  ieltsScore: "7.0",
  budget: "₹25,00,000",
  status: "NEW",
  applicationGenerated: "NOT GENERATED",
  leadDate: "16/06/2025",
  assignDate: "-",
  followUps: [
    {
      id: 1,
      leadType: "Hot",
      date: "2024-06-20",
      time: "10:00",
      mode: "Phone",
      status: "New",
      remark: "Initial contact made, student very interested in Canadian universities",
      createdAt: "2024-06-18",
    },
    {
      id: 2,
      leadType: "Medium",
      date: "2024-06-22",
      time: "14:30",
      mode: "Email",
      status: "In Process",
      remark: "Sent university brochures and course details",
      createdAt: "2024-06-20",
    },
  ],
}

const ViewEditLead = () => {
  const [leadData, setLeadData] = useState(initialLeadData)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(initialLeadData)
  const [currentStep, setCurrentStep] = useState(1)

  // Validation functions for step completion
  const isPersonalInfoComplete = (data) => {
    const requiredFields = ["fullname", "phone"]
    const optionalFields = [
      "DOB",
      "gender",
      "email",
      "countryofresidence",
      "highestQualification",
      "passoutYear",
      "academicScore",
      "sourceOfLeads",
    ]

    // Check if all required fields are filled
    const requiredFilled = requiredFields.every((field) => data[field] && data[field].trim() !== "")

    // Check if at least some optional fields are filled (you can adjust this logic)
    const optionalFilled = optionalFields.some((field) => data[field] && data[field].trim() !== "")

    return requiredFilled && optionalFilled
  }

  const isStudyPreferencesComplete = (data) => {
    const fields = ["preferredCountry", "preferredCourse", "intake", "ieltsScore", "budget"]

    // Check if at least 3 out of 5 fields are filled (you can adjust this logic)
    const filledCount = fields.filter((field) => data[field] && data[field].trim() !== "").length

    return filledCount >= 3
  }

  const isFollowUpComplete = (data) => {
    if (!data.followUps || data.followUps.length === 0) return false

    const followUp = data.followUps[0]
    const requiredFields = ["leadType", "mode", "status", "remark"]

    return requiredFields.every((field) => followUp[field] && followUp[field].trim() !== "")
  }

  // Function to get dynamic steps based on current data
  const getDynamicSteps = (data, currentStep) => {
    return [
      {
        id: 1,
        title: "Personal Information",
        status: isPersonalInfoComplete(data) ? "complete" : currentStep === 1 ? "current" : "pending",
      },
      {
        id: 2,
        title: "Study Preferences",
        status: isStudyPreferencesComplete(data) ? "complete" : currentStep === 2 ? "current" : "pending",
      },
      {
        id: 3,
        title: "Follow-up Info",
        status: isFollowUpComplete(data) ? "complete" : currentStep === 3 ? "current" : "pending",
      },
    ]
  }

  const handleBack = () => {
    console.log("Navigate back to leads list")
  }

  const handleEdit = () => {
    setEditData({ ...leadData })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditData({ ...leadData })
    setIsEditing(false)
  }

  const handleSave = () => {
    setLeadData({ ...editData })
    setIsEditing(false)
    alert("Lead updated successfully!")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFollowUpChange = (index, field, value) => {
    const newFollowUps = [...editData.followUps]
    newFollowUps[index] = { ...newFollowUps[index], [field]: value }
    setEditData({ ...editData, followUps: newFollowUps })
  }

  const addNewFollowUp = () => {
    const newFollowUp = {
      id: Date.now(),
      leadType: "",
      date: "",
      time: "",
      mode: "",
      status: "New",
      remark: "",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setEditData({
      ...editData,
      followUps: [...editData.followUps, newFollowUp],
    })
  }

  const removeFollowUp = (index) => {
    const newFollowUps = editData.followUps.filter((_, i) => i !== index)
    setEditData({ ...editData, followUps: newFollowUps })
  }

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId)
  }

  const currentData = isEditing ? editData : leadData

  const renderStep1 = () => (
    <>
      <InfoCard title="Personal Information" icon={User} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField
            label="Full Name"
            placeholder="Enter full name"
            name="fullname"
            value={currentData.fullname}
            onChange={handleChange}
            required={true}
            isView={!isEditing}
          />
          <InputField
            label="Date of Birth"
            name="DOB"
            type="date"
            value={currentData.DOB}
            onChange={handleChange}
            isView={!isEditing}
          />
          <InputField
            label="Gender"
            name="gender"
            placeholder="Select gender"
            type="select"
            value={currentData.gender}
            onChange={handleChange}
            isView={!isEditing}
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
          <InputField
            label="Email"
            name="email"
            placeholder="Enter email address"
            type="email"
            value={currentData.email}
            onChange={handleChange}
            isView={!isEditing}
          />
          <InputField
            label="Phone Number"
            name="phone"
            placeholder="Enter phone number"
            value={currentData.phone}
            onChange={handleChange}
            required={true}
            isView={!isEditing}
          />
          <InputField
            label="Country of Residence"
            name="countryofresidence"
            placeholder="Enter country of residence"
            value={currentData.countryofresidence}
            onChange={handleChange}
            isView={!isEditing}
          />
        </div>
      </InfoCard>

      <InfoCard title="Academic Information" icon={GraduationCap} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField
            label="Highest Qualification"
            name="highestQualification"
            type="select"
            value={currentData.highestQualification}
            placeholder="Select qualification"
            onChange={handleChange}
            isView={!isEditing}
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
            value={currentData.passoutYear}
            onChange={handleChange}
            isView={!isEditing}
          />
          <InputField
            label="Percentage / CGPA"
            name="academicScore"
            placeholder="e.g. 82.5% or 8.2 CGPA"
            value={currentData.academicScore}
            onChange={handleChange}
            isView={!isEditing}
          />
        </div>
      </InfoCard>

      <InfoCard title="Source Information" icon={User} showEditButton={false}>
        <div className={styles.formGrid}>
          <InputField
            label="Source of Leads"
            name="sourceOfLeads"
            type="select"
            value={currentData.sourceOfLeads}
            placeholder="Select Source"
            onChange={handleChange}
            required={true}
            isView={!isEditing}
            options={[
              { value: "App Lead", label: "App Lead" },
              { value: "Associate", label: "Associate" },
              { value: "Calling", label: "Calling" },
              { value: "Dubai Team-Faizan", label: "Dubai Team-Shilpa" },
              { value: "FB Ads", label: "FB Ads" },
              { value: "Message", label: "Message" },
              { value: "Others", label: "Others" },
              { value: "Reference", label: "Reference" },
              { value: "Seminar", label: "Seminar" },
              { value: "Social Media", label: "Social Media" },
              { value: "Walk In", label: "Walk In" },
              { value: "Website", label: "Website" },
            ]}
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
          placeholder="Enter preferred country"
          name="preferredCountry"
          value={currentData.preferredCountry}
          onChange={handleChange}
          required={true}
          isView={!isEditing}
        />
        <InputField
          label="Preferred Course"
          placeholder="Enter preferred course"
          name="preferredCourse"
          value={currentData.preferredCourse}
          onChange={handleChange}
          isView={!isEditing}
        />
        <InputField
          label="Intake"
          name="intake"
          placeholder="Enter intake period"
          value={currentData.intake}
          onChange={handleChange}
          isView={!isEditing}
        />
        <InputField
          label="IELTS/TOEFL Score"
          name="ieltsScore"
          placeholder="Enter test score"
          value={currentData.ieltsScore}
          onChange={handleChange}
          isView={!isEditing}
        />
        <InputField
          label="Budget"
          name="budget"
          placeholder="Budget (in ₹ / USD)"
          value={currentData.budget}
          onChange={handleChange}
          isView={!isEditing}
        />
      </div>
    </InfoCard>
  )

  const renderStep3 = () => (
    <>
      <InfoCard title="Follow-up Information" icon={Phone} showEditButton={false}>
        {isEditing ? (
          <div className={styles.followUpEdit}>
            {editData.followUps.map((followUp, index) => (
              <div key={followUp.id} className={styles.followUpEditItem}>
                <div className={styles.followUpEditHeader}>
                  <h4>Follow-up #{index + 1}</h4>
                  {editData.followUps.length > 1 && (
                    <button type="button" onClick={() => removeFollowUp(index)} className={styles.removeButton}>
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className={styles.formGridTwo}>
                  <InputField
                    label="Follow-up Date"
                    type="date"
                    value={followUp.date}
                    onChange={(e) => handleFollowUpChange(index, "date", e.target.value)}
                  />
                  <InputField
                    label="Follow-up Time"
                    type="time"
                    value={followUp.time}
                    onChange={(e) => handleFollowUpChange(index, "time", e.target.value)}
                  />
                  <InputField
                    label="Lead Type"
                    type="select"
                    value={followUp.leadType}
                    onChange={(e) => handleFollowUpChange(index, "leadType", e.target.value)}
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
                    label="Follow Up Mode"
                    type="select"
                    value={followUp.mode}
                    onChange={(e) => handleFollowUpChange(index, "mode", e.target.value)}
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
                    type="select"
                    value={followUp.status}
                    onChange={(e) => handleFollowUpChange(index, "status", e.target.value)}
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
                    value={followUp.remark}
                    onChange={(e) => handleFollowUpChange(index, "remark", e.target.value)}
                    placeholder="Enter any additional remarks"
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addNewFollowUp} className={styles.addFollowUpButton}>
              <Plus size={16} style={{ marginRight: "8px" }} />
              Add New Follow-up
            </button>
          </div>
        ) : (
          <div className={styles.followUpHistory}>
            {currentData.followUps && currentData.followUps.length > 0 ? (
              currentData.followUps.map((followUp, index) => (
                <div key={followUp.id || index} className={styles.followUpItem}>
                  <div className={styles.followUpHeader}>
                    <div className={styles.followUpDate}>
                      <Calendar size={16} />
                      {followUp.date ? new Date(followUp.date).toLocaleDateString() : "-"}
                      {followUp.time && ` at ${followUp.time}`}
                    </div>
                    <div className={styles.followUpBadges}>
                      <span className={`${styles.badge} ${styles.leadType}`}>{followUp.leadType}</span>
                      <span className={`${styles.badge} ${styles.mode}`}>{followUp.mode}</span>
                      <span className={`${styles.badge} ${styles.status}`}>{followUp.status}</span>
                    </div>
                  </div>
                  <div className={styles.followUpRemark}>
                    <strong>Remarks:</strong> {followUp.remark || "No remarks added"}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noFollowUps}>No follow-ups recorded yet</div>
            )}
          </div>
        )}
      </InfoCard>
    </>
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

  const steps = getDynamicSteps(currentData, currentStep)

  return (
    <div className={styles.container}>
      
      <DashboardHeader
        title={`${isEditing ? "Edit" : "View"} Lead - ${currentData.fullname}`}
        subtitle={isEditing ? "Edit student lead information" : "View and manage student lead information"}
      />
 {/* Header Actions */}
        <div className={styles.headerActions}>
          <button onClick={handleBack} className={styles.buttonSecondary}>
            <ArrowLeft size={16} />
            Back to Leads
          </button>
          <div className={styles.actionButtons}>
            {isEditing ? (
              <>
                <button onClick={handleCancel} className={styles.buttonSecondary}>
                  <X size={16} />
                  Cancel
                </button>
                <button onClick={handleSave} className={styles.buttonPrimary}>
                  <Save size={16} />
                  Save Changes
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className={styles.buttonPrimary}>
                <Edit size={16} />
                Edit Lead
              </button>
            )}
          </div>
        </div>

         {/* Status Overview */}
        <div className={styles.statusOverview}>
          <div className={styles.statusCard}>
            <div className={styles.statusLabel}>Lead Status</div>
            <div className={styles.statusValue}>
              <span className={styles.statusBadge}>{currentData.status}</span>
            </div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusLabel}>Application Status</div>
            <div className={styles.statusValue}>
              <span className={styles.appStatusBadge}>{currentData.applicationGenerated}</span>
            </div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusLabel}>Lead Date</div>
            <div className={styles.statusValue}>{currentData.leadDate}</div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusLabel}>Assign Date</div>
            <div className={styles.statusValue}>{currentData.assignDate}</div>
          </div>
        </div>

      <div className={styles.addLeadPage}>
       

       
        <StepProgress
          steps={getDynamicSteps(currentData, currentStep)}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.content}>{getCurrentStepContent()}</div>

          <div className={styles.navigation}>
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={styles.buttonSecondary}
            >
              Back
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                className={styles.buttonPrimary}
              >
                Next
              </button>
            ) : (
              <button type="button" onClick={handleSave} className={styles.buttonPrimary}>
                {isEditing ? "Save Changes" : "Complete"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ViewEditLead
