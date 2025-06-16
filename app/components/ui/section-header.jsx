import "./section-header.css"

export function SectionHeader({ title, action }) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      {action}
    </div>
  )
}
