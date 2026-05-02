import StudentLayout from "../components/StudentLayout";

export default function StudentResults() {
  return (
    <StudentLayout>
      <h1>Exam Results</h1>
      <p style={{ color: "#64748b", marginBottom: "25px" }}>
        Academic performance overview.
      </p>

      <div style={box}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#e2e8f0" }}>
              <th style={th}>Subject</th>
              <th style={th}>Marks</th>
              <th style={th}>Grade</th>
            </tr>
          </thead>

          <tbody>
            <Row sub="Maths" marks="88" grade="A" />
            <Row sub="Science" marks="91" grade="A+" />
            <Row sub="English" marks="84" grade="A" />
            <Row sub="History" marks="79" grade="B+" />
          </tbody>
        </table>
      </div>
    </StudentLayout>
  );
}

function Row({ sub, marks, grade }) {
  return (
    <tr>
      <td style={td}>{sub}</td>
      <td style={td}>{marks}</td>
      <td style={td}>{grade}</td>
    </tr>
  );
}

const box = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.05)"
};

const th = { padding: "12px", textAlign: "left" };
const td = { padding: "12px", borderBottom: "1px solid #e5e7eb" };