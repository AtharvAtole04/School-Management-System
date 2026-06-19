import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        setSuccess(res.data.message || "Email verified successfully!");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Invalid or expired email verification link");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setError("No verification token provided");
      setLoading(false);
    }
  }, [token]);

  return (
    <div style={page}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <video autoPlay muted loop playsInline style={videoBg}>
        <source src="/videos/school-campus.mp4" type="video/mp4" />
      </video>
      <div style={overlay}></div>

      <div style={centerWrap}>
        <div style={card}>
          <img src="/images/school-logo.png" alt="School Logo" style={logo} />
          
          <h1 style={title}>Email Verification</h1>
          <p style={subtitle}>Verifying your email address with the campus portal...</p>

          {loading && (
            <div style={loadingContainer}>
              <div style={spinner}></div>
              <p style={{ marginTop: "15px", color: "#64748b", fontWeight: "600" }}>Verifying, please wait...</p>
            </div>
          )}

          {!loading && error && (
            <div>
              <div style={errorBox}>{error}</div>
              <p style={infoText}>Make sure the verification link matches the email sent to you, or try registering again.</p>
              <div style={{ marginTop: "20px" }}>
                <Link to="/login" style={btnLink}>Back to Login</Link>
              </div>
            </div>
          )}

          {!loading && success && (
            <div>
              <div style={successBox}>{success}</div>
              <p style={infoText}>Your account is now awaiting verification and approval by the administrator. You will receive an email notification once your portal access is approved.</p>
              <div style={{ marginTop: "20px" }}>
                <Link to="/login" style={btnLinkSuccess}>Back to Login</Link>
              </div>
            </div>
          )}
        </div>
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

const infoText = {
  color: "#475569",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "15px 0"
};

const loadingContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px"
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid rgba(30, 58, 138, 0.1)",
  borderTop: "4px solid #1e3a8a",
  borderRadius: "50%",
  animation: "spin 1s linear infinite"
};

// Styles for custom animation inside inline style is hard, so we just use standard spin styles.

const btnLink = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: "#1e3a8a",
  color: "white",
  textDecoration: "none",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "700",
  boxShadow: "0 4px 12px rgba(30, 58, 138, 0.2)"
};

const btnLinkSuccess = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: "#15803d",
  color: "white",
  textDecoration: "none",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "700",
  boxShadow: "0 4px 12px rgba(21, 128, 61, 0.2)"
};

const errorBox = {
  background: "#fef2f2",
  border: "1px solid #fca5a5",
  color: "#b91c1c",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "18px",
  fontSize: "14px",
  textAlign: "center",
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
