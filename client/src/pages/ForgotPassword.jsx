import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setSuccess(res.data.message || "Reset link sent! Please check your email.");
      setEmail("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      {/* Video Background (same as login) */}
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

      {/* Forgot Card */}
      <div style={centerWrap}>
        <form onSubmit={handleSubmit} style={card}>
          <img
            src="/images/school-logo.png"
            alt="School Logo"
            style={logo}
          />

          <h1 style={title}>Forgot Password</h1>
          <p style={subtitle}>
            Enter your email address to receive a secure password reset link.
          </p>

          {error && <div style={errorBox}>{error}</div>}
          {success && (
            <div style={successBox}>
              {success}
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#166534" }}>
                💡 <i>Note: If Brevo is not configured, check the backend console output.</i>
              </div>
            </div>
          )}

          <div style={field}>
            <label style={label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={input}
              required
              disabled={loading}
            />
          </div>

          <button style={btn} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

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
  textAlign: "left",
  fontWeight: "500"
};
