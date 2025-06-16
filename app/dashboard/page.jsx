"use client"

import { useState } from "react"
import {
  
  UsersIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  FileTextIcon,
  GiftIcon,
  CreditCardIcon,
  StampIcon,
  BarChart3Icon,
  PieChartIcon,
  ListIcon,
  MapPinIcon,
  TrendingUpIcon,
} from "lucide-react"
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

export default function Dashboard() {
  // Filter states
  const [dateRange, setDateRange] = useState("01/04/2025 - 10/06/2025")
  const [selectedIntake, setSelectedIntake] = useState([])
  const [selectedYear, setSelectedYear] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  // Sample data for recent leads
  const recentLeads = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 234 567 8901",
      source: "Website",
      date: "2025-06-01",
      status: "New",
    },
    {
      id: 2,
      name: "Emma Johnson",
      email: "emma@example.com",
      phone: "+1 234 567 8902",
      source: "Referral",
      date: "2025-06-01",
      status: "Contacted",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 234 567 8903",
      source: "Social Media",
      date: "2025-05-31",
      status: "Interested",
    },
    {
      id: 4,
      name: "Sophia Williams",
      email: "sophia@example.com",
      phone: "+1 234 567 8904",
      source: "Event",
      date: "2025-05-30",
      status: "New",
    },
    {
      id: 5,
      name: "James Davis",
      email: "james@example.com",
      phone: "+1 234 567 8905",
      source: "Website",
      date: "2025-05-30",
      status: "Contacted",
    },
  ]

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
    { id: 301, country: "United States", applications: 45, percentage: "30%" },
    { id: 302, country: "India", applications: 30, percentage: "20%" },
    { id: 303, country: "China", applications: 25, percentage: "16.7%" },
    { id: 304, country: "United Kingdom", applications: 15, percentage: "10%" },
    { id: 305, country: "Canada", applications: 10, percentage: "6.7%" },
  ]

  return (
    
    <div className="dashboard-container">
     
      {/* Header */}
     
       <DashboardHeader title='Dashboard' subtitle='Welcome to Eduwire portal' />

      {/* Filters */}
      <div className="card p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <IntakeDropdown value={selectedIntake} onChange={setSelectedIntake} />
          <YearDropdown value={selectedYear} onChange={setSelectedYear} />
          <CountriesDropdown value={selectedCountries} onChange={setSelectedCountries} />
        </div>
        <div className="mt-4 flex justify-end">
          <Button>
            
            Apply Filter
          </Button>
        </div>
      </div>

      {/* Leads Management Section */}
      <div className="dashboard-section">
        <SectionHeader title="Leads Management" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Leads" value="120" icon={<UsersIcon />} accentColor="blue" />
          <StatCard title="Connected" value="60" icon={<CheckCircleIcon />} accentColor="green" />
          <StatCard title="Not Connected" value="30" icon={<AlertCircleIcon />} accentColor="orange" />
          <StatCard title="Rejected" value="15" icon={<XCircleIcon />} accentColor="red" />
        </div>
      </div>

      {/* Applications Overview Section */}
      <div className="dashboard-section">
        <SectionHeader title="Applications Overview" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="All Applications" value="26" icon={<FileTextIcon />} accentColor="blue" />
          <StatCard title="Offers" value="6" icon={<GiftIcon />} accentColor="green" />
          <StatCard title="Payments" value="1" icon={<CreditCardIcon />} accentColor="purple" />
          <StatCard title="Visas Received" value="1" icon={<StampIcon />} accentColor="teal" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-section">
        <SectionHeader title="Performance Analytics" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Monthly Lead Conversion">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="flex flex-col items-center text-gray-400">
                <BarChart3Icon className="mb-2" />
                <p>Lead Conversion Chart</p>
                <p className="text-xs">(Chart visualization would go here)</p>
              </div>
            </div>
          </ChartCard>
          <ChartCard title="Application Status Distribution">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="flex flex-col items-center text-gray-400">
                <PieChartIcon className="mb-2" />
                <p>Application Status Chart</p>
                <p className="text-xs">(Chart visualization would go here)</p>
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
            <Button variant="outline" size="sm">
              <ListIcon className="mr-2" />
              View All
            </Button>
          }
        />
        <DataTable
          title="Latest Lead Activities"
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" },
            { header: "Phone", accessor: "phone" },
            { header: "Source", accessor: "source" },
            { header: "Date", accessor: "date" },
            {
              header: "Status",
              accessor: "status",
              cell: (value) => (
                <span
                  className={`status-badge ${value === "New" ? "status-new" : value === "Contacted" ? "status-contacted" : "status-interested"}`}
                >
                  {value}
                </span>
              ),
            },
          ]}
          data={recentLeads}
          action={
            <Button variant="ghost" size="sm">
              Export
            </Button>
          }
        />
      </div>

      {/* Recent Applications Table */}
      <div className="dashboard-section">
        <SectionHeader
          title="Recent Applications"
          action={
            <Button variant="outline" size="sm">
              <ListIcon className="mr-2" />
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
                <span
                  className={`status-badge ${value === "Submitted" ? "status-submitted" : value === "Under Review" ? "status-review" : "status-accepted"}`}
                >
                  {value}
                </span>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 dashboard-section">
        {/* Upcoming Tasks */}
        <div>
          <SectionHeader title="Upcoming Tasks" />
          <div className="card p-4">
            <ul className="task-list">
              {upcomingTasks.map((task) => (
                <li key={task.id} className="py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start">
                    <div
                      className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                        task.priority === "High"
                          ? "bg-red-500"
                          : task.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">{task.task}</p>
                      <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                    </div>
                    <span
                      className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                        task.priority === "High"
                          ? "priority-high"
                          : task.priority === "Medium"
                            ? "priority-medium"
                            : "priority-low"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Tasks
              </Button>
            </div>
          </div>
        </div>

        {/* Top Countries */}
        <div>
          <SectionHeader title="Top Countries" />
          <div className="card p-4">
            <ul className="country-list">
              {topCountries.map((country) => (
                <li key={country.id} className="py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <MapPinIcon className="text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">{country.country}</p>
                      <p className="text-xs text-gray-500">{country.applications} applications</p>
                    </div>
                    <span className="ml-auto text-sm font-medium text-gray-700">{country.percentage}</span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: country.percentage }} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Countries
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Section */}
      <div className="dashboard-section">
        <SectionHeader title="Monthly Performance" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Growth Rate" value="12.5%" icon={<TrendingUpIcon />} accentColor="purple" />
          <StatCard title="Conversion Rate" value="24.8%" icon={<BarChart3Icon />} accentColor="teal" />
          <StatCard title="Avg. Response Time" value="4.2h" icon={<AlertCircleIcon />} accentColor="orange" />
          <StatCard title="Active Countries" value="28" icon={<MapPinIcon />} accentColor="blue" />
        </div>
      </div>
    </div>
  )
}
