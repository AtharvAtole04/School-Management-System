import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function PayFees() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/payments/pay", {
        studentId: id,
        amount: Number(amount),
        method
      });

      alert("Fees Paid Successfully");
      navigate("/payments");
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <Layout>
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "white",
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 8px 22px rgba(0,0,0,0.06)"
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>Pay Student Fees</h1>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>
          Enter payment details below.
        </p>

        {/* Summary Box */}
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            padding: "16px",
            borderRadius: "12px",
            marginBottom: "22px"
          }}
        >
          <p><strong>Student ID:</strong> {id}</p>
          <p><strong>Status:</strong> Ready for payment</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={label}>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={input}
          />

          <label style={label}>Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={input}
          >
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>

          <button type="submit" style={button} disabled={loading}>
            {loading ? "Processing..." : "Submit Payment"}
          </button>
        </form>

        <p
          style={{
            marginTop: "18px",
            color: "#64748b",
            fontSize: "14px",
            textAlign: "center"
          }}
        >
          Payments are securely recorded in the system.
        </p>
      </div>
        </div>
  </Layout>
);
}

const label = {
  display: "block",
  marginBottom: "8px",
  marginTop: "14px",
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
  width: "100%",
  marginTop: "24px",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "#2563eb",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer"
};