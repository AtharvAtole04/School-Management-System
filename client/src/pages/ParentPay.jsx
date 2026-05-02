import { useState } from "react";
import axios from "axios";
import ParentLayout from "../components/ParentLayout";
import { useNavigate } from "react-router-dom";

export default function ParentPay() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handlePay = async (e) => {
    e.preventDefault();

    try {
     

      // Temporary hardcoded student id
      const token = localStorage.getItem("token");

const profileRes = await axios.get(
  "http://localhost:5000/api/auth/profile",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

const studentId = profileRes.data.studentId;

      await axios.post(
        "http://localhost:5000/api/payments/pay",
        {
          studentId,
          amount,
          method: "UPI"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Payment Successful");
      navigate("/parent-payments");

    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <ParentLayout>
      <h1>Pay Fees</h1>

      <form onSubmit={handlePay} style={box}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={input}
        />

        <button type="submit" style={btn}>
          Pay Now
        </button>
      </form>
    </ParentLayout>
  );
}

const box = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
  maxWidth: "500px"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px"
};

const btn = {
  padding: "12px 18px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};