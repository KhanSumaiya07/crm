"use client"
import styles from "./style.module.css"

export default function InfoCard({
  title,
  icon: Icon,
  children,
  showEditButton = true,
  onEditClick,
}) {
  return (
    <div className={styles["form-card"]}>
      <div className={styles["card-header"]}>
        <div className={styles["header-content"]}>
          {Icon && (
            <div className={styles["icon-wrapper"]}>
              <Icon className={styles["section-icon"]} aria-hidden="true" />
            </div>
          )}
          <h2 className={styles["section-title"]}>{title}</h2>
        </div>
        {showEditButton && (
          <button type="button" className={styles["edit-button"]} onClick={onEditClick}>
            Request Edit
            <span className={styles["info-icon"]} />
          </button>
        )}
      </div>
      <div className={styles["card-content"]}>
        <div className={styles["content-wrapper"]}>
          {children}
        </div>
      </div>
    </div>
  );
}
