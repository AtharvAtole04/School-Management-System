import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function EditStudent() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      const student = res.data.find((item) => item._id === id);

      if (student) {
        setFormData(student);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/students/${id}`,
        formData
      );

      alert("Student Updated Successfully");
      navigate("/students");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div style={centerBox}>
        <h2>Loading student data...</h2>
      </div>
    );
  }

  return (
  <Layout>
    <div style={page}>
      <div style={card}>
        <h1 style={{ marginBottom: "8px" }}>Edit Student</h1>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>
          Update student information carefully. Humans make records messy enough already.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={grid}>
            <Field label="Full Name">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                style={input}
              />
            </Field>

            <Field label="Class">
              <input
                name="className"
                value={formData.className}
                onChange={handleChange}
                style={input}
              />
            </Field>

            <Field label="Roll Number">
              <input
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                style={input}
              />
            </Field>

            <Field label="Parent Name">
              <input
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                style={input}
              />
            </Field>

            <Field label="Mobile Number">
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                style={input}
              />
            </Field>

            <Field label="Total Fees">
              <input
                name="totalFees"
                value={formData.totalFees}
                onChange={handleChange}
                style={input}
              />
            </Field>

            <Field label="Paid Fees">
              <input
                name="paidFees"
                value={formData.paidFees}
                onChange={handleChange}
                style={input}
              />
            </Field>
          </div>

          <button type="submit" style={button}>
            Update Student
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
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const centerBox = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  width: "100%",
  maxWidth: "850px",
  background: "white",
  padding: "35px",
  borderRadius: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "18px"
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#334155"
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  outline: "none"
};

const button = {
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