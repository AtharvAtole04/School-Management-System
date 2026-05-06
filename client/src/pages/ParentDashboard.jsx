import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParentLayout from "../components/ParentLayout";
import axios from "axios";

export default function ParentDashboard() {
  const navigate = useNavigate();
  const name =
    localStorage.getItem("name") ||
    "Parent";

  const [time, setTime] =
    useState(
      new Date()
    );

  const [
    performance,
    setPerformance
  ] = useState([]);

  /* Dummy child info */
  const data = {
    childName:
      "Rahul Student",
    className:
      "10th A",
    rollNo: "23",
    totalFees: 50000,
    paidFees: 35000,
    attendance: 92,
    rank: 7,
    teacher:
      "Mrs Sharma",
    bus: "Route 4",
    section: "A",
    blood: "B+",
    nextExam:
      "12 May",
    homework:
      "Math Chapter 6",
    libraryBooks: 2
  };

  /* Fetch performance */
  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/performance"
          );

        setPerformance(
          res.data
        );

      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  /* Clock */
  useEffect(() => {
    const timer =
      setInterval(
        () => {
          setTime(
            new Date()
          );
        },
        1000
      );

    return () =>
      clearInterval(
        timer
      );
  }, []);

  const pending =
    data.totalFees -
    data.paidFees;

  const progress =
    Math.round(
      (data.paidFees /
        data.totalFees) *
        100
    );

  return (
    <ParentLayout>
      <div
        style={{
          background:
            "#f1f5f9",
          minHeight:
            "100vh",
          padding:
            "10px"
        }}
      >
        {/* HERO */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)",
            color:
              "white",
            borderRadius:
              "22px",
            padding:
              "35px",
            marginBottom:
              "25px",
            display:
              "grid",
            gridTemplateColumns:
              "2fr 1fr",
            gap: "20px"
          }}
        >
          <div>
            <h1>
              Welcome,{" "}
              {name}
            </h1>

            <p
              style={{
                color:
                  "#cbd5e1"
              }}
            >
              Everything
              important
              about your
              child in
              one place.
            </p>

            <div
              style={{
                marginTop:
                  "18px",
                display:
                  "flex",
                gap: "12px"
              }}
            >
              <button
                style={
                  heroBtnBlue
                }
                onClick={() =>
                  navigate(
                    "/parent-pay"
                  )
                }
              >
                Pay Fees
              </button>

              <button
                style={
                  heroBtnDark
                }
                onClick={() =>
                  navigate(
                    "/parent-payments"
                  )
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
              padding:
                "22px",
              borderRadius:
                "18px",
              textAlign:
                "center"
            }}
          >
            <h2>
              {time.toLocaleTimeString()}
            </h2>

            <p>
              {time.toDateString()}
            </p>

            <p>
              Attendance:{" "}
              {
                data.attendance
              }
              %
            </p>
          </div>
        </div>

        {/* STATS */}
        <div style={grid}>
          <StatCard
            icon="🎓"
            title="Student"
            value={
              data.childName
            }
            color="#2563eb"
          />

          <StatCard
            icon="🏫"
            title="Class"
            value={
              data.className
            }
            color="#9333ea"
          />

          <StatCard
            icon="💰"
            title="Total Fees"
            value={`₹${data.totalFees}`}
            color="#0ea5e9"
          />

          <StatCard
            icon="✅"
            title="Paid Fees"
            value={`₹${data.paidFees}`}
            color="#16a34a"
          />

          <StatCard
            icon="📌"
            title="Pending"
            value={`₹${pending}`}
            color="#f59e0b"
          />

          <StatCard
            icon="🏆"
            title="Rank"
            value={`${data.rank}th`}
            color="#ef4444"
          />
        </div>

        {/* FEE + PROFILE */}
        <div style={twoGrid}>
          <Panel title="Fee Overview">
            <FeeRow
              label="Annual Fees"
              value={`₹${data.totalFees}`}
            />

            <FeeRow
              label="Paid Amount"
              value={`₹${data.paidFees}`}
            />

            <FeeRow
              label="Pending"
              value={`₹${pending}`}
            />

            <div
              style={{
                marginTop:
                  "18px"
              }}
            >
              <div
                style={
                  progressBg
                }
              >
                <div
                  style={{
                    ...progressFill,
                    width: `${progress}%`
                  }}
                />
              </div>

              <p>
                {progress}
                % Paid
              </p>
            </div>
          </Panel>

          <Panel title="Student Profile">
            <ProfileGrid>
              <MiniInfo
                title="Roll No"
                value={
                  data.rollNo
                }
              />

              <MiniInfo
                title="Teacher"
                value={
                  data.teacher
                }
              />

              <MiniInfo
                title="Bus"
                value={
                  data.bus
                }
              />

              <MiniInfo
                title="Blood"
                value={
                  data.blood
                }
              />
            </ProfileGrid>
          </Panel>
        </div>

        {/* NOTICES + PERFORMANCE */}
        <div style={twoGrid}>
          <Panel title="Recent Notices">
            <Notice text="Parent meeting Saturday." />
            <Notice text="Science exam starts 12 May." />
            <Notice text="Fees due before month end." />
          </Panel>

          <Panel title="Academic Performance">
            {performance.map(
              (
                item
              ) => (
                <div
                  key={
                    item._id
                  }
                  style={{
                    marginBottom:
                      "24px"
                  }}
                >
                  <h3>
                    {
                      item.studentName
                    }
                  </h3>

                  <p>
                    Roll:
                    {
                      item.rollNo
                    }{" "}
                    |
                    Class:
                    {
                      item.className
                    }
                  </p>

                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(120px,1fr))",
                      gap: "12px"
                    }}
                  >
                    <MiniInfo
                      title="English"
                      value={
                        item.english
                      }
                    />

                    <MiniInfo
                      title="Maths"
                      value={
                        item.maths
                      }
                    />

                    <MiniInfo
                      title="Science"
                      value={
                        item.science
                      }
                    />

                    <MiniInfo
                      title="History"
                      value={
                        item.history
                      }
                    />

                    <MiniInfo
                      title="Geography"
                      value={
                        item.geography
                      }
                    />

                    <MiniInfo
                      title="Civics"
                      value={
                        item.civics
                      }
                    />
                  </div>

                  <small
                    style={{
                      color:
                        "#64748b"
                    }}
                  >
                    📅{" "}
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </small>
                </div>
              )
            )}
          </Panel>
        </div>
      </div>
    </ParentLayout>
  );
}

/* Components */

function StatCard({
  icon,
  title,
  value,
  color
}) {
  return (
    <div
      style={{
        background:
          "white",
        padding:
          "22px",
        borderRadius:
          "18px",
        borderTop: `5px solid ${color}`
      }}
    >
      <div>
        {icon}
      </div>
      <p>
        {title}
      </p>
      <h2>
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
        background:
          "white",
        padding:
          "24px",
        borderRadius:
          "20px"
      }}
    >
      <h3>
        {title}
      </h3>
      {children}
    </div>
  );
}

function FeeRow({
  label,
  value
}) {
  return (
    <div style={row}>
      <span>
        {label}
      </span>
      <strong>
        {value}
      </strong>
    </div>
  );
}

function Notice({
  text
}) {
  return (
    <div
      style={{
        padding:
          "12px 0"
      }}
    >
      📢 {text}
    </div>
  );
}

function ProfileGrid({
  children
}) {
  return (
    <div
      style={{
        display:
          "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(140px,1fr))",
        gap: "12px"
      }}
    >
      {children}
    </div>
  );
}

function MiniInfo({
  title,
  value
}) {
  return (
    <div
      style={{
        background:
          "#f8fafc",
        padding:
          "14px",
        borderRadius:
          "12px"
      }}
    >
      <p>
        {title}
      </p>

      <h4>
        {value}
      </h4>
    </div>
  );
}

/* Styles */

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
  marginBottom:
    "25px"
};

const twoGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(420px,1fr))",
  gap: "20px",
  marginBottom:
    "25px"
};

const row = {
  display: "flex",
  justifyContent:
    "space-between",
  padding:
    "12px 0"
};

const progressBg = {
  height: "18px",
  background:
    "#e2e8f0",
  borderRadius:
    "10px",
  overflow:
    "hidden"
};

const progressFill = {
  height: "100%",
  background:
    "#16a34a"
};

const heroBtnBlue = {
  padding:
    "12px 18px",
  border: "none",
  borderRadius:
    "12px",
  background:
    "#2563eb",
  color:
    "white"
};

const heroBtnDark = {
  padding:
    "12px 18px",
  border:
    "1px solid #475569",
  borderRadius:
    "12px",
  background:
    "transparent",
  color:
    "white"
};