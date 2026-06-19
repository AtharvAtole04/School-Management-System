import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegisterParent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    childName: "",
    childRollNumber: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register-parent", {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        childName: formData.childName,
        childRollNumber: formData.childRollNumber,
        password: formData.password
      });

      setSuccess(res.data.message || "Registration successful! Please check your email.");
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        address: "",
        childName: "",
        childRollNumber: "",
        password: "",
        confirmPassword: ""
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please check details and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <video autoPlay muted loop playsInline style={videoBg}>
        <source src="/videos/school-campus.mp4" type="video/mp4" />
      </video>
      <div style={overlay}></div>

      <div style={centerWrap}>
        <form onSubmit={handleSubmit} style={card}>
          <img src="/images/school-logo.png" alt="School Logo" style={logo} />
          
          <h1 style={title}>Parent Portal Registration</h1>
          <p style={subtitle}>Create an account to track your child's fees and performance.</p>

          {error && <div style={errorBox}>{error}</div>}
          {success && (
            <div style={successBox}>
              {success}
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#166534" }}>
                💡 <i>Note: Check the backend console if Brevo API keys are not set.</i>
              </div>
            </div>
          )}

          <div style={grid}>
            <div style={field}>
              <label style={label}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                style={input}
                required
                disabled={loading}
              />
            </div>

            <div style={field}>
              <label style={label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                style={input}
                required
                disabled={loading}
              />
            </div>

            <div style={field}>
              <label style={label}>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                style={input}
                required
                disabled={loading}
              />
            </div>

            <div style={field}>
              <label style={label}>Home Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter residential address"
                style={input}
                required
                disabled={loading}
              />
            </div>

            <div style={field}>
              <label style={label}>Child's Full Name</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                placeholder="Enter child's full name"
                style={input}
                required
                disabled={loading}
              />
            </div>

            <div style={field}>
              <label style={label}>Child's Roll Number</label>
              <input
                type="text"
                name="childRollNumber"
                value={formData.childRollNumber}
                onChange={handleChange}
                placeholder="Enter child's roll number"
                style={input}
                required
                disabled={loading}
              />
            </div>

            <div style={field}>
              <label style={label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                style={input}
                required
                disabled={loading}
              />
            </div>

            <div style={field}>
              <label style={label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                style={input}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button style={btn} disabled={loading}>
            {loading ? "Registering..." : "Register Account"}
          </button>

          <div style={backToLogin}>
            <span style={{ fontSize: "14px", color: "#64748b" }}>Already have an account? </span>
            <Link to="/login" style={backLink}>
              Sign In
            </Link>
          </div>
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
  background: "rgba(15, 23, 42, 0.65)"
};

const centerWrap = {
  position: "relative",
  zIndex: 2,
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 24px"
};

const card = {
  width: "100%",
  maxWidth: "750px", // Wider card for grid layout
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
  width: "70px",
  height: "70px",
  objectFit: "contain",
  background: "white",
  padding: "6px",
  borderRadius: "14px",
  marginBottom: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const title = {
  margin: 0,
  fontSize: "26px",
  fontWeight: "800",
  color: "#1e3a8a"
};

const subtitle = {
  marginTop: "6px",
  marginBottom: "24px",
  color: "#475569",
  fontSize: "14px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "18px",
  marginBottom: "24px"
};

const field = {
  textAlign: "left"
};

const label = {
  display: "block",
  marginBottom: "6px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#334155"
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: "14px",
  boxSizing: "border-box",
  outline: "none"
};

const btn = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  color: "white",
  fontWeight: "700",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.3)"
};

const backToLogin = {
  marginTop: "24px",
  paddingTop: "16px",
  borderTop: "1px solid #e2e8f0"
};

const backLink = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#1e3a8a",
  textDecoration: "none"
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
