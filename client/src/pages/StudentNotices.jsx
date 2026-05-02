import StudentLayout from "../components/StudentLayout";

export default function StudentNotices() {
  return (
    <StudentLayout>
      <h1>School Notices</h1>
      <p style={{ color: "#64748b", marginBottom: "25px" }}>
        Latest announcements and updates.
      </p>

      <div style={box}>
        <Notice title="Exam Schedule Released" date="10 Apr 2026" />
        <Notice title="Fees Due by Month End" date="08 Apr 2026" />
        <Notice title="Parent Meeting This Saturday" date="05 Apr 2026" />
        <Notice title="Summer Vacation Starts 15 May" date="02 Apr 2026" />
      </div>
    </StudentLayout>
  );
}

function Notice({ title, date }) {
  return (
    <div style={item}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ marginTop: "8px", color: "#64748b" }}>{date}</p>
    </div>
  );
}

const box = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.05)"
};

const item = {
  padding: "18px",
  borderBottom: "1px solid #e5e7eb"
};