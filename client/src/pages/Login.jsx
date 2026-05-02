import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
        "role",
        res.data.role
      );
      localStorage.setItem(
        "name",
        res.data.name
      );

      if (res.data.role === "admin")
        navigate("/");
      else if (
        res.data.role === "parent"
      )
        navigate(
          "/parent-dashboard"
        );
      else
        navigate(
          "/student-dashboard"
        );
    } catch {
      setError(
        "Invalid login credentials"
      );
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
          onSubmit={
            handleSubmit
          }
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
            <div
              style={
                errorBox
              }
            >
              {error}
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
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              style={input}
              required
            />
          </div>

          {/* Password */}
          <div style={field}>
            <label style={label}>
              Password
            </label>

            <div style={passwordWrap}>
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                style={
                  passwordInput
                }
                required
              />

              <span
                style={eye}
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </span>
            </div>
          </div>

          {/* Button */}
          <button style={btn}>
            Sign In
          </button>

          <p style={helpText}>
            Admin | Parent |
            Student Access
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
  fontFamily:
    "Arial, sans-serif"
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
  background:
    "rgba(0,0,0,0.52)"
};

const centerWrap = {
  position: "relative",
  zIndex: 2,
  minHeight: "100vh",
  display: "flex",
  justifyContent:
    "center",
  alignItems: "center",
  padding: "24px"
};

const card = {
  width: "100%",
  maxWidth: "440px",
  background:
    "rgba(255,255,255,0.92)",
  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.65)",
  borderRadius: "30px",
  padding: "42px",
  boxShadow:
    "0 35px 70px rgba(0,0,0,0.28)",
  color: "#0f172a",
  textAlign: "center"
};

const logo = {
  width: "82px",
  height: "82px",
  objectFit: "contain",
  background: "white",
  padding: "10px",
  borderRadius: "20px",
  marginBottom: "16px"
};

const title = {
  margin: 0,
  fontSize: "30px",
  fontWeight: "800",
  color: "#0f172a"
};

const subtitle = {
  marginTop: "8px",
  marginBottom: "26px",
  color: "#64748b",
  fontSize: "14px"
};

const field = {
  marginBottom: "18px",
  textAlign: "left"
};

const label = {
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: "600"
};

const input = {
  width: "100%",
  padding: "15px 16px",
  borderRadius: "16px",
  border: "1px solid #dbe3ef",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none"
};

const passwordWrap = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #dbe3ef",
  borderRadius: "16px",
  background: "#ffffff"
};

const passwordInput = {
  flex: 1,
  padding: "15px 16px",
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
  padding: "16px",
  border: "none",
  borderRadius: "16px",
  background:
    "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "white",
  fontWeight: "700",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
  boxShadow:
    "0 15px 30px rgba(37,99,235,0.28)"
};

const helpText = {
  marginTop: "18px",
  fontSize: "14px",
  color: "#e2e8f0"
};

const errorBox = {
  background:
    "rgba(220,38,38,0.25)",
  border:
    "1px solid rgba(248,113,113,0.45)",
  color: "#fee2e2",
  padding: "12px",
  borderRadius: "12px",
  marginBottom: "18px",
  fontSize: "14px"
};