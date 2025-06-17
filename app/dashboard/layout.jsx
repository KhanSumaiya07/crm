"use client";

import { useState } from "react";
import Navbar from "../components/layout/navbar/navbar";
import Sidebar from "../components/layout/sidebar/sidebar";
import "./layout.css";


export default function DashboardLayout({ children }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content-wrapper">
        <Sidebar onToggle={handleSidebarToggle} />
        <main
          className={`dashboard-main ${
            sidebarExpanded
              ? "dashboard-main-expanded"
              : "dashboard-main-collapsed"
          }`}
        >
          <div className="dashboard-container">{children}</div>
        </main>
      </div>
    </div>
  );
}
