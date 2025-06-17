"use client"
import { X, AlertCircle } from "lucide-react"
import styles from "./validation-modal.module.css"

export default function ValidationModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <AlertCircle className={styles.icon} />
          </div>
          <h3 className={styles.title}>Required Fields Missing</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.content}>
          <p className={styles.message}>Please fill the required fields to continue</p>
        </div>
        {/* <div className={styles.footer}>
          <button onClick={onClose} className={styles.okButton}>
            OK, I'll fill them
          </button>
        </div> */}
      </div>
    </div>
  )
}
