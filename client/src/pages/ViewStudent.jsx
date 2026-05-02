import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(search.toLowerCase())
  );

 return (
  <Layout>
    <div style={{ padding: "0px" }}>
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 6px 14px rgba(0,0,0,0.05)"
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "15px"
          }}
        >
          <h1 style={{ margin: 0 }}>Student Records</h1>

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 14px",
              width: "260px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1"
            }}
          />
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr style={{ background: "#e2e8f0", textAlign: "left" }}>
                <th style={th}>Name</th>
                <th style={th}>Class</th>
                <th style={th}>Roll</th>
                <th style={th}>Parent</th>
                <th style={th}>Total</th>
                <th style={th}>Paid</th>
                <th style={th}>Pending</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={td}>{student.fullName}</td>
                  <td style={td}>{student.className}</td>
                  <td style={td}>{student.rollNo}</td>
                  <td style={td}>{student.parentName}</td>
                  <td style={td}>₹{student.totalFees}</td>
                  <td style={td}>₹{student.paidFees}</td>
                  <td style={td}>₹{student.totalFees - student.paidFees}</td>

                  <td style={td}>
                    <Link to={`/edit-student/${student._id}`}>
                      <button style={editBtn}>Edit</button>
                    </Link>

                    <Link to={`/pay-fees/${student._id}`}>
                      <button style={payBtn}>Pay</button>
                    </Link>

                    <button
                      style={deleteBtn}
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </div>
  </Layout>
);
}

const th = {
  padding: "14px"
};

const td = {
  padding: "14px"
};

const editBtn = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  marginRight: "6px",
  cursor: "pointer"
};

const payBtn = {
  background: "#10b981",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  marginRight: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer"
};