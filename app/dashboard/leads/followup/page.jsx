"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchLeads } from "../../../../store/leadsSlice"
import DashboardHeader from "../../../components/ui/dashboardHeader"
import styles from "../add/style.module.css"
import Link from "next/link"
import { Calendar, Eye } from "lucide-react"
import { format } from "date-fns"

const ManageFollowUps = () => {
  const dispatch = useDispatch()
  const { leads, loading } = useSelector((state) => state.leads)

  useEffect(() => {
    dispatch(fetchLeads())
  }, [dispatch])

  const getUpcomingFollowUps = () => {
    const now = new Date()
    return leads
      .flatMap((lead) =>
        lead.followUps.map((followUp) => ({
          ...followUp,
          leadId: lead._id,
          fullname: lead.fullname,
        }))
      )
      .filter((f) => f.date && new Date(f.date) >= now && f.status !== "Done")
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const followUps = getUpcomingFollowUps()

  return (
    <div className={styles.container}>
      <DashboardHeader title="Manage Follow-Ups" subtitle="Manage and track all your follow-up leads here" />
      <div className={styles.tableContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : followUps.length === 0 ? (
          <p>No upcoming follow-ups found.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>Time</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Remark</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {followUps.map((f, idx) => (
                <tr key={idx}>
                  <td>{f.fullname}</td>
                  <td>{format(new Date(f.date), "dd MMM yyyy")}</td>
                  <td>{f.time}</td>
                  <td>{f.mode}</td>
                  <td>{f.status}</td>
                  <td>{f.remark}</td>
                  <td>
                    <Link href={`/dashboard/leads/viewLeads/${f.leadId}`}>
                      <button title="View Lead"><Eye size={18} /></button>
                    </Link>
                    {/* Future: Add edit or complete follow-up buttons here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ManageFollowUps
