"use client"
import { Info } from "lucide-react"
import styles from "./request-edit-button.module.css"

export default function RequestEditButton({ onClick }) {
  return (
    <button type="button" className={styles.editButton} onClick={onClick}>
      Request Edit
      <Info className={styles.infoIcon} />
    </button>
  )
}
