"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"


export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login:", formData)
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 400, border: "1px solid #ccc", padding: 24, borderRadius: 8 }}>
        <div style={{ borderTop: "4px solid #0070f3", marginBottom: 24 }}></div>

        <h1 style={{ marginBottom: 8 }}>Login</h1>
        <p style={{ marginBottom: 24 }}>Login with provided email address</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter the Email"
              required
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="password">Password</label>
              <a href="#" style={{ fontSize: "0.875rem", color: "#0070f3" }}>Forgot Password?</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter the password"
                required
                style={{ flex: 1, padding: "8px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ marginLeft: 8, padding: "4px 8px" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" style={{ padding: "10px", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: 4 }}>
            Login →
          </button>
        </form>

        <p style={{ marginTop: 24, textAlign: "center" }}>
          Don’t have an account?{" "}
          <span onClick={() => router.push("/register")} style={{ color: "#0070f3", cursor: "pointer" }}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}
