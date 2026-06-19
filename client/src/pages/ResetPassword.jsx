import { useState } from "react";
import axios from "react-router-dom"; // Wait, we need useParams from react-router-dom!
import { useParams, Link } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [formData, setFormData] = useState({
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
      return setError("Password must be at least 6 characters long");
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        password: formData.password
      });

      setSuccess(res.data.message || "Password reset successfully!");
      setFormData({ password: "", confirmPassword: "" });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid or expired password reset link");
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
          <h1 style={title}>Reset Password</h1>
          <p style={subtitle}>Enter your new secure password below.</p>

          {error && <div style={errorBox}>{error}</div>}
          {success && (
            <div style={successBox}>
              {success}
              <div style={{ marginTop: "15px" }}>
                <Link to="/login" style={loginBtn}>Go to Sign In</Link>
              </div>
            </div>
          )}

          {!success && (
            <>
              <div style={field}>
                <label style={label}>New Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  style={input}
                  required
                  disabled={loading}
                />
              </div>

              <div style={field}>
                <label style={label}>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  style={input}
                  required
                  disabled={loading}
                />
              </div>

              <button style={btn} disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

          <div style={backToLogin}>
            <Link to="/login" style={backLink}>
              ← Back to Sign In
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
  fontSize: "26px",
  fontWeight: "800",
  color: "#1e3a8a"
};

const subtitle = {
  marginTop: "6px",
  marginBottom: "24px",
  color: "#475569",
  fontSize: "14px",
  lineHeight: "1.5"
};

const field = {
  marginBottom: "20px",
  textAlign: "left"
};

const label = {
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#334155"
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
  outline: "none"
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
  boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.3)"
};

const loginBtn = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#15803d",
  color: "white",
  textDecoration: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "700"
};

const backToLogin = {
  marginTop: "24px",
  paddingTop: "16px",
  borderTop: "1px solid #e2e8f0"
};

const backLink = {
  fontSize: "14px",
  fontWeight: "600",
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
  textAlign: "center",
  fontWeight: "500"
};
