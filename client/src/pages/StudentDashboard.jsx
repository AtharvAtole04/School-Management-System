import StudentLayout from "../components/StudentLayout";

export default function StudentDashboard() {
  const name =
    localStorage.getItem("name") || "Student";

  const data = {
    className: "10th A",
    rollNo: "23",
    totalFees: 50000,
    paidFees: 35000,
    attendance: 94,
    rank: 5,
    teacher: "Mrs Sharma",
    nextExam: "12 May",
    homework: "Math Chapter 6",
    libraryBooks: 2
  };

  const pending =
    data.totalFees - data.paidFees;

  const progress = Math.round(
    (data.paidFees / data.totalFees) * 100
  );

  return (
    <StudentLayout>
      <div
        style={{
          background: "#f1f5f9",
          minHeight: "100vh",
          padding: "10px"
        }}
      >
        {/* Hero */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)",
            color: "white",
            borderRadius: "22px",
            padding: "32px",
            marginBottom: "25px",
            boxShadow:
              "0 20px 30px rgba(0,0,0,0.08)"
          }}
        >
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
            Your academic dashboard.
            Study, track progress, survive deadlines.
          </p>
        </div>

        {/* Stats */}
        <div style={grid}>
          <Card
            icon="🏫"
            title="Class"
            value={data.className}
            color="#2563eb"
          />

          <Card
            icon="🆔"
            title="Roll No"
            value={data.rollNo}
            color="#9333ea"
          />

          <Card
            icon="💰"
            title="Paid Fees"
            value={`₹${data.paidFees}`}
            color="#16a34a"
          />

          <Card
            icon="📌"
            title="Pending"
            value={`₹${pending}`}
            color="#f59e0b"
          />

          <Card
            icon="📝"
            title="Attendance"
            value={`${data.attendance}%`}
            color="#0ea5e9"
          />

          <Card
            icon="🏆"
            title="Rank"
            value={`${data.rank}th`}
            color="#ef4444"
          />
        </div>

        {/* Panels */}
        <div style={twoGrid}>
          {/* Academic */}
          <Panel title="Academic Profile">
            <Row
              left="Class Teacher"
              right={data.teacher}
            />
            <Row
              left="Next Exam"
              right={data.nextExam}
            />
            <Row
              left="Homework"
              right={data.homework}
            />
            <Row
              left="Library Books"
              right={data.libraryBooks}
            />
          </Panel>

          {/* Fee Progress */}
          <Panel title="Fee Progress">
            <Row
              left="Total Fees"
              right={`₹${data.totalFees}`}
            />

            <Row
              left="Paid"
              right={`₹${data.paidFees}`}
            />

            <Row
              left="Pending"
              right={`₹${pending}`}
            />

            <div
              style={{
                marginTop: "18px"
              }}
            >
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
                {progress}% Completed
              </p>
            </div>
          </Panel>
        </div>

        {/* Notices + Subjects */}
        <div style={twoGrid}>
          <Panel title="Recent Notices">
            <Notice text="Science test starts next week." />
            <Notice text="Fees due before month end." />
            <Notice text="Sports practice on Friday." />
            <Notice text="Parent meeting this Saturday." />
          </Panel>

          <Panel title="Subjects Performance">
            <Row left="Maths" right="88%" />
            <Row left="Science" right="91%" />
            <Row left="English" right="84%" />
            <Row left="History" right="79%" />
          </Panel>
        </div>
      </div>
    </StudentLayout>
  );
}

/* Components */

function Card({
  icon,
  title,
  value,
  color
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "22px",
        boxShadow:
          "0 8px 18px rgba(0,0,0,0.05)",
        borderTop: `5px solid ${color}`
      }}
    >
      <div
        style={{
          fontSize: "28px"
        }}
      >
        {icon}
      </div>

      <p
        style={{
          color: "#64748b",
          margin:
            "12px 0 6px"
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: 0,
          fontSize: "22px"
        }}
      >
        {value}
      </h2>
    </div>
  );
}

function Panel({
  title,
  children
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "20px",
        boxShadow:
          "0 10px 20px rgba(0,0,0,0.05)"
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom:
            "18px"
        }}
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

function Row({
  left,
  right
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        padding: "12px 0",
        borderBottom:
          "1px solid #e5e7eb"
      }}
    >
      <span>{left}</span>
      <strong>{right}</strong>
    </div>
  );
}

function Notice({
  text
}) {
  return (
    <div
      style={{
        padding: "14px 0",
        borderBottom:
          "1px solid #e5e7eb",
        color: "#334155"
      }}
    >
      📢 {text}
    </div>
  );
}

/* Styles */

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
  marginBottom: "25px"
};

const twoGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(420px,1fr))",
  gap: "20px",
  marginBottom: "25px"
};

const progressBg = {
  height: "18px",
  background: "#e2e8f0",
  borderRadius: "10px",
  overflow: "hidden"
};

const progressFill = {
  height: "100%",
  background:
    "linear-gradient(90deg,#16a34a,#22c55e)"
};