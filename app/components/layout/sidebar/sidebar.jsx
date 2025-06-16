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

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(true) // Start collapsed
  const [openDropdown, setOpenDropdown] = useState(null)
  const pathname = usePathname()

  const handleToggle = () => {
    setIsClosed(!isClosed)
    // Close all dropdowns when collapsing
    if (!isClosed) {
      setOpenDropdown(null)
    }
  }

  const toggleDropdown = (dropdownName) => {
    // Only allow dropdown toggle when sidebar is expanded
    if (!isClosed) {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
    }
  }

  return (
    <aside className={`sidebar ${isClosed ? "sidebar-collapsed" : "sidebar-expanded"}`}>
      <div className="sidebar-toggle" onClick={handleToggle}>
        <ChevronRightIcon className={`sidebar-toggle-icon ${!isClosed ? "sidebar-toggle-icon-rotated" : ""}`} />
      </div>

      <div className="sidebar-container">
        <div className="sidebar-menu">
          <ul className="sidebar-menu-links">
            <li>
              <Link
                href="/dashboard"
                className={`sidebar-link ${pathname === "/dashboard" ? "sidebar-link-active" : ""}`}
                data-tooltip="Dashboard"
              >
                <HomeIcon className="sidebar-link-icon" />
                <span className={`sidebar-link-text ${isClosed ? "sidebar-link-text-hidden" : ""}`}>Dashboard</span>
                {isClosed && <span className="sidebar-tooltip">Dashboard</span>}
              </Link>
            </li>

            {/* Leads Management Dropdown */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/leads") ? "sidebar-dropdown-active" : ""}`}
                onClick={() => toggleDropdown("leads")}
                data-tooltip="Leads Management"
              >
                <UserRoundIcon className="sidebar-dropdown-icon" />
                <span className={`sidebar-dropdown-text ${isClosed ? "sidebar-dropdown-text-hidden" : ""}`}>
                  Leads Management
                </span>
                <ChevronDownIcon
                  className={`sidebar-dropdown-arrow ${openDropdown === "leads" ? "sidebar-dropdown-arrow-rotated" : ""} ${isClosed ? "sidebar-dropdown-arrow-hidden" : ""}`}
                />
                {isClosed && <span className="sidebar-tooltip">Leads Management</span>}
              </div>

              <ul
                className={`sidebar-submenu ${openDropdown === "leads" && !isClosed ? "sidebar-submenu-expanded" : "sidebar-submenu-collapsed"} ${isClosed ? "sidebar-submenu-hidden" : ""}`}
              >
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
                    href="/dashboard/leads/view"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/leads/view" ? "sidebar-submenu-item-active" : ""}`}
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
                </li>
              </ul>
            </li>

            {/* Application Dropdown */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/application") ? "sidebar-dropdown-active" : ""}`}
                onClick={() => toggleDropdown("application")}
                data-tooltip="Application"
              >
                <FileIcon className="sidebar-dropdown-icon" />
                <span className={`sidebar-dropdown-text ${isClosed ? "sidebar-dropdown-text-hidden" : ""}`}>
                  Application
                </span>
                <ChevronDownIcon
                  className={`sidebar-dropdown-arrow ${openDropdown === "application" ? "sidebar-dropdown-arrow-rotated" : ""} ${isClosed ? "sidebar-dropdown-arrow-hidden" : ""}`}
                />
                {isClosed && <span className="sidebar-tooltip">Application</span>}
              </div>

              <ul
                className={`sidebar-submenu ${openDropdown === "application" && !isClosed ? "sidebar-submenu-expanded" : "sidebar-submenu-collapsed"} ${isClosed ? "sidebar-submenu-hidden" : ""}`}
              >
                <li>
                  <Link
                    href="/dashboard/application/generate"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/application/generate" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>Generate Application</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/application/view"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/application/view" ? "sidebar-submenu-item-active" : ""}`}
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
                data-tooltip="Countries"
              >
                <MapPinIcon className="sidebar-dropdown-icon" />
                <span className={`sidebar-dropdown-text ${isClosed ? "sidebar-dropdown-text-hidden" : ""}`}>
                  Countries
                </span>
                <ChevronDownIcon
                  className={`sidebar-dropdown-arrow ${openDropdown === "countries" ? "sidebar-dropdown-arrow-rotated" : ""} ${isClosed ? "sidebar-dropdown-arrow-hidden" : ""}`}
                />
                {isClosed && <span className="sidebar-tooltip">Countries</span>}
              </div>

              <ul
                className={`sidebar-submenu ${openDropdown === "countries" && !isClosed ? "sidebar-submenu-expanded" : "sidebar-submenu-collapsed"} ${isClosed ? "sidebar-submenu-hidden" : ""}`}
              >
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
              <button
                onClick={() => console.log("Logout clicked")}
                className="sidebar-logout-button"
                data-tooltip="Logout"
              >
                <LogOutIcon className="sidebar-logout-icon" />
                <span className={`sidebar-logout-text ${isClosed ? "sidebar-logout-text-hidden" : ""}`}>Logout</span>
                {isClosed && <span className="sidebar-tooltip">Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
