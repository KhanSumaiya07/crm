"use client"
import styles from "./step-progress.module.css"

export default function StepProgress({ steps, currentStep, onStepClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <div key={step.id} className={styles.stepItem}>
            <button onClick={() => onStepClick(step.id)} className={styles.stepButton}>
              <h3 className={`${styles.stepTitle} ${step.status === "current" ? styles.stepTitleCurrent : ""}`}>
                {step.title}
              </h3>
              <span
                className={`${styles.statusBadge} ${
                  step.status === "complete"
                    ? styles.statusComplete
                    : step.status === "current"
                      ? styles.statusCurrent
                      : styles.statusPending
                }`}
              >
                {step.status === "complete" ? "Complete" : "Pending"}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={styles.connector}
                style={{
                  left: `${(100 / steps.length) * (index + 0.5)}%`,
                  width: `${100 / steps.length}%`,
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${(currentStep / steps.length) * 100}%` }} />
      </div>
    </div>
  )
}
