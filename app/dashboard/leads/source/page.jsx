"use client"
import { useEffect, useState } from "react"
import { Edit } from "lucide-react"
import styles from "./style.module.css"

export default function LeadSourceList() {
  const [sources, setSources] = useState([])

  useEffect(() => {
    fetch("/api/leads/lead-sources")
      .then((res) => res.json())
      .then((data) => {
        // Add toggle state
        const withToggle = data.map((d) => ({ ...d, isActive: true }))
        setSources(withToggle)
      })
  }, [])

  const handleToggle = (id) => {
    setSources((prev) =>
      prev.map((src) =>
        src._id === id ? { ...src, isActive: !src.isActive } : src
      )
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>View / Search Lead Source</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Lead Source</th>
            <th>Added By</th>
            <th>Last Updated</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sources.length > 0 ? (
            sources.map((src) => (
              <tr key={src._id}>
                <td>{src.name} ({src.count})</td>
                <td>{src.addedBy}</td>
                <td>
                  {src.lastUpdated
                    ? new Date(src.lastUpdated).toLocaleDateString("en-GB")
                    : "-"}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={src.isActive}
                    onChange={() => handleToggle(src._id)}
                  />
                </td>
                <td>
                  <button className={styles.editBtn}>
                    <Edit size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className={styles.noData}>
                No sources found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
