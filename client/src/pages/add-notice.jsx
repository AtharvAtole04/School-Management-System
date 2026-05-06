import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function AddNotice() {
  const [text, setText] =
    useState("");

  const [notices, setNotices] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/notices"
          );

        setNotices(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const saveNotice =
    async () => {
      if (!text.trim())
        return;

      try {
        if (editId) {
          await axios.put(
            `http://localhost:5000/api/notices/${editId}`,
            {
              text
            }
          );
        } else {
          await axios.post(
            "http://localhost:5000/api/notices",
            {
              text
            }
          );
        }

        setText("");
        setEditId(
          null
        );

        fetchNotices();

      } catch (error) {
        console.log(error);
      }
    };

  const editNotice =
    (notice) => {
      setText(
        notice.text
      );

      setEditId(
        notice._id
      );
    };

  const deleteNotice =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/notices/${id}`
        );

        fetchNotices();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <div style={page}>
        <h1>
          Notice Management
        </h1>

        <p style={sub}>
          Add, edit and delete school notices.
        </p>

        {/* Input */}
        <div style={inputWrap}>
          <input
            value={text}
            onChange={(e) =>
              setText(
                e.target.value
              )
            }
            placeholder="Enter school notice..."
            style={input}
          />

          <button
            style={btn}
            onClick={
              saveNotice
            }
          >
            {editId
              ? "Update"
              : "Add"}
          </button>
        </div>

        {/* Notice List */}
        {notices.map(
          (
            notice
          ) => (
            <div
              key={
                notice._id
              }
              style={
                noticeCard
              }
            >
              <div>
                <p
                  style={
                    noticeText
                  }
                >
                  📢{" "}
                  {
                    notice.text
                  }
                </p>

                <div
                  style={
                    timeText
                  }
                >
                  📅{" "}
                  {new Date(
                    notice.createdAt
                  ).toLocaleString(
                    "en-IN",
                    {
                      weekday:
                        "long",
                      day:
                        "numeric",
                      month:
                        "long",
                      year:
                        "numeric",
                      hour:
                        "2-digit",
                      minute:
                        "2-digit",
                      second:
                        "2-digit"
                    }
                  )}
                </div>
              </div>

              <div>
                <button
                  style={
                    editBtn
                  }
                  onClick={() =>
                    editNotice(
                      notice
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
                    deleteNotice(
                      notice._id
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

/* Styles */

const page = {
  background:
    "white",
  padding: "30px",
  borderRadius:
    "20px",
  boxShadow:
    "0 8px 20px rgba(0,0,0,0.05)"
};

const sub = {
  color: "#64748b",
  marginBottom:
    "25px"
};

const inputWrap = {
  display: "flex",
  gap: "12px",
  marginBottom:
    "30px"
};

const input = {
  flex: 1,
  padding: "14px",
  borderRadius:
    "12px",
  border:
    "1px solid #ddd",
  fontSize: "15px"
};

const btn = {
  background:
    "#2563eb",
  color: "white",
  border: "none",
  padding:
    "14px 22px",
  borderRadius:
    "12px",
  fontWeight: "600",
  cursor: "pointer"
};

const noticeCard = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems:
    "center",
  padding:
    "18px 0",
  borderBottom:
    "1px solid #eee"
};

const noticeText = {
  margin: 0,
  fontWeight: "600",
  fontSize: "16px"
};

const timeText = {
  marginTop: "8px",
  color: "#64748b",
  fontSize: "13px"
};

const editBtn = {
  background:
    "#16a34a",
  color: "white",
  border: "none",
  padding:
    "8px 14px",
  borderRadius:
    "8px",
  marginRight:
    "8px",
  cursor: "pointer"
};

const deleteBtn = {
  background:
    "#dc2626",
  color: "white",
  border: "none",
  padding:
    "8px 14px",
  borderRadius:
    "8px",
  cursor: "pointer"
};