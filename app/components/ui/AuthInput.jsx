import { forwardRef } from "react"
import styles from "./AuthInput.module.css";

const AuthInput = forwardRef(({ label,placeholder, icon, error, required, ...props }, ref) => {
  return (
    <div className={styles.container}>
      <label htmlFor={props.id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.inputWrapper}>
        <input ref={ref} placeholder={placeholder} className={`${styles.input} ${error ? styles.error : ""}`} {...props} />
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  )
})

AuthInput.displayName = "AuthInput"

export { AuthInput }
