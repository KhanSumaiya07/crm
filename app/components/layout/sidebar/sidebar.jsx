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
import { usePathname } from "next/navigation"
import "./sidebar.css"

const Sidebar = ({ onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false) // Start collapsed
  const [openDropdown, setOpenDropdown] = useState(null)
  const pathname = usePathname()

  const handleToggle = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    // Close all dropdowns when collapsing
    if (!newState) {
      setOpenDropdown(null)
    }
    // Notify parent component about the toggle
    if (onToggle) {
      onToggle(newState)
    }
  }

  const toggleDropdown = (dropdownName) => {
    // Allow dropdown toggle when sidebar is expanded or when hovering
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
            <li>
              <Link
                href="/dashboard"
                className={`sidebar-link ${pathname === "/dashboard" ? "sidebar-link-active" : ""}`}
              >
                <HomeIcon className="sidebar-link-icon" />
                <span className="sidebar-link-text">Dashboard</span>
                {!isExpanded && <span className="sidebar-tooltip">Dashboard</span>}
              </Link>
            </li>

            {/* Leads Management Dropdown */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/leads") ? "sidebar-dropdown-active" : ""}`}
                onClick={() => toggleDropdown("leads")}
              >
                <UserRoundIcon className="sidebar-dropdown-icon" />
                <span className="sidebar-dropdown-text">Leads Management</span>
                <ChevronDownIcon
                  className={`sidebar-dropdown-arrow ${openDropdown === "leads" ? "sidebar-dropdown-arrow-rotated" : ""}`}
                />
                {!isExpanded && <span className="sidebar-tooltip">Leads Management</span>}
              </div>

              <ul className={`sidebar-submenu ${openDropdown === "leads" ? "sidebar-submenu-expanded" : ""}`}>
                <li>
                  <Link
                    href="/dashboard/leads/add"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/leads/add" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>Add</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/leads/viewLeads"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/leads/viewLeads" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>View</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/leads/followup"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/leads/followup" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>Manage Follow-ups</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/leads/source"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/leads/source" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>View Lead Source</span>
                  </Link>
                  <Link
                    href="/dashboard/leads/Messages"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/leads/Messages" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>Email messages</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Application Dropdown */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/application") ? "sidebar-dropdown-active" : ""}`}
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
                <li>
                  <Link
                    href="/dashboard/applications/add"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/applications/add" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>Generate Application</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/applications/view"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/applications/view" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>View Application</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/application/followup"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/application/followup" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>Manage Application Followup</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/application/tracking"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/application/tracking" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>Application Tracking History</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Countries Dropdown */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/countries") ? "sidebar-dropdown-active" : ""}`}
                onClick={() => toggleDropdown("countries")}
              >
                <MapPinIcon className="sidebar-dropdown-icon" />
                <span className="sidebar-dropdown-text">Countries</span>
                <ChevronDownIcon
                  className={`sidebar-dropdown-arrow ${openDropdown === "countries" ? "sidebar-dropdown-arrow-rotated" : ""}`}
                />
                {!isExpanded && <span className="sidebar-tooltip">Countries</span>}
              </div>

              <ul className={`sidebar-submenu ${openDropdown === "countries" ? "sidebar-submenu-expanded" : ""}`}>
                <li>
                  <Link
                    href="/dashboard/countries/view"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/countries/view" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>View</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/countries/all"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/countries/all" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>All Countries</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <ul className="sidebar-footer-list">
            <li>
              <button onClick={() => console.log("Logout clicked")} className="sidebar-logout-button">
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
