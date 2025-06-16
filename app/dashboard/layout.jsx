
import Navbar from "../components/layout/navbar/navbar"
import Sidebar from "../components/layout/sidebar/sidebar"
import "./layout.css"

export const metadata = {
  title: "Dashboard",
}

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Navbar/>
      <div className="dashboard-content-wrapper">
       <Sidebar/>
        <main className="dashboard-main">
          <div className="dashboard-container">{children}</div>
        </main>
      </div>
    </div>
  )
}
