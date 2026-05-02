import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParentLayout from "../components/ParentLayout";

export default function ParentDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Parent";

  const [time, setTime] = useState(new Date());

  const data = {
    childName: "Rahul Student",
    className: "10th A",
    rollNo: "23",
    totalFees: 50000,
    paidFees: 35000,
    attendance: 92,
    rank: 7,
    teacher: "Mrs Sharma",
    bus: "Route 4",
    section: "A",
    blood: "B+",
    nextExam: "12 May",
    homework: "Math Chapter 6",
    libraryBooks: 2
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pending = data.totalFees - data.paidFees;
  const progress = Math.round(
    (data.paidFees / data.totalFees) * 100
  );

  return (
    <ParentLayout>
      <div
        style={{
          background: "#f1f5f9",
          minHeight: "100vh",
          padding: "10px"
        }}
      >
        {/* HERO */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)",
            color: "white",
            borderRadius: "22px",
            padding: "35px",
            boxShadow:
              "0 20px 30px rgba(0,0,0,0.08)",
            marginBottom: "25px",
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr",
            gap: "20px",
            alignItems: "center"
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "34px"
              }}
            >
              Welcome, {name}
            </h1>

            <p
              style={{
                marginTop: "12px",
                color: "#cbd5e1",
                fontSize: "16px"
              }}
            >
              Everything important about your child, in one dashboard 
            </p>

            <div
              style={{
                marginTop: "18px",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap"
              }}
            >
              <button
                style={heroBtnBlue}
                onClick={() =>
                  navigate("/parent-pay")
                }
              >
                Pay Fees
              </button>

              <button
                style={heroBtnDark}
                onClick={() =>
                  navigate("/parent-payments")
                }
              >
                Payment History
              </button>
            </div>
          </div>

          <div
            style={{
              background:
                "rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "22px",
              textAlign: "center"
            }}
          >
            <h2 style={{ margin: 0 }}>
              {time.toLocaleTimeString()}
            </h2>

            <p
              style={{
                marginTop: "10px",
                color: "#cbd5e1"
              }}
            >
              {time.toDateString()}
            </p>

            <div
              style={{
                marginTop: "14px",
                fontSize: "14px",
                color: "#e2e8f0"
              }}
            >
              Attendance: {data.attendance}%
            </div>
          </div>
        </div>

        {/* TOP STATS */}
        <div style={grid}>
          <StatCard icon="🎓" title="Student" value={data.childName} color="#2563eb" />
          <StatCard icon="🏫" title="Class" value={data.className} color="#9333ea" />
          <StatCard icon="💰" title="Total Fees" value={`₹${data.totalFees}`} color="#0ea5e9" />
          <StatCard icon="✅" title="Paid Fees" value={`₹${data.paidFees}`} color="#16a34a" />
          <StatCard icon="📌" title="Pending Fees" value={`₹${pending}`} color="#f59e0b" />
          <StatCard icon="🏆" title="Rank" value={`${data.rank}th`} color="#ef4444" />
        </div>

        {/* MAIN PANELS */}
        <div style={twoGrid}>
          {/* Better Fee Overview */}
          <Panel title="Fee Overview">
            <FeeRow label="Annual Fees" value={`₹${data.totalFees}`} />
            <FeeRow label="Paid Amount" value={`₹${data.paidFees}`} />
            <FeeRow label="Pending Amount" value={`₹${pending}`} />
            <FeeRow label="Next Due Date" value="30 April" />
            <FeeRow label="Payment Method" value="UPI / Card / Cash" />

            <div style={{ marginTop: "18px" }}>
              <div style={progressBg}>
                <div
                  style={{
                    ...progressFill,
                    width: `${progress}%`
                  }}
                />
              </div>

              <p
                style={{
                  marginTop: "10px",
                  color: "#64748b",
                  fontWeight: "600"
                }}
              >
                {progress}% Fees Completed
              </p>
            </div>
          </Panel>

          {/* Better Student Profile */}
          <Panel title="Student Profile">
            <ProfileGrid>
              <MiniInfo title="Roll No" value={data.rollNo} />
              <MiniInfo title="Section" value={data.section} />
              <MiniInfo title="Teacher" value={data.teacher} />
              <MiniInfo title="Bus Route" value={data.bus} />
              <MiniInfo title="Blood Group" value={data.blood} />
              <MiniInfo title="Attendance" value={`${data.attendance}%`} />
            </ProfileGrid>
          </Panel>
        </div>

        {/* SCHOOL INFO */}
        <div style={twoGrid}>
          {/* Better Notices */}
          <Panel title="Recent Notices">
            <Notice text="Fee deadline is 30 April. Late charges apply after due date." />
            <Notice text="Parent-teacher meeting on Saturday at 10:00 AM." />
            <Notice text="Science unit test begins from 12 May." />
            <Notice text="Holiday declared on Monday for local event." />
            <Notice text="New school app version released." />
          </Panel>

          {/* Parent Useful Info */}
          <Panel title="Important School Updates">
            <InfoRow label="Next Exam" value={data.nextExam} />
            <InfoRow label="Homework" value={data.homework} />
            <InfoRow label="Library Books Due" value={data.libraryBooks} />
            <InfoRow label="Bus Pickup Time" value="7:20 AM" />
            <InfoRow label="School Timing" value="8:00 AM - 2:30 PM" />
            <InfoRow label="Emergency Contact" value="020-12345678" />
          </Panel>
        </div>
      </div>
    </ParentLayout>
  );
}

/* COMPONENTS */

function StatCard({ icon, title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "22px",
        boxShadow: "0 8px 18px rgba(0,0,0,0.05)",
        borderTop: `5px solid ${color}`
      }}
    >
      <div style={{ fontSize: "28px" }}>{icon}</div>
      <p style={{ color: "#64748b", margin: "12px 0 6px" }}>{title}</p>
      <h2 style={{ margin: 0, fontSize: "22px" }}>{value}</h2>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "20px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "18px",
          fontSize: "20px"
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function FeeRow({ label, value }) {
  return (
    <div style={row}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Notice({ text }) {
  return (
    <div
      style={{
        padding: "14px 0",
        borderBottom: "1px solid #e5e7eb",
        color: "#334155",
        lineHeight: "1.5"
      }}
    >
      📢 {text}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={row}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProfileGrid({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
        gap: "14px"
      }}
    >
      {children}
    </div>
  );
}

function MiniInfo({ title, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "16px",
        borderRadius: "14px",
        border: "1px solid #e2e8f0"
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#64748b",
          fontSize: "13px"
        }}
      >
        {title}
      </p>
      <h4 style={{ margin: "8px 0 0" }}>{value}</h4>
    </div>
  );
}

/* STYLES */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
  marginBottom: "25px"
};

const twoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))",
  gap: "20px",
  marginBottom: "25px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #e5e7eb"
};

const progressBg = {
  height: "18px",
  background: "#e2e8f0",
  borderRadius: "10px",
  overflow: "hidden"
};

const progressFill = {
  height: "100%",
  background: "linear-gradient(90deg,#16a34a,#22c55e)"
};

const heroBtnBlue = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "12px",
  background: "#2563eb",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};

const heroBtnDark = {
  padding: "12px 18px",
  border: "1px solid #475569",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};