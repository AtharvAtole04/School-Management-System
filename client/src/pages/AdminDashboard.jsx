import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <h1 style={heading}>
          Dashboard Overview
        </h1>

        <p style={subHeading}>
          Manage school operations,
          students, fees and academic records.
        </p>

        {/* Stats */}
        <div style={grid}>
          <StatCard
            title="Total Students"
            value="1200"
            color="#2563eb"
          />

          <StatCard
            title="Fees Collected"
            value="₹5,40,000"
            color="#16a34a"
          />

          <StatCard
            title="Pending Fees"
            value="₹1,20,000"
            color="#f59e0b"
          />

          <StatCard
            title="Today's Payments"
            value="18"
            color="#9333ea"
          />
        </div>

        {/* Functional Admin Actions */}
        <h2 style={sectionTitle}>
          Admin Controls
        </h2>

        <div style={actionGrid}>
          <ActionCard
            icon="➕"
            text="Add Notice"
            onClick={() =>
              navigate("/add-notice")
            }
          />

          <ActionCard
            icon="📝"
            text="Student Info"
            onClick={() =>
              navigate("/students")
            }
          />

          <ActionCard
            icon="📊"
            text="Performance"
            onClick={() =>
              navigate("/performance")
            }
          />

          <ActionCard
            icon="📢"
            text="School Updates"
            onClick={() =>
              navigate("/school-updates")
            }
          />

          <ActionCard
            icon="💳"
            text="Manage Fees"
            onClick={() =>
              navigate("/payments")
            }
          />

          <ActionCard
            icon="🚌"
            text="Transport"
            onClick={() =>
              navigate("/transport")
            }
          />
        </div>
      </div>
    </Layout>
  );
}

/* Components */

function StatCard({
  title,
  value,
  color
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "22px",
        borderRadius: "16px",
        borderTop: `5px solid ${color}`,
        boxShadow:
          "0 8px 18px rgba(0,0,0,0.05)"
      }}
    >
      <p style={{ color: "#64748b" }}>
        {title}
      </p>

      <h2>{value}</h2>
    </div>
  );
}

function ActionCard({
  icon,
  text,
  onClick
}) {
  return (
    <div
      style={actionCard}
      onClick={onClick}
    >
      <div
        style={{
          fontSize: "30px",
          marginBottom: "12px"
        }}
      >
        {icon}
      </div>

      <p
        style={{
          margin: 0,
          fontWeight: "600"
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* Styles */

const heading = {
  color: "#0f172a",
  marginBottom: "8px"
};

const subHeading = {
  color: "#64748b",
  marginBottom: "25px"
};

const sectionTitle = {
  marginBottom: "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "30px"
};

const actionGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px"
};

const actionCard = {
  background: "white",
  padding: "24px",
  borderRadius: "18px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow:
    "0 8px 18px rgba(0,0,0,0.05)"
};