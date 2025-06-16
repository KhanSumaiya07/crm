import "./chart-card.css"

export function ChartCard({ title, children, action }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-card-title">{title}</h3>
        {action}
      </div>
      <div className="chart-card-content">{children}</div>
    </div>
  )
}
