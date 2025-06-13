"use client";


import { BellRing, UserRound } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
 

 

  return (
    <div className={styles.navigationBar}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="/eduwire-white-logo.png" alt="Logo" />
        </div>
        <div className={styles.headerRight}>
          <BellRing />
          <span>Hello, pranshu</span>
          <div className={styles.profileUser}>
            <UserRound />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
