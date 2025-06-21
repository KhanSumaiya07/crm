"use client";

import { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { AuthInput } from "../components/ui/AuthInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); // Just for UI

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
            role: selectedRole, 
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success("Login successful!");

        // Save token in cookie
        document.cookie = `token=${data.token}; path=/`;

        // Set in Redux
        dispatch(
          setUser({
            token: data.token,
            userId: data.userId,
            role: data.role,
            name:data.name
          })
        );

        // Redirect based on role returned by server
        if (data.role === "admin" || data.role === "counsellor") {
          router.push("/dashboard");
        } else {
          toast.error("Access denied for this role.");
        }
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <div className={styles.mainWrappper}>
      <div className={styles.container}>
        <div className={styles.card}>
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
                placeholder="Enter the Email"
                value={formData.email}
                onChange={(e) =>
                  setformData({ ...formData, email: e.target.value })
                }
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
                    onChange={(e) =>
                      setformData({ ...formData, password: e.target.value })
                    }
                    className={styles.passwordInput}
                    placeholder="Enter the password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.toggleButton}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Just UI: Role Dropdown */}
              <div className={styles.inputGroup}>
                <label htmlFor="Type" className={styles.label}>
                  Select Role <span className={styles.required}>*</span>
                </label>
                <select
                  id="Type"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="">-- Choose Type --</option>
                  <option value="admin">Admin</option>
                  <option value="counsellor">Counsellor</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className={styles.footer}>
              <p className={styles.footerText}>
                Don't have an account?{" "}
                <span
                  onClick={() => router.push("/register")}
                  className={styles.switchLink}
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
