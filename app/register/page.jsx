"use client"

import { useState } from "react"
import { Mail, Eye, EyeOff, ArrowRight, User } from "lucide-react"
import { AuthInput } from "../components/ui/AuthInput";
import styles from "../page.module.css"
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter(); // initialize router
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle registration logic here
    console.log("Register:", formData)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Blue top border */}
        <div className={styles.topBorder}></div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Sign Up</h1>
            <p className={styles.subtitle}>Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <AuthInput
              id="name"
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              icon={<User size={16} />}
              placeholder="Enter your full name"
              required
            />

            <AuthInput
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail size={16} />}
              placeholder="Enter your email address"
              required
            />

            <div className={styles.passwordWrapper}>
              <label htmlFor="password" className={styles.passwordLabel}>
                Password<span className={styles.required}>*</span>
              </label>
              <div className={styles.passwordInputWrapper}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={styles.passwordInput}
                  placeholder="Enter the password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.toggleButton}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className={styles.passwordWrapper}>
              <label htmlFor="confirmPassword" className={styles.passwordLabel}>
                Confirm Password<span className={styles.required}>*</span>
              </label>
              <div className={styles.passwordInputWrapper}>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={styles.passwordInput}
                  placeholder="Confirm the password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.toggleButton}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign Up
              <ArrowRight size={16} />
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{" "}
              <span onClick={() => router.push("/login")} className={styles.switchLink}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
