import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      setPayments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredPayments = payments.filter((pay) =>
    pay.studentId?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = payments.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
  <Layout>
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "30px"
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
          marginBottom: "25px"
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>Payment History</h1>
        <p style={{ color: "#64748b" }}>
          View all fee transactions and receipts.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
          marginBottom: "25px"
        }}
      >
        <Card title="Total Transactions" value={payments.length} color="#3b82f6" />
        <Card title="Total Collected" value={`₹${totalAmount}`} color="#10b981" />
        <Card title="UPI Payments" value="Most Used" color="#8b5cf6" />
      </div>

      {/* Table Section */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 6px 14px rgba(0,0,0,0.05)"
        }}
      >
        {/* Search */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "300px",
              maxWidth: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1"
            }}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr style={{ background: "#e2e8f0", textAlign: "left" }}>
                <th style={th}>Student</th>
                <th style={th}>Amount</th>
                <th style={th}>Method</th>
                <th style={th}>Transaction ID</th>
                <th style={th}>Date</th>
                <th style={th}>Receipt</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((pay) => (
                <tr
                  key={pay._id}
                  style={{ borderBottom: "1px solid #e5e7eb" }}
                >
                  <td style={td}>{pay.studentId?.fullName}</td>
                  <td style={td}>₹{pay.amount}</td>
                  <td style={td}>
                    <span style={badge}>
                      {pay.method}
                    </span>
                  </td>
                  <td style={td}>{pay.transactionId}</td>
                  <td style={td}>
                    {new Date(pay.createdAt).toLocaleDateString()}
                  </td>
                  <td style={td}>
                    <a
                      href={`http://localhost:5000/api/payments/receipt/${pay._id}`}
                      target="_blank"
                      rel="noreferrer"
                      style={receiptBtn}
                    >
                      Receipt
                    </a>
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

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "14px",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 6px 14px rgba(0,0,0,0.05)"
      }}
    >
      <p style={{ color: "#64748b", marginBottom: "10px" }}>{title}</p>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );
}

const th = {
  padding: "14px"
};

const td = {
  padding: "14px"
};

const badge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 10px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600"
};

const receiptBtn = {
  textDecoration: "none",
  background: "#2563eb",
  color: "white",
  padding: "8px 12px",
  borderRadius: "8px",
  fontSize: "14px"
};