"use client";

import { useSelector, useDispatch } from "react-redux";
import { BellIcon, UserIcon, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logoutUser } from "../../../../store/userSlice"; // adjust path if needed
import "./navbar.css";

const Navbar = () => {
  

  const userName = useSelector((state) => state.user.name) || "User";

  

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
  );
};

export default Navbar;
