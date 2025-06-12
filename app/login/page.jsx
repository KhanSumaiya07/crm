"use client"

import { useState } from "react"
import { Mail, Eye, EyeOff, ArrowRight } from "lucide-react"
import styles from "../page.module.css"; 
import { useRouter } from "next/navigation";
import { AuthInput } from "../components/ui/AuthInput";

export default function LoginForm() {
  const router = useRouter(); // initialize router
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login:", formData)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Blue top border */}
        <div className={styles.topBorder}></div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Login</h1>
            <p className={styles.subtitle}>Login with provided email address</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
           
            <AuthInput
              id="email"
              label="Email Address"
              type="email"
              placeholder='Enter the Email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail size={16} />}
              required
            />

            <div className={styles.passwordWrapper}>
              <div className={styles.passwordHeader}>
                <label htmlFor="password" className={styles.passwordLabel}>
                  Password<span className={styles.required}>*</span>
                </label>
                <a href="#" className={styles.forgotLink}>
                  Forgot Password?
                </a>
              </div>
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

            <button type="submit" className={styles.submitButton}>
              Login
              <ArrowRight size={16} />
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{" "}
              <span onClick={() => router.push("/register")} className={styles.switchLink}>
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
