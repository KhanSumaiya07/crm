"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { User, GraduationCap, Phone, MapPin, ArrowLeft, Calendar ,Trash2} from "lucide-react"
import InputField from "../../../../components/ui/inputField"
import StepProgress from "../../../../components/ui/step-progress"
import InfoCard from "../../../../components/dashboard/infoCard/infoCard"
import DashboardHeader from "../../../../components/ui/dashboardHeader"
import styles from "../../add/style.module.css"
import { useRouter } from "next/navigation";

const ViewLead = () => {
  const [leadData, setLeadData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const leadId = params?.id || ""
  const router = useRouter();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await fetch(`/api/leads/${leadId}`)
        if (!res.ok) throw new Error("Failed to fetch lead")
        const data = await res.json()
      console.log(data)
        setLeadData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (leadId) fetchLead()
  }, [leadId])

  const handleBack = () => {
   router.push('/dashboard/leads/viewLeads')
    console.log("Navigate back to leads list")
  }

  const getDynamicSteps = () => [
    { id: 1, title: "Personal Information", status: "complete" },
    { id: 2, title: "Study Preferences", status: "complete" },
    { id: 3, title: "Follow-up Info", status: "complete" },
  ]

  const [currentStep, setCurrentStep] = useState(1)

  const renderStep1 = () => (
  <>
    <InfoCard title="Personal Information" icon={User} showEditButton={false}>
      <div className={styles.formGrid}>
        <InputField label="Full Name" name="fullname" value={leadData?.fullname || ""} isView={true} />
        <InputField label="Date of Birth" name="DOB" type="date" value={leadData?.DOB || ""} isView={true} />
        <InputField
          label="Gender"
          name="gender"
          type="select"
          value={leadData?.gender || ""}
          isView={true}
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
        <InputField label="Email" name="email" value={leadData?.email || ""} isView={true} />
        <InputField label="Phone Number" name="phone" value={leadData?.phone || ""} isView={true} />
        <InputField
          label="Country of Residence"
          name="countryofresidence"
          value={leadData?.countryofresidence || ""}
          isView={true}
        />
      </div>
    </InfoCard>

    <InfoCard title="Academic Information" icon={GraduationCap} showEditButton={false}>
      <div className={styles.formGrid}>
        <InputField
          label="Highest Qualification"
          name="qualification"
          type="select"
          value={leadData?.qualification || ""}
          isView={true}
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
          value={leadData?.passOutyear || ""}
          isView={true}
        />
        <InputField
          label="Percentage / CGPA"
          name="percentage"
          value={leadData?.percentage || ""}
          isView={true}
        />
      </div>
    </InfoCard>

    <InfoCard title="Source Information" icon={User} showEditButton={false}>
      <div className={styles.formGrid}>
        <InputField
          label="Source of Leads"
          name="sourceOfLeads"
          type="select"
          value={leadData?.sourceOfLeads || ""}
          isView={true}
          options={[
            { value: "App Lead", label: "App Lead" },
            { value: "Associate", label: "Associate" },
            { value: "Calling", label: "Calling" },
            { value: "Dubai Team-Faizan", label: "Dubai Team-Faizan" },
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
        name="preferencecountry"
        value={leadData?.preferencecountry || ""}
        isView={true}
      />
      <InputField
        label="Preferred Course"
        name="prefferredcourse"
        value={leadData?.prefferredcourse || ""}
        isView={true}
      />
      <InputField
        label="Intake"
        name="intake"
        value={leadData?.intake || ""}
        isView={true}
      />
      <InputField
        label="IELTS/TOEFL Score"
        name="score"
        value={leadData?.score || ""}
        isView={true}
      />
      <InputField
        label="Budget"
        name="budget"
        value={leadData?.budget || ""}
        isView={true}
      />
    </div>
  </InfoCard>
)

const renderStep3 = () => (
  <InfoCard title="Follow-up Information" icon={Phone} showEditButton={false}>
    <div className={styles.followUpHistory}>
      {leadData?.followUps?.length > 0 ? (
        leadData.followUps.map((followUp, index) => (
          <div key={followUp._id || index} className={styles.followUpItem}>
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

  if (loading) return <div className={styles.container}>Loading lead data...</div>
  if (error) return <div className={styles.container}>Error: {error}</div>
  if (!leadData) return <div className={styles.container}>No lead data found</div>

  const steps = getDynamicSteps()

  return (
    <div className={styles.container}>
      <DashboardHeader
        title={`View Lead - ${leadData.fullname}`}
        subtitle="View and manage student lead information"
      />
      <div className={styles.headerActions}>
        <button onClick={handleBack} className={styles.buttonSecondary}>
          <ArrowLeft size={16} />
          Back to Leads
        </button>
      </div>
      <div className={styles.statusOverview}>
        <div className={styles.statusCard}>
          <div className={styles.statusLabel}>Lead Status</div>
          <div className={styles.statusValue}>
            <span className={styles.statusBadge}>{leadData.status}</span>
          </div>
        </div>
        <div className={styles.statusCard}>
          <div className={styles.statusLabel}>Application Status</div>
          <div className={styles.statusValue}>
            <span className={styles.appStatusBadge}>{leadData.applicationGenerated}</span>
          </div>
        </div>
        <div className={styles.statusCard}>
          <div className={styles.statusLabel}>Lead Date</div>
          <div className={styles.statusValue}>{leadData.leadDate}</div>
        </div>
        <div className={styles.statusCard}>
          <div className={styles.statusLabel}>Assign Date</div>
          <div className={styles.statusValue}>{leadData.assignDate}</div>
        </div>
      </div>
      <div className={styles.addLeadPage}>
        <StepProgress
          steps={steps}
          currentStep={currentStep}
          onStepClick={(id) => setCurrentStep(id)}
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
            <button
              type="button"
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              disabled={currentStep === steps.length}
              className={styles.buttonPrimary}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ViewLead
