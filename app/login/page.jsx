"use client";

import { useState } from "react";
import { Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { AuthInput } from "../components/ui/AuthInput";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        Type: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Placeholder for your own authentication logic
        if (formData.email === "admin@example.com" && formData.password === "123456") {
            toast.success("Login successful!");
            router.push("/dashboard");
        } else {
            toast.error("Invalid email or password");
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

                            <div className={styles.inputGroup}>
                                <label htmlFor="Type" className={styles.label}>
                                    Select Type<span className={styles.required}>*</span>
                                </label>
                                <select
                                    id="Type"
                                    value={formData.Type}
                                    onChange={(e) => setFormData({ ...formData, Type: e.target.value })}
                                    className={styles.select}
                                    required
                                >
                                    <option value="">-- Choose Type --</option>
                                    <option value="admin">Admin</option>
                                    <option value="counsellor">Counsellor</option>
                                    <option value="student">Student</option>
                                </select>
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

                        {/* You can replace this with your own OAuth logic later */}
                        <p className={styles.orText}>or</p>
                        <button disabled className={styles.googleButton}>
                            <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" className={styles.icon} />
                            Continue with Google (Coming Soon)
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" />
        </div>
    );
}
