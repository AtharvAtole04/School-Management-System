import { useEffect, useState } from "react";
import axios from "axios";
import ParentLayout from "../components/ParentLayout";
import { useNavigate } from "react-router-dom";

export default function ParentPayments() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/payments/my-payments",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setPayments(res.data);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <ParentLayout>
      <h1>My Payments</h1>

      <p style={{ color: "#64748b", marginBottom: "20px" }}>
        Real payment history from database.
      </p>
      <button
  style={payBtn}
  onClick={() => navigate("/parent-pay")}
>
  Pay Fees
</button>

      <div style={box}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr style={{ background: "#e2e8f0" }}>
              <th style={th}>Student</th>
              <th style={th}>Amount</th>
              <th style={th}>Method</th>
              <th style={th}>Date</th>
              
            </tr>
          </thead>

          <tbody>
            {payments.map((pay) => (
              <tr key={pay._id}>
                <td style={td}>
                  {pay.studentId?.fullName}
                </td>
                <td style={td}>₹{pay.amount}</td>
                <td style={td}>{pay.method}</td>
                <td style={td}>
                  {new Date(
                    pay.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ParentLayout>
  );
}

const box = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.05)"
};

const th = {
  padding: "12px",
  textAlign: "left"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb"
};

const payBtn = {
  marginBottom: "20px",
  padding: "12px 18px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600"
};