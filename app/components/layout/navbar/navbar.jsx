"use client"

import { useState } from "react"
import { BellIcon, UserIcon } from "lucide-react"
import Image from "next/image"
import "./navbar.css"

const Navbar = () => {
  // Replace Firebase auth with a static username
  const [userName] = useState("User")

  return (
    <div className="navbar">
      <nav className="navbar-container">
        <div className="navbar-logo">
          <Image src="/eduwire-white-logo.png" alt="Logo" fill className="object-contain" priority />
        </div>

        <div className="navbar-actions">
          <button className="navbar-notification-button">
            <BellIcon className="navbar-notification-icon" />
            <span className="navbar-notification-badge"></span>
          </button>

          <span className="navbar-username">Hello, {userName}</span>

          <div className="navbar-avatar">
            <UserIcon className="navbar-avatar-icon" />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
