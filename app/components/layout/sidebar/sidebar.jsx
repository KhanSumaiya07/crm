"use client";
import {
  HomeIcon as House,
  UserRoundIcon as UserRoundPen,
  ChevronDown,
  FileIcon as FileUser,
  LogOut,
  MapPinIcon as MapPinCheck,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./style.css";

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = () => {
    setIsClosed(!isClosed);
    if (!isClosed) {
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (dropdownName) => {
    if (!isClosed) {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    }
  };

  const handleLogout = () => {
    // Remove token or clear session
    localStorage.removeItem("token"); // Or use cookies if applicable
    router.push("/login");
  };

  return (
    <aside className={`sidebar ${isClosed ? "close" : ""}`}>
      <div className="toggle" onClick={handleToggle}>
        <ChevronRight />
      </div>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link href="/dashboard" className={`sidebar-link ${pathname === "/dashboard" ? "active" : ""}`} data-tooltip="Dashboard">
                <House className="icon" />
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>

            {/* Leads Dropdown */}
            <li className={`nav-link has-dropdown ${pathname.startsWith("/dashboard/leads") ? "active" : ""}`}>
              <div
                className="sidebar-link dropdown-trigger"
                onClick={() => toggleDropdown("leads")}
                data-tooltip="Leads Management"
              >
                <UserRoundPen className="icon" />
                <span className="nav-text">Leads Management</span>
                <ChevronDown className={`icon dropdown-arrow ${openDropdown === "leads" ? "rotated" : ""}`} />
              </div>
              <ul className={`dropdown-list ${openDropdown === "leads" ? "open" : ""}`}>
                <li className="nav-link">
                  <Link
                    href="/dashboard/leads/add"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/leads/add" ? "active" : ""}`}
                  >
                    <span className="nav-text">Add</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    href="/dashboard/leads/view"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/leads/view" ? "active" : ""}`}
                  >
                    <span className="nav-text">View</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    href="/dashboard/leads/followup"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/leads/followup" ? "active" : ""}`}
                  >
                    <span className="nav-text">Manage Follow-ups</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    href="/dashboard/leads/source"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/leads/source" ? "active" : ""}`}
                  >
                    <span className="nav-text">View Lead Source</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Application Dropdown */}
            <li className={`nav-link has-dropdown ${pathname.startsWith("/dashboard/application") ? "active" : ""}`}>
              <div
                className="sidebar-link dropdown-trigger"
                onClick={() => toggleDropdown("application")}
                data-tooltip="Application"
              >
                <FileUser className="icon" />
                <span className="nav-text">Application</span>
                <ChevronDown className={`icon dropdown-arrow ${openDropdown === "application" ? "rotated" : ""}`} />
              </div>
              <ul className={`dropdown-list ${openDropdown === "application" ? "open" : ""}`}>
                <li className="nav-link">
                  <Link
                    href="/dashboard/application/generate"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/application/generate" ? "active" : ""}`}
                  >
                    <span className="nav-text">Generate Application</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    href="/dashboard/application/view"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/application/view" ? "active" : ""}`}
                  >
                    <span className="nav-text">View Application</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    href="/dashboard/application/followup"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/application/followup" ? "active" : ""}`}
                  >
                    <span className="nav-text">Manage Application Followup</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    href="/dashboard/application/tracking"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/application/tracking" ? "active" : ""}`}
                  >
                    <span className="nav-text">Application Tracking History</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Countries Dropdown */}
            <li className={`nav-link has-dropdown ${pathname.startsWith("/dashboard/countries") ? "active" : ""}`}>
              <div
                className="sidebar-link dropdown-trigger"
                onClick={() => toggleDropdown("countries")}
                data-tooltip="Countries"
              >
                <MapPinCheck className="icon" />
                <span className="nav-text">Countries</span>
                <ChevronDown className={`icon dropdown-arrow ${openDropdown === "countries" ? "rotated" : ""}`} />
              </div>
              <ul className={`dropdown-list ${openDropdown === "countries" ? "open" : ""}`}>
                <li className="nav-link">
                  <Link
                    href="/dashboard/countries/view"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/countries/view" ? "active" : ""}`}
                  >
                    <span className="nav-text">View</span>
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    href="/dashboard/countries/all"
                    className={`dropdown-item sidebar-link ${pathname === "/dashboard/countries/all" ? "active" : ""}`}
                  >
                    <span className="nav-text">All Countries</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="nav-link">
            <button onClick={handleLogout} className="sidebar-link" data-tooltip="Logout">
              <LogOut className="icon" />
              <span className="nav-text">Logout</span>
            </button>
          </li>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
