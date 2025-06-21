"use client"

import { useState } from "react"
import styles from "./style.module.css"
import axios from "axios"
import { toast } from "react-toastify"

export default function AddCounsellorForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    whatsapp: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post("/api/counsellor/create", {
        ...form,
        role: "counsellor",
      })

      toast.success("Counsellor added successfully!")
      setForm({ name: "", email: "", password: "", phone: "", whatsapp: "" })
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding counsellor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Counsellor</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>WhatsApp Number</label>
          <input
            type="text"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            required
          />
        </div>

        <button className={styles.button} disabled={loading}>
          {loading ? "Adding..." : "Add Counsellor"}
        </button>
      </form>
    </div>
  )
}
