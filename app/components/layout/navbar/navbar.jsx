"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // adjust this path if needed
import { BellRing, UserRound } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.navigationBar}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="/eduwire-white-logo.png" alt="Logo" />
        </div>
        <div className={styles.headerRight}>
          <BellRing />
          <span>Hello, {userName}</span>
          <div className={styles.profileUser}>
            <UserRound />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
