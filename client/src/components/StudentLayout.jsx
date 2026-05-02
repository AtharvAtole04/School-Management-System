import { Link } from "react-router-dom";

export default function StudentLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <nav style={nav}>
        <h2>🎓 Student Portal</h2>
        <p>My Dashboard</p>
      </nav>

      <div style={{ display: "flex" }}>
        <aside style={side}>
          <Nav to="/student-dashboard" text="Dashboard" />
          <Nav to="/login" text="Logout" />
        </aside>

        <main style={{ flex: 1, padding: "30px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

function Nav({ to, text }) {
  return <Link to={to} style={link}>{text}</Link>;
}

const nav = {
  background: "#0f172a",
  color: "white",
  padding: "18px 30px",
  display: "flex",
  justifyContent: "space-between"
};

const side = {
  width: "240px",
  background: "#1e293b",
  minHeight: "100vh",
  padding: "20px"
};

const link = {
  display: "block",
  color: "white",
  textDecoration: "none",
  background: "#334155",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px"
};