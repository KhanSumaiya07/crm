"use client"

import { useState } from "react"
import { Mail, Eye, EyeOff, ArrowRight, User, Phone } from "lucide-react"
import { AuthInput } from "../components/ui/AuthInput";
import styles from "../page.module.css"
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase"; // adjust path if needed
import { ToastContainer ,  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
    const router = useRouter(); // initialize router
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
     mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    await updateProfile(userCredential.user, {
      displayName: formData.name,
    });

    toast.success("Registration successful!");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error) {
    toast.error("already registered");
  }
};
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
  id="mobile"
  label="Mobile Number"
  type="tel"
  value={formData.mobile}
  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
  icon={<Phone size={16} />}
  placeholder="Enter your mobile number"
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
      <ToastContainer
  position="top-center"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnHover
  theme="colored"
/>

    </div>
  )
}
