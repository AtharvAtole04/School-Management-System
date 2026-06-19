import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Clear session on login page load (handles logout cleanly)
  useEffect(() => {
    localStorage.clear();

    // Check URL parameters for email verification notifications
    const params = new URLSearchParams(window.location.search);
    const verify = params.get("verify");
    if (verify === "success") {
      setSuccess("Email verified successfully! Your account is now pending admin approval.");
    } else if (verify === "failed") {
      setError("Invalid or expired verification link.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      if (res.data.role === "admin") navigate("/");
      else if (res.data.role === "parent") navigate("/parent-dashboard");
      else navigate("/student-dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid login credentials");
      }
    }
  };

  return (
    <div style={page}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={videoBg}
      >
        <source
          src="/videos/school-campus.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div style={overlay}></div>

      {/* Login Card */}
      <div style={centerWrap}>
        <form
          onSubmit={handleSubmit}
          style={card}
        >
          {/* Logo */}
          <img
            src="/images/school-logo.png"
            alt="School Logo"
            style={logo}
          />

          <h1 style={title}>
            Bright Future School
          </h1>

          <p style={subtitle}>
            Digital Campus Portal
          </p>

          {error && (
            <div style={errorBox}>
              {error}
            </div>
          )}

          {success && (
            <div style={successBox}>
              {success}
            </div>
          )}

          {/* Email */}
          <div style={field}>
            <label style={label}>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              style={input}
              required
            />
          </div>

          {/* Password */}
          <div style={field}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ ...label, marginBottom: 0 }}>
                Password
              </label>
              <Link to="/forgot-password" style={forgotLink}>
                Forgot Password?
              </Link>
            </div>

            <div style={passwordWrap}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                style={passwordInput}
                required
              />

              <span
                style={eye}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Button */}
          <button style={btn}>
            Sign In
          </button>

          {/* Registration Options */}
          <div style={regContainer}>
            <p style={regTitle}>New to the portal?</p>
            <div style={regLinksRow}>
              <Link to="/register-parent" style={regLink}>
                Register as Parent
              </Link>
              <span style={{ color: "#cbd5e1" }}>|</span>
              <Link to="/register-student" style={regLink}>
                Register as Student
              </Link>
            </div>
          </div>

          <p style={helpText}>
            Admin | Parent | Student Access
          </p>
        </form>
      </div>
    </div>
  );
}

/* Styles */

const page = {
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif"
};

const videoBg = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const overlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(15, 23, 42, 0.65)" // Sleek dark blue tint overlay
};

const centerWrap = {
  position: "relative",
  zIndex: 2,
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px"
};

const card = {
  width: "100%",
  maxWidth: "450px",
  background: "rgba(255, 255, 255, 0.88)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  borderRadius: "24px",
  padding: "40px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
  color: "#0f172a",
  textAlign: "center"
};

const logo = {
  width: "80px",
  height: "80px",
  objectFit: "contain",
  background: "white",
  padding: "8px",
  borderRadius: "16px",
  marginBottom: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const title = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "800",
  color: "#1e3a8a" // School brand deep blue
};

const subtitle = {
  marginTop: "6px",
  marginBottom: "24px",
  color: "#475569",
  fontSize: "14px",
  fontWeight: "500"
};

const field = {
  marginBottom: "18px",
  textAlign: "left"
};

const label = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  color: "#334155"
};

const forgotLink = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#2563eb",
  textDecoration: "none"
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.2s"
};

const passwordWrap = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  background: "#ffffff"
};

const passwordInput = {
  flex: 1,
  padding: "14px 16px",
  border: "none",
  background: "transparent",
  color: "#0f172a",
  fontSize: "15px",
  outline: "none"
};

const eye = {
  padding: "0 14px",
  cursor: "pointer",
  userSelect: "none"
};

const btn = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  color: "white",
  fontWeight: "700",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "8px",
  boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.3)"
};

const regContainer = {
  marginTop: "24px",
  paddingTop: "16px",
  borderTop: "1px solid #e2e8f0"
};

const regTitle = {
  fontSize: "13px",
  color: "#64748b",
  margin: "0 0 8px 0"
};

const regLinksRow = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px"
};

const regLink = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1e3a8a",
  textDecoration: "none"
};

const helpText = {
  marginTop: "20px",
  fontSize: "13px",
  color: "#64748b"
};

const errorBox = {
  background: "#fef2f2",
  border: "1px solid #fca5a5",
  color: "#b91c1c",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "18px",
  fontSize: "14px",
  textAlign: "left",
  fontWeight: "500"
};

const successBox = {
  background: "#f0fdf4",
  border: "1px solid #86efac",
  color: "#15803d",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "18px",
  fontSize: "14px",
  textAlign: "left",
  fontWeight: "500"
};