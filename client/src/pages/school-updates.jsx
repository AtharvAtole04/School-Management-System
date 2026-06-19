import Layout from "../components/Layout";

export default function SchoolUpdates() {
  return (
    <Layout>
      <div style={box}>
        <h1>
          School Updates
        </h1>

        <Update text="Annual Sports Day on 20 May" />
        <Update text="Admissions open for 2026 batch" />
        <Update text="New smart classrooms installed" />
        <Update text="Bus route changes published" />
      </div>
    </Layout>
  );
}

function Update({
  text
}) {
  return (
    <div style={item}>
      📢 {text}
    </div>
  );
}

const box = {
  background: "white",
  padding: "30px",
  borderRadius: "18px"
};

const item = {
  padding: "16px 0",
  borderBottom:
    "1px solid #ddd"
};