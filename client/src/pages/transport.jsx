import Layout from "../components/Layout";

export default function Transport() {
  return (
    <Layout>
      <div style={box}>
        <h1>
          Transport Management
        </h1>

        <BusRow
          route="Route A"
          time="7:20 AM"
        />

        <BusRow
          route="Route B"
          time="7:35 AM"
        />

        <BusRow
          route="Route C"
          time="7:50 AM"
        />
      </div>
    </Layout>
  );
}

function BusRow({
  route,
  time
}) {
  return (
    <div style={row}>
      <span>
        🚌 {route}
      </span>

      <strong>
        {time}
      </strong>
    </div>
  );
}

const box = {
  background: "white",
  padding: "30px",
  borderRadius: "18px"
};

const row = {
  display: "flex",
  justifyContent:
    "space-between",
  padding: "16px 0",
  borderBottom:
    "1px solid #ddd"
};