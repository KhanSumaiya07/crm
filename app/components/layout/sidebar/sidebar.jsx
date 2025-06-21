"use client"

import {
  HomeIcon,
  UserRoundIcon,
  FileIcon,
  MapPinIcon,
  LogOutIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { logoutUser } from "../../../../store/userSlice"
import "./sidebar.css"

const Sidebar = ({ onToggle }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const role = useSelector((state) => state.user.role)

  const [isExpanded, setIsExpanded] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleToggle = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    if (!newState) setOpenDropdown(null)
    if (onToggle) onToggle(newState)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    toast.info("Logged out")
    router.push("/login")
  }

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
  }

  return (
    <aside className={`sidebar ${isExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
      <div className="sidebar-toggle" onClick={handleToggle}>
        <ChevronRightIcon className={`sidebar-toggle-icon ${isExpanded ? "sidebar-toggle-icon-rotated" : ""}`} />
      </div>

      <div className="sidebar-container">
        <div className="sidebar-menu">
          <ul className="sidebar-menu-links">

            {/* Home */}
            <li>
              <Link href="/dashboard" className={`sidebar-link ${pathname === "/dashboard" ? "sidebar-link-active" : ""}`}>
                <HomeIcon className="sidebar-link-icon" />
                <span className="sidebar-link-text">Home</span>
                
              </Link>
            </li>

            {/* Leads Management */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/leads") ? "sidebar-dropdown-active" : ""}`}
                onClick={() => toggleDropdown("leads")}
              >
                <span className="sidebar-icon">
                  {/* SVG Icon for Leads */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 8.5752C20 8.99779 19.6574 9.34037 19.2348 9.34037H19.226C19.0223 9.34042 18.8272 9.25832 18.6849 9.11265C18.5425 8.96697 18.4649 8.77004 18.4697 8.5664V6.2533C18.4697 3.2102 16.7898 1.53034 13.7467 1.53034H6.2533C3.20141 1.53034 1.53034 3.2102 1.53034 6.2533V13.7555C1.53034 16.7986 3.2102 18.4697 6.2533 18.4697H13.7467C16.7986 18.4697 18.4697 16.7898 18.4697 13.7555C18.4697 13.3329 18.8122 12.9903 19.2348 12.9903C19.6574 12.9903 20 13.3329 20 13.7555C20 17.6077 17.6077 20 13.7555 20H6.2533C2.39226 20 0 17.6077 0 13.7555V6.2533C0 2.39226 2.39226 0 6.2533 0H13.7467C17.5902 0 20 2.39226 20 6.2533V8.5752Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="sidebar-dropdown-text">Leads Management</span>
                <ChevronDownIcon
                  className={`sidebar-dropdown-arrow ${openDropdown === "leads" ? "sidebar-dropdown-arrow-rotated" : ""}`}
                />
                {!isExpanded && <span className="sidebar-tooltip">Leads</span>}
              </div>

              <ul className={`sidebar-submenu ${openDropdown === "leads" ? "sidebar-submenu-expanded" : ""}`}>
                <li>
                  <Link href="/dashboard/leads/add" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/add" ? "sidebar-submenu-item-active" : ""}`}>
                    <span>Add</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/leads/viewLeads" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/viewLeads" ? "sidebar-submenu-item-active" : ""}`}>
                    <span>View</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/leads/followup" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/followup" ? "sidebar-submenu-item-active" : ""}`}>
                    <span>Manage Follow-ups</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/leads/source" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/source" ? "sidebar-submenu-item-active" : ""}`}>
                    <span>View Lead Source</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/leads/Messages" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/Messages" ? "sidebar-submenu-item-active" : ""}`}>
                    <span>Email Messages</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Counsellor - Admin Only */}
            {role === "admin" && (
              <li>
                <div
                  className={`sidebar-dropdown ${pathname.startsWith("/dashboard/counsellor") ? "sidebar-dropdown-active" : ""}`}
                  onClick={() => toggleDropdown("counsellor")}
                >
                  <UserRoundIcon className="sidebar-dropdown-icon" />
                  <span className="sidebar-dropdown-text">Counsellor</span>
                  <ChevronDownIcon
                    className={`sidebar-dropdown-arrow ${openDropdown === "counsellor" ? "sidebar-dropdown-arrow-rotated" : ""}`}
                  />
                  {!isExpanded && <span className="sidebar-tooltip">Counsellor</span>}
                </div>

                <ul className={`sidebar-submenu ${openDropdown === "counsellor" ? "sidebar-submenu-expanded" : ""}`}>
                  <li>
                    <Link href="/dashboard/counsellor/add" className={`sidebar-submenu-item ${pathname === "/dashboard/counsellor/add" ? "sidebar-submenu-item-active" : ""}`}>
                      <span>Add Counsellor</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/counsellor/manage" className={`sidebar-submenu-item ${pathname === "/dashboard/counsellor/manage" ? "sidebar-submenu-item-active" : ""}`}>
                      <span>Manage Counsellor</span>
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Applications - Admin Only */}
            {role === "admin" && (
              <li>
                <div
                  className={`sidebar-dropdown ${pathname.startsWith("/dashboard/application") || pathname.startsWith("/dashboard/applications") ? "sidebar-dropdown-active" : ""}`}
                  onClick={() => toggleDropdown("application")}
                >
                  <FileIcon className="sidebar-dropdown-icon" />
                  <span className="sidebar-dropdown-text">Application</span>
                  <ChevronDownIcon
                    className={`sidebar-dropdown-arrow ${openDropdown === "application" ? "sidebar-dropdown-arrow-rotated" : ""}`}
                  />
                  {!isExpanded && <span className="sidebar-tooltip">Application</span>}
                </div>

                <ul className={`sidebar-submenu ${openDropdown === "application" ? "sidebar-submenu-expanded" : ""}`}>
                  <li><Link href="/dashboard/applications/add" className={`sidebar-submenu-item ${pathname === "/dashboard/applications/add" ? "sidebar-submenu-item-active" : ""}`}><span>Generate Application</span></Link></li>
                  <li><Link href="/dashboard/applications/view" className={`sidebar-submenu-item ${pathname === "/dashboard/applications/view" ? "sidebar-submenu-item-active" : ""}`}><span>View Application</span></Link></li>
                  <li><Link href="/dashboard/application/followup" className={`sidebar-submenu-item ${pathname === "/dashboard/application/followup" ? "sidebar-submenu-item-active" : ""}`}><span>Manage Application Followup</span></Link></li>
                  <li><Link href="/dashboard/application/tracking" className={`sidebar-submenu-item ${pathname === "/dashboard/application/tracking" ? "sidebar-submenu-item-active" : ""}`}><span>Application Tracking History</span></Link></li>
                </ul>
              </li>
            )}

            {/* Countries - All Roles */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/countries") ? "sidebar-dropdown-active" : ""}`}
                onClick={() => toggleDropdown("countries")}
              >
                <MapPinIcon className="sidebar-dropdown-icon" />
                <span className="sidebar-dropdown-text">Countries</span>
                <ChevronDownIcon className={`sidebar-dropdown-arrow ${openDropdown === "countries" ? "sidebar-dropdown-arrow-rotated" : ""}`} />
                {!isExpanded && <span className="sidebar-tooltip">Countries</span>}
              </div>

              <ul className={`sidebar-submenu ${openDropdown === "countries" ? "sidebar-submenu-expanded" : ""}`}>
                <li><Link href="/dashboard/countries/view" className={`sidebar-submenu-item ${pathname === "/dashboard/countries/view" ? "sidebar-submenu-item-active" : ""}`}><span>View</span></Link></li>
                <li><Link href="/dashboard/countries/all" className={`sidebar-submenu-item ${pathname === "/dashboard/countries/all" ? "sidebar-submenu-item-active" : ""}`}><span>All Countries</span></Link></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div className="sidebar-footer">
          <ul className="sidebar-footer-list">
            <li>
              <button onClick={handleLogout} className="sidebar-logout-button">
                <LogOutIcon className="sidebar-logout-icon" />
                <span className="sidebar-logout-text">Logout</span>
                {!isExpanded && <span className="sidebar-tooltip">Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
