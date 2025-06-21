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
            {/* Dashboard */}
            <li>
              <Link
                href="/dashboard"
                className={`sidebar-link ${pathname === "/dashboard" ? "sidebar-link-active" : ""}`}
              >
                <span className="sidebar-icon">
                  {/* Dashboard Icon */}
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
                      d="M18.1522 5.59135C18.8642 6.164 19.2822 7.02551 19.2913 7.93918L19.2826 15.9131C19.2826 18.079 17.5268 19.8348 15.3609 19.8348H13.6217C12.5734 19.8348 11.7222 18.9875 11.7174 17.9392V14.3392C11.7174 14.0606 11.4916 13.8348 11.213 13.8348H8.60435C8.46907 13.8348 8.33945 13.8891 8.24461 13.9856C8.14977 14.0821 8.09767 14.2126 8.1 14.3479V15.7218C8.1 16.154 7.74961 16.5044 7.31739 16.5044C6.88517 16.5044 6.53478 16.154 6.53478 15.7218V14.3479C6.53478 13.7967 6.75374 13.2681 7.14349 12.8783C7.53324 12.4886 8.06185 12.2696 8.61304 12.2696H11.2217C12.3661 12.2744 13.2913 13.2035 13.2913 14.3479V17.9392C13.2913 18.1217 13.4392 18.2696 13.6217 18.2696H15.4043C16.701 18.2696 17.7522 17.2185 17.7522 15.9218V7.95657C17.7458 7.51531 17.5415 7.10027 17.1957 6.82613L11.187 2.03483C10.4293 1.41103 9.33595 1.41103 8.57826 2.03483L6.64783 3.47831C6.29004 3.73524 5.79172 3.65348 5.53478 3.2957C5.27785 2.93791 5.35961 2.43959 5.71739 2.18266L7.62174 0.800047C8.94214 -0.261311 10.8231 -0.261311 12.1435 0.800047L18.1522 5.59135ZM4.42174 18.2609H8.42174V18.2783C8.85396 18.2783 9.20435 18.6287 9.20435 19.0609C9.20435 19.4931 8.85396 19.8435 8.42174 19.8435H4.42174C2.25781 19.8387 0.504782 18.0857 0.5 15.9218V7.95657C0.513835 7.03615 0.945876 6.17206 1.67391 5.60874L2.39565 5.06961C2.73552 4.90939 3.14129 5.01332 3.36229 5.3172C3.58329 5.62107 3.55714 6.03912 3.3 6.31309L2.59565 6.83483C2.26191 7.1121 2.06776 7.52268 2.06522 7.95657V15.9131C2.07474 17.2092 3.12562 18.2562 4.42174 18.2609Z"
                      fill="currentColor"
                    />
                  </svg>


                </span>
                <span className="sidebar-link-text">Dashboard</span>
              </Link>
            </li>

            {/* Leads Management Dropdown */}
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
                <ChevronDownIcon className={`sidebar-dropdown-arrow ${openDropdown === "leads" ? "sidebar-dropdown-arrow-rotated" : ""}`} />
                {!isExpanded && <span className="sidebar-tooltip">Leads Management</span>}
              </div>

              <ul className={`sidebar-submenu ${openDropdown === "leads" ? "sidebar-submenu-expanded" : ""}`}>
                <li><Link href="/dashboard/leads/add" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/add" ? "sidebar-submenu-item-active" : ""}`}><span>Add</span></Link></li>
                <li><Link href="/dashboard/leads/viewLeads" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/viewLeads" ? "sidebar-submenu-item-active" : ""}`}><span>View</span></Link></li>
                <li><Link href="/dashboard/leads/followup" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/followup" ? "sidebar-submenu-item-active" : ""}`}><span>Manage Follow-ups</span></Link></li>
                <li>
                  <Link href="/dashboard/leads/source" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/source" ? "sidebar-submenu-item-active" : ""}`}><span>View Lead Source</span></Link>
                  <Link href="/dashboard/leads/Messages" className={`sidebar-submenu-item ${pathname === "/dashboard/leads/Messages" ? "sidebar-submenu-item-active" : ""}`}><span>Email messages</span></Link>
                </li>
              </ul>
            </li>
            {/* Counsellor Dropdown */}
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


            {/* Application Dropdown */}
            <li>
              <div
                className={`sidebar-dropdown ${pathname.startsWith("/dashboard/application") ? "sidebar-dropdown-active" : ""}`}
                onClick={() => toggleDropdown("application")}
              >
                <span className="sidebar-icon">
                  {/* Application Icon */}
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
                      d="M17.2916 5.55651L12.2421 0.244651C12.1005 0.0956456 11.9061 0.0120816 11.7027 0.0120816H11.4974C11.4884 0.0111764 11.48 0.00864398 11.4717 0.00613002C11.4616 0.00305062 11.4515 0 11.4405 0C11.4289 0 11.4184 0.00312576 11.408 0.00624229C11.3998 0.00871902 11.3915 0.0111899 11.3827 0.0120816H5.07002C2.5926 0.0120816 0.5 2.07702 0.5 4.52152V8.68059C0.5 9.09741 0.834975 9.43569 1.24771 9.43569C1.66045 9.43569 1.99543 9.09741 1.99543 8.68059V4.52152C1.99543 2.89554 3.40312 1.52228 5.07002 1.52228H10.6928V3.68487C10.6928 5.52731 12.1763 7.02844 13.9997 7.03247H14.0007C14.4134 7.03247 14.7474 6.69519 14.7484 6.27939C14.7494 5.86157 14.4154 5.52328 14.0027 5.52228C13.0018 5.52026 12.1882 4.6957 12.1882 3.68487V2.36899L16.0046 6.38309V15.3083C16.0046 17.0028 14.6168 18.4898 13.0347 18.4898H5.07002C3.34629 18.4898 1.99543 17.0924 1.99543 15.3083V12.7853C1.99543 12.3685 1.66045 12.0302 1.24771 12.0302C0.834975 12.0302 0.5 12.3685 0.5 12.7853V15.3083C0.5 17.9391 2.50786 20 5.07002 20H13.0347C15.4553 20 17.5 17.8515 17.5 15.3083V6.08004C17.5 5.88472 17.4252 5.69746 17.2916 5.55651ZM5.87007 14.4053H11.2516C11.6644 14.4053 11.9993 14.0671 11.9993 13.6502C11.9993 13.2334 11.6644 12.8951 11.2516 12.8951H5.87007C5.45734 12.8951 5.12236 13.2334 5.12236 13.6502C5.12236 14.0671 5.45734 14.4053 5.87007 14.4053ZM9.21584 9.41948H5.87007C5.45734 9.41948 5.12236 9.0812 5.12236 8.66438C5.12236 8.24757 5.45734 7.90929 5.87007 7.90929H9.21584C9.62858 7.90929 9.96355 8.24757 9.96355 8.66438C9.96355 9.0812 9.62858 9.41948 9.21584 9.41948Z"
                      fill="currentColor"
                    />
                  </svg>

                </span>
                <span className="sidebar-dropdown-text">Application</span>
                <ChevronDownIcon className={`sidebar-dropdown-arrow ${openDropdown === "application" ? "sidebar-dropdown-arrow-rotated" : ""}`} />
                {!isExpanded && <span className="sidebar-tooltip">Application</span>}
              </div>

              <ul className={`sidebar-submenu ${openDropdown === "application" ? "sidebar-submenu-expanded" : ""}`}>
                <li><Link href="/dashboard/applications/add" className={`sidebar-submenu-item ${pathname === "/dashboard/applications/add" ? "sidebar-submenu-item-active" : ""}`}><span>Generate Application</span></Link></li>
                <li><Link href="/dashboard/applications/view" className={`sidebar-submenu-item ${pathname === "/dashboard/applications/view" ? "sidebar-submenu-item-active" : ""}`}><span>View Application</span></Link></li>
                <li><Link href="/dashboard/application/followup" className={`sidebar-submenu-item ${pathname === "/dashboard/application/followup" ? "sidebar-submenu-item-active" : ""}`}><span>Manage Application Followup</span></Link></li>
                <li><Link href="/dashboard/application/tracking" className={`sidebar-submenu-item ${pathname === "/dashboard/application/tracking" ? "sidebar-submenu-item-active" : ""}`}><span>Application Tracking History</span></Link></li>
              </ul>
            </li>

            {/* Countries Dropdown */}
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
