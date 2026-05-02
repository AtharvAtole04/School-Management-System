import StudentLayout from "../components/StudentLayout";

export default function StudentFees() {
  return (
    <StudentLayout>
      <h1>Fees Details</h1>
      <p style={{ color: "#64748b", marginBottom: "25px" }}>
        View payment summary.
      </p>

      <div style={grid}>
        <Card title="Total Fees" value="₹50,000" />
        <Card title="Paid Fees" value="₹35,000" />
        <Card title="Pending Fees" value="₹15,000" />
      </div>

      <div style={box}>
        <h3>Payment Status</h3>

        <div style={barBg}>
          <div style={barFill}></div>
        </div>

        <p style={{ color: "#64748b", marginTop: "12px" }}>
          70% fees completed
        </p>
      </div>
    </StudentLayout>
  );
}

function Card({ title, value }) {
  return (
    <div style={card}>
      <p style={{ color: "#64748b" }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.05)"
};

const box = {
  marginTop: "25px",
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.05)"
};

const barBg = {
  height: "18px",
  background: "#e2e8f0",
  borderRadius: "10px",
  overflow: "hidden"
};

const barFill = {
  width: "70%",
  height: "100%",
  background: "#16a34a"
};