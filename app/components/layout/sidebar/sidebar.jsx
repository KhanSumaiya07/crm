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
            {/* ✅ Dashboard - Common */}
            <li>
              <Link
                href="/dashboard"
                className={`sidebar-link ${pathname === "/dashboard" ? "sidebar-link-active" : ""}`}
              >
                <HomeIcon className="sidebar-link-icon" />
                <span className="sidebar-link-text">Home</span>
                {!isExpanded && <span className="sidebar-tooltip">Home</span>}
              </Link>
            </li>

            {/* ✅ Leads - Full for both Admin & Counsellor */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/leads") ? "sidebar-dropdown-active" : ""}`}
                onClick={() => toggleDropdown("leads")}
              >
                <span className="sidebar-icon">
                  {/* Leads Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 8.5752C20 8.99779 19.6574 9.34037 19.2348 9.34037H19.226C19.0223 9.34042 18.8272 9.25832 18.6849 9.11265C18.5425 8.96697 18.4649 8.77004 18.4697 8.5664V6.2533C18.4697 3.2102 16.7898 1.53034 13.7467 1.53034H6.2533C3.20141 1.53034 1.53034 3.2102 1.53034 6.2533V13.7555C1.53034 16.7986 3.2102 18.4697 6.2533 18.4697H13.7467C16.7986 18.4697 18.4697 16.7898 18.4697 13.7555C18.4697 13.3329 18.8122 12.9903 19.2348 12.9903C19.6574 12.9903 20 13.3329 20 13.7555C20 17.6077 17.6077 20 13.7555 20H6.2533C2.39226 20 0 17.6077 0 13.7555V6.2533C0 2.39226 2.39226 0 6.2533 0H13.7467C17.5902 0 20 2.39226 20 6.2533V8.5752ZM4.96042 14.6878V8.34653V8.28496C4.96726 8.08273 5.05484 7.89166 5.20359 7.75448C5.35234 7.6173 5.54985 7.54544 5.75198 7.55497C5.95496 7.56185 6.14687 7.64914 6.28545 7.79761C6.42402 7.94608 6.49788 8.14356 6.49077 8.34653V14.7405C6.47619 15.1631 6.1218 15.4939 5.69921 15.4793C5.27662 15.4648 4.94585 15.1104 4.96042 14.6878ZM9.27001 5.32102V14.6966C9.27001 15.1192 9.61259 15.4617 10.0352 15.4617C10.4578 15.4617 10.8004 15.1192 10.8004 14.6966V5.32102C10.8004 4.89843 10.4578 4.55585 10.0352 4.55585C9.61259 4.55585 9.27001 4.89843 9.27001 5.32102ZM13.5092 14.6878V11.6974C13.5092 11.2749 13.8518 10.9323 14.2744 10.9323C14.697 10.9323 15.0396 11.2749 15.0396 11.6974V14.6878C15.0396 15.1104 14.697 15.4529 14.2744 15.4529C13.8518 15.4529 13.5092 15.1104 13.5092 14.6878Z"
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
                <li><Link href="/dashboard/leads/add" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/add" ? "sidebar-submenu-item-active" : ""}`}><span>Add</span></Link></li>
                <li><Link href="/dashboard/leads/viewLeads" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/viewLeads" ? "sidebar-submenu-item-active" : ""}`}><span>View</span></Link></li>
                <li><Link href="/dashboard/leads/followup" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/followup" ? "sidebar-submenu-item-active" : ""}`}><span>Manage Follow-ups</span></Link></li>
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
                </li>
                <li>
                  <Link
                    href="/dashboard/leads/Messages"
                    className={`sidebar-submenu-item ${pathname === "/dashboard/leads/Messages" ? "sidebar-submenu-item-active" : ""}`}
                  >
                    <span>Email Messages</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* ✅ Counsellor Management - Admin Only */}
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
                    <Link
                      href="/dashboard/counsellor/add"
                      className={`sidebar-submenu-item ${pathname === "/dashboard/counsellor/add" ? "sidebar-submenu-item-active" : ""}`}
                    >
                      <span>Add Counsellor</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/counsellor/manage"
                      className={`sidebar-submenu-item ${pathname === "/dashboard/counsellor/manage" ? "sidebar-submenu-item-active" : ""}`}
                    >
                      <span>Manage Counsellor</span>
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {/* ✅ Application - Admin Only */}
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
            )}

            {/* ✅ Countries - Both */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/countries") ? "sidebar-dropdown-active" : ""}`}
                onClick={() => toggleDropdown("countries")}
              >
                <span className="sidebar-icon">
                  {/* Countries Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.99993 0H9.0333C13.7197 0.0184162 17.5183 3.84197 17.4999 8.52232V8.61528C17.4366 11.96 15.4258 14.7356 13.7504 16.4746C13.2736 16.9718 12.7661 17.4489 12.2427 17.8944C11.9292 18.1619 11.4586 18.1251 11.1908 17.812C10.923 17.498 10.9607 17.028 11.2742 16.7605C11.7589 16.3475 12.2304 15.9037 12.6739 15.4416C14.1649 13.8946 15.9527 11.4487 16.0071 8.58809C16.022 4.65842 12.8916 1.50574 9.02715 1.48996H8.99993C5.14862 1.48996 2.00768 4.61194 1.99276 8.46093C2.05861 10.3622 2.70138 12.1696 3.85256 13.6859C5.19604 15.4749 7.23409 17.3691 9.17116 18.6302C9.51713 18.8547 9.6146 19.316 9.38893 19.6615C9.24668 19.8807 9.00696 20 8.76285 20C8.62323 20 8.48274 19.9614 8.35629 19.879C6.28224 18.5293 4.0993 16.5 2.66011 14.5839C1.32453 12.8238 0.577272 10.7235 0.5 8.51267C0.51844 3.78585 4.32848 0 8.99993 0ZM7.25516 8.61414C7.25516 9.57266 8.03667 10.354 8.9973 10.354C9.95793 10.354 10.7394 9.57266 10.7394 8.61414C10.7394 7.65474 9.95793 6.87337 8.9973 6.87337C8.58547 6.87337 8.25092 6.54012 8.25092 6.12883C8.25092 5.71665 8.58547 5.38341 8.9973 5.38341C10.7807 5.38341 12.2322 6.83215 12.2322 8.61414C12.2322 10.3952 10.7807 11.844 8.9973 11.844C7.21389 11.844 5.76241 10.3952 5.76241 8.61414C5.76241 8.20196 6.09696 7.86872 6.50879 7.86872C6.92061 7.86872 7.25516 8.20196 7.25516 8.61414Z"
                      fill="currentColor"
                    />
                  </svg>

                </span>
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

        {/* ✅ Logout */}
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
