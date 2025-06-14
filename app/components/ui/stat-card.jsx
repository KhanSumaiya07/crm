"use client"

import "./stat-card.css"

export function StatCard({ title, value, icon, accentColor = "blue", onClick }) {
  const cardClasses = ["stat-card", accentColor, onClick ? "clickable" : ""].filter(Boolean).join(" ")

  const iconClasses = ["stat-card-icon", accentColor].join(" ")

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="stat-card-content">
        <h3 className="stat-card-title">{title}</h3>
        <p className="stat-card-value">{value}</p>
      </div>
      <div className={iconClasses}>{icon}</div>
    </div>
  )
}
