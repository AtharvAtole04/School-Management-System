import {
  useState,
  useEffect
} from "react";

import axios from "axios";
import Layout from "../components/Layout";

export default function Performance() {
  const [
    records,
    setRecords
  ] = useState([]);

  const [
    editId,
    setEditId
  ] = useState(null);

  const [data, setData] =
    useState({
      studentName: "",
      rollNo: "",
      className: "",
      english: "",
      maths: "",
      science: "",
      history: "",
      geography: "",
      civics: ""
    });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/performance"
          );

        setRecords(
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

  const handleChange =
    (e) => {
      setData({
        ...data,
        [e.target.name]:
          e.target.value
      });
    };

  const saveRecord =
    async () => {
      try {
        if (editId) {
          await axios.put(
            `http://localhost:5000/api/performance/${editId}`,
            data
          );

        } else {
          await axios.post(
            "http://localhost:5000/api/performance",
            data
          );
        }

        setData({
          studentName:
            "",
          rollNo: "",
          className:
            "",
          english:
            "",
          maths: "",
          science:
            "",
          history:
            "",
          geography:
            "",
          civics:
            ""
        });

        setEditId(
          null
        );

        fetchRecords();

      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const editRecord =
    (item) => {
      setData({
        studentName:
          item.studentName,
        rollNo:
          item.rollNo,
        className:
          item.className,
        english:
          item.english,
        maths:
          item.maths,
        science:
          item.science,
        history:
          item.history,
        geography:
          item.geography,
        civics:
          item.civics
      });

      setEditId(
        item._id
      );
    };

  const deleteRecord =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/performance/${id}`
        );

        fetchRecords();

      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  return (
    <Layout>
      <div style={box}>
        <h1>
          Academic Performance
        </h1>

        {/* FORM */}
        <div style={grid}>
          <Input
            name="studentName"
            placeholder="Student Name"
            value={
              data.studentName
            }
            onChange={
              handleChange
            }
          />

          <Input
            name="rollNo"
            placeholder="Roll No"
            value={
              data.rollNo
            }
            onChange={
              handleChange
            }
          />

          <Input
            name="className"
            placeholder="Class"
            value={
              data.className
            }
            onChange={
              handleChange
            }
          />

          <Input
            name="english"
            placeholder="English"
            value={
              data.english
            }
            onChange={
              handleChange
            }
          />

          <Input
            name="maths"
            placeholder="Maths"
            value={
              data.maths
            }
            onChange={
              handleChange
            }
          />

          <Input
            name="science"
            placeholder="Science"
            value={
              data.science
            }
            onChange={
              handleChange
            }
          />

          <Input
            name="history"
            placeholder="History"
            value={
              data.history
            }
            onChange={
              handleChange
            }
          />

          <Input
            name="geography"
            placeholder="Geography"
            value={
              data.geography
            }
            onChange={
              handleChange
            }
          />

          <Input
            name="civics"
            placeholder="Civics"
            value={
              data.civics
            }
            onChange={
              handleChange
            }
          />
        </div>

        <button
          style={btn}
          onClick={
            saveRecord
          }
        >
          {editId
            ? "Update Record"
            : "Add Record"}
        </button>

        {/* RECORDS */}
        {records.map(
          (
            item
          ) => (
            <div
              key={
                item._id
              }
              style={
                recordCard
              }
            >
              <div>
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

                <p>
                  Eng:
                  {
                    item.english
                  }{" "}
                  |
                  Maths:
                  {
                    item.maths
                  }{" "}
                  |
                  Sci:
                  {
                    item.science
                  }
                </p>

                <p>
                  Hist:
                  {
                    item.history
                  }{" "}
                  |
                  Geo:
                  {
                    item.geography
                  }{" "}
                  |
                  Civ:
                  {
                    item.civics
                  }
                </p>

                <small>
                  📅{" "}
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </small>
              </div>

              <div>
                <button
                  style={
                    editBtn
                  }
                  onClick={() =>
                    editRecord(
                      item
                    )
                  }
                >
                  Edit
                </button>

                <button
                  style={
                    deleteBtn
                  }
                  onClick={() =>
                    deleteRecord(
                      item._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}

function Input(
  props
) {
  return (
    <input
      {...props}
      style={input}
    />
  );
}

/* styles */

const box = {
  background:
    "white",
  padding: "30px",
  borderRadius:
    "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(200px,1fr))",
  gap: "14px",
  marginTop: "20px"
};

const input = {
  padding: "14px",
  border:
    "1px solid #ddd",
  borderRadius:
    "12px"
};

const btn = {
  marginTop: "20px",
  background:
    "#2563eb",
  color:
    "white",
  border: "none",
  padding:
    "14px 22px",
  borderRadius:
    "12px",
  cursor:
    "pointer"
};

const recordCard = {
  marginTop: "25px",
  display: "flex",
  justifyContent:
    "space-between",
  border:
    "1px solid #eee",
  borderRadius:
    "16px",
  padding: "20px"
};

const editBtn = {
  background:
    "#16a34a",
  color:
    "white",
  border: "none",
  padding:
    "8px 12px",
  borderRadius:
    "8px",
  marginRight:
    "8px"
};

const deleteBtn = {
  background:
    "#dc2626",
  color:
    "white",
  border: "none",
  padding:
    "8px 12px",
  borderRadius:
    "8px"
};