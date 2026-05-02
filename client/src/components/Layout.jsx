import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      
      {/* Navbar */}
      <nav
        style={{
          height: "70px",
          background: "#0f172a",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px"
        }}
      >
        <h2>🎓 School Fee System</h2>
        <p>Admin Panel</p>
      </nav>

      {/* Main */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 130px)" }}>
        
        {/* Sidebar */}
        <aside
          style={{
            width: "240px",
            background: "#1e293b",
            padding: "20px"
          }}
        >
          <Nav to="/" text="Dashboard" />
          <Nav to="/add-student" text="Add Student" />
          <Nav to="/students" text="Students" />
          <Nav to="/payments" text="Payments" />
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "30px" }}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer
        style={{
          height: "60px",
          background: "#0f172a",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        © 2026 School Fee Management System
      </footer>
    </div>
  );
}

function Nav({ to, text }) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        padding: "12px",
        marginBottom: "10px",
        color: "white",
        textDecoration: "none",
        background: "#334155",
        borderRadius: "10px"
      }}
    >
      {text}
    </Link>
  );
}