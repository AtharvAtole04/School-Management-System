import Layout from "../components/Layout";

export default function AdminDashboard() {
  return (
    <Layout>
      <div>
        <h1 style={{ color: "#0f172a", marginBottom: "8px" }}>
          Dashboard Overview
        </h1>

        <p style={{ color: "#64748b", marginBottom: "25px" }}>
          Manage school fees, students and payments efficiently.
        </p>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px"
          }}
        >
          <Card title="Total Students" value="120" color="#3b82f6" />
          <Card title="Fees Collected" value="₹5,40,000" color="#10b981" />
          <Card title="Pending Fees" value="₹1,20,000" color="#f59e0b" />
          <Card title="Today's Payments" value="18" color="#8b5cf6" />
        </div>

        {/* Middle Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginTop: "30px"
          }}
        >
          <Box title="Recent Payments">
            <p>Rahul Patil - ₹5,000</p>
            <p>Aarav Sharma - ₹8,000</p>
            <p>Priya More - ₹3,000</p>
          </Box>

          <Box title="Announcements">
            <p>• Fee deadline: 30 April</p>
            <p>• Parent meeting Saturday</p>
            <p>• Receipt system updated</p>
          </Box>
        </div>

        {/* Progress */}
        <Box title="Collection Progress" mt="30px">
          <p>Monthly Target: ₹7,00,000</p>

          <div
            style={{
              height: "18px",
              background: "#e2e8f0",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "10px"
            }}
          >
            <div
              style={{
                width: "77%",
                height: "100%",
                background: "#10b981"
              }}
            />
          </div>

          <p style={{ marginTop: "10px", color: "#64748b" }}>
            ₹5,40,000 collected
          </p>
        </Box>
      </div>
    </Layout>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        padding: "22px",
        borderRadius: "14px",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 6px 14px rgba(0,0,0,0.05)"
      }}
    >
      <p style={{ color: "#64748b", margin: 0 }}>{title}</p>
      <h2 style={{ marginTop: "10px" }}>{value}</h2>
    </div>
  );
}

function Box({ title, children, mt }) {
  return (
    <section
      style={{
        marginTop: mt || "0",
        background: "white",
        padding: "22px",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "14px" }}>{title}</h3>
      {children}
    </section>
  );
}