import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    className: "",
    rollNo: "",
    parentName: "",
    mobile: "",
    totalFees: "",
    paidFees: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/students/add",
        formData
      );

      alert("Student Added Successfully");
      navigate("/students");
    } catch (error) {
      console.log(error);
      alert("Error adding student");
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "850px",
            background: "white",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
          }}
        >
          <h1 style={{ marginBottom: "8px" }}>
            Add New Student
          </h1>

          <p
            style={{
              color: "#64748b",
              marginBottom: "25px"
            }}
          >
            Enter student and parent details below.
          </p>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(250px,1fr))",
                gap: "18px"
              }}
            >
              <Field label="Full Name">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </Field>

              <Field label="Class">
                <input
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </Field>

              <Field label="Roll Number">
                <input
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </Field>

              <Field label="Parent Name">
                <input
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </Field>

              <Field label="Mobile Number">
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </Field>

              <Field label="Total Fees">
                <input
                  name="totalFees"
                  value={formData.totalFees}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </Field>

              <Field label="Paid Fees">
                <input
                  name="paidFees"
                  value={formData.paidFees}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </Field>
            </div>

            <button
              type="submit"
              style={submitBtn}
            >
              Add Student
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
      </label>
      {children}
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#334155"
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  outline: "none"
};

const submitBtn = {
  marginTop: "28px",
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "#2563eb",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer"
};