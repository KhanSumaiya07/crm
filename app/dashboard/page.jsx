"use client"

import { useState } from "react"
import { UsersIcon, CheckCircleIcon, AlertCircleIcon, XCircleIcon, FileTextIcon, GiftIcon, CreditCardIcon, StampIcon, BarChart3Icon, PieChartIcon, ListIcon, MapPinIcon, TrendingUpIcon, CalendarIcon, } from "lucide-react"
import { StatCard } from "../components/ui/stat-card"
import { SectionHeader } from "../components/ui/section-header"
import { ChartCard } from "../components/ui/chart-card"
import { DataTable } from "../components/ui/data-table"
import { Button } from "../components/ui/button"
import { DateRangePicker } from "../components/ui/date-range-picker"
// import { IntakeDropdown } from "../components/dashboard/intake-dropdown"
import { YearDropdown } from "../components/dashboard/year-dropdown"
import { CountriesDropdown } from "../components/dashboard/countries-dropdown"
import { IntakeDropdown } from "../components/dashboard/intake-dropdown"
import DashboardHeader from "../components/ui/dashboardHeader"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchLeads } from '../../store/leadsSlice';
import "./dashboard.css"

export default function Dashboard() {
  // Filter states
  const [dateRange, setDateRange] = useState("01/04/2025 - 10/06/2025")
  const [selectedIntake, setSelectedIntake] = useState([])
  const [selectedYear, setSelectedYear] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  // Calculate lead statistics
  const totalLeads = leads.length

  const connectedLeads = leads.filter((lead) => lead.followUps[0]?.status === "Connected").length

  const notConnectedLeads = leads.filter((lead) => lead.followUps[0]?.status === "Not Connected").length

  const rejectedLeads = leads.filter((lead) => lead.followUps[0]?.status === "Rejected").length

  // Get 5 most recent leads
  const recentLeads = leads.slice(0, 5)
  console.log("Recent Leads:", recentLeads);
  // Sample data for recent applications
  const recentApplications = [
    {
      id: 101,
      student: "Alex Turner",
      university: "Oxford University",
      program: "Computer Science",
      date: "2025-06-01",
      status: "Submitted",
    },
    {
      id: 102,
      student: "Olivia Martinez",
      university: "Cambridge University",
      program: "Business Administration",
      date: "2025-05-29",
      status: "Under Review",
    },
    {
      id: 103,
      student: "Daniel Lee",
      university: "Harvard University",
      program: "Medicine",
      date: "2025-05-28",
      status: "Accepted",
    },
    {
      id: 104,
      student: "Sophia Chen",
      university: "MIT",
      program: "Engineering",
      date: "2025-05-27",
      status: "Submitted",
    },
    {
      id: 105,
      student: "William Johnson",
      university: "Stanford University",
      program: "Law",
      date: "2025-05-26",
      status: "Under Review",
    },
  ]

  // Sample data for upcoming tasks
  const upcomingTasks = [
    { id: 201, task: "Follow up with John Smith", dueDate: "2025-06-03", priority: "High" },
    { id: 202, task: "Review Emma Johnson's application", dueDate: "2025-06-04", priority: "Medium" },
    { id: 203, task: "Send offer letter to Daniel Lee", dueDate: "2025-06-05", priority: "High" },
    { id: 204, task: "Schedule interview with Sophia Chen", dueDate: "2025-06-06", priority: "Medium" },
    { id: 205, task: "Update William Johnson's documents", dueDate: "2025-06-07", priority: "Low" },
  ]

  // Sample data for top countries
  const topCountries = [
    { id: 301, country: "United States", applications: 45, percentage: 30 },
    { id: 302, country: "India", applications: 30, percentage: 20 },
    { id: 303, country: "China", applications: 25, percentage: 16.7 },
    { id: 304, country: "United Kingdom", applications: 15, percentage: 10 },
    { id: 305, country: "Canada", applications: 10, percentage: 6.7 },
  ]

  const handleApplyFilter = () => {
    // Filter logic would go here
    console.log("Applying filters:", {
      dateRange,
      selectedIntake,
      selectedYear,
      selectedCountries,
    })
  }

  return (
    <div>
      {/* Header */}
      <DashboardHeader title="Dashboard" subtitle="Welcome to Eduwire portal" />

      <div className="dashboard-content">
        {/* Filters */}
        <div className="filter-section">
          <div className="filter-grid">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <IntakeDropdown value={selectedIntake} onChange={setSelectedIntake} />
            <YearDropdown value={selectedYear} onChange={setSelectedYear} />
            <CountriesDropdown value={selectedCountries} onChange={setSelectedCountries} />
          </div>
          <div className="filter-actions">
            <Button onClick={handleApplyFilter}>Apply Filter</Button>
          </div>
        </div>

        {/* Leads Management Section */}
        <div className="dashboard-section">
          <SectionHeader title="Leads Management" />
          <div className="stats-grid">
            <StatCard title="Total Leads" value={totalLeads.toString()} icon={<UsersIcon />} accentColor="blue" />
            <StatCard
              title="Connected"
              value={connectedLeads.toString()}
              icon={<CheckCircleIcon />}
              accentColor="green"
            />
            <StatCard
              title="Not Connected"
              value={notConnectedLeads.toString()}
              icon={<AlertCircleIcon />}
              accentColor="orange"
            />
            <StatCard title="Rejected" value={rejectedLeads.toString()} icon={<XCircleIcon />} accentColor="red" />
          </div>
        </div>

        {/* Applications Overview Section */}
        <div className="dashboard-section">
          <SectionHeader title="Applications Overview" />
          <div className="stats-grid">
            <StatCard title="All Applications" value="26" icon={<FileTextIcon />} accentColor="blue" />
            <StatCard title="Offers" value="6" icon={<GiftIcon />} accentColor="green" />
            <StatCard title="Payments" value="1" icon={<CreditCardIcon />} accentColor="purple" />
            <StatCard title="Visas Received" value="1" icon={<StampIcon />} accentColor="teal" />
          </div>
        </div>

        {/* Charts Section */}
        <div className="dashboard-section">
          <SectionHeader title="Performance Analytics" />
          <div className="charts-grid">
            <ChartCard title="Monthly Lead Conversion">
              <div className="chart-placeholder">
                <div className="chart-placeholder-content">
                  <BarChart3Icon className="chart-icon" />
                  <p className="chart-title">Lead Conversion Chart</p>
                  <p className="chart-subtitle">(Chart visualization would go here)</p>
                </div>
              </div>
            </ChartCard>
            <ChartCard title="Application Status Distribution">
              <div className="chart-placeholder">
                <div className="chart-placeholder-content">
                  <PieChartIcon className="chart-icon" />
                  <p className="chart-title">Application Status Chart</p>
                  <p className="chart-subtitle">(Chart visualization would go here)</p>
                </div>
              </div>
            </ChartCard>
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="dashboard-section">
          <SectionHeader
            title="Recent Leads"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log("View All Leads clicked")}
              >
                <ListIcon className="button-icon" size={16} />
                View All
              </Button>
            }
          />
          <DataTable
            title="Latest Lead Activities"
            columns={[
              {
                header: "Name",
                accessor: "fullname",
                cell: (value) => value || "N/A"
              },
              {
                header: "Email",
                accessor: "email",
                cell: (value) => value || "N/A"
              },
              {
                header: "Phone",
                accessor: "phone",
                cell: (value) => value || "N/A"
              },
              {
                header: "Source",
                accessor: (row) => row.followUps?.[0]?.mode || "N/A",
                cell: (value) => value
              },
              {
                header: "Date",
                accessor: "createdAt",
                cell: (date) => {
                  try {
                    return date ? new Date(date).toLocaleDateString() : "N/A";
                  } catch {
                    return "Invalid Date";
                  }
                }
              },
              {
                header: "Status",
                accessor: (row) => row.followUps?.[0]?.status || "N/A",
                cell: (value) => (
                  <span
                    className={`status-badge status-${String(value).toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {value}
                  </span>
                )
              },
            ]}
            data={recentLeads}
            emptyState={
              <div className="table-empty-state">
                <p>No recent leads found</p>
              </div>
            }
            loading={loading}
          />
        </div>

        {/* Recent Applications Table */}
        <div className="dashboard-section">
          <SectionHeader
            title="Recent Applications"
            action={
              <Button variant="outline" size="sm">
                <ListIcon className="button-icon" />
                View All
              </Button>
            }
          />
          <DataTable
            title="Latest Application Activities"
            columns={[
              { header: "Student", accessor: "student" },
              { header: "University", accessor: "university" },
              { header: "Program", accessor: "program" },
              { header: "Date", accessor: "date" },
              {
                header: "Status",
                accessor: "status",
                cell: (value) => (
                  <span className={`status-badge status-${value.toLowerCase().replace(" ", "-")}`}>{value}</span>
                ),
              },
            ]}
            data={recentApplications}
            action={
              <Button variant="ghost" size="sm">
                Export
              </Button>
            }
          />
        </div>

        {/* Bottom Grid Section */}
        <div className="bottom-grid">
          {/* Upcoming Tasks */}
          <div className="dashboard-section">
            <SectionHeader title="Upcoming Tasks" />
            <div className="card">
              <ul className="task-list">
                {upcomingTasks.map((task) => (
                  <li key={task.id} className="task-item">
                    <div className={`priority-dot priority-${task.priority.toLowerCase()}`} />
                    <div className="task-content">
                      <p className="task-title">{task.task}</p>
                      <p className="task-date">
                        <CalendarIcon className="date-icon" />
                        Due: {task.dueDate}
                      </p>
                    </div>
                    <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                  </li>
                ))}
              </ul>
              <div className="card-footer">
                <Button variant="outline" className="full-width">
                  View All Tasks
                </Button>
              </div>
            </div>
          </div>

          {/* Top Countries */}
          <div className="dashboard-section">
            <SectionHeader title="Top Countries" />
            <div className="card">
              <ul className="country-list">
                {topCountries.map((country) => (
                  <li key={country.id} className="country-item">
                    <MapPinIcon className="country-icon" />
                    <div className="country-content">
                      <p className="country-name">{country.country}</p>
                      <p className="country-applications">{country.applications} applications</p>
                    </div>
                    <div className="country-stats">
                      <span className="country-percentage">{country.percentage}%</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${country.percentage}%` }} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="card-footer">
                <Button variant="outline" className="full-width">
                  View All Countries
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="dashboard-section">
          <SectionHeader title="Monthly Performance" />
          <div className="stats-grid">
            <StatCard title="Growth Rate" value="12.5%" icon={<TrendingUpIcon />} accentColor="purple" />
            <StatCard title="Conversion Rate" value="24.8%" icon={<BarChart3Icon />} accentColor="teal" />
            <StatCard title="Avg. Response Time" value="4.2h" icon={<AlertCircleIcon />} accentColor="orange" />
            <StatCard title="Active Countries" value="28" icon={<MapPinIcon />} accentColor="blue" />
          </div>
        </div>
      </div>
    </div>
  )
}
