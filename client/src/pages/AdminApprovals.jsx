import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function AdminApprovals() {
  const [activeTab, setActiveTab] = useState("pending-parents");
  const [pendingParents, setPendingParents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [approvedRoleFilter, setApprovedRoleFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  const fetchPendingParents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/pending-parents", getHeaders());
      setPendingParents(res.data);
    } catch (err) {
      console.error("Error fetching pending parents:", err);
    }
  };

  const fetchPendingStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/pending-students", getHeaders());
      setPendingStudents(res.data);
    } catch (err) {
      console.error("Error fetching pending students:", err);
    }
  };

  const fetchApprovedUsers = async () => {
    try {
      const roleParam = approvedRoleFilter ? `&role=${approvedRoleFilter}` : "";
      const searchParam = searchQuery ? `&search=${searchQuery}` : "";
      const res = await axios.get(`http://localhost:5000/api/admin/approved-users?${roleParam}${searchParam}`, getHeaders());
      setApprovedUsers(res.data);
    } catch (err) {
      console.error("Error fetching approved users:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "pending-parents") {
      fetchPendingParents();
    } else if (activeTab === "pending-students") {
      fetchPendingStudents();
    } else if (activeTab === "approved") {
      fetchApprovedUsers();
    }
  }, [activeTab, approvedRoleFilter, searchQuery]);

  const handleApprove = async (userId, role) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const url = `http://localhost:5000/api/admin/approve-${role}/${userId}`;
      const res = await axios.put(url, {}, getHeaders());
      setSuccess(res.data.message || "Approved successfully!");
      if (role === "parent") {
        fetchPendingParents();
      } else {
        fetchPendingStudents();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (userId, role) => {
    if (!window.confirm(`Are you sure you want to reject this ${role}?`)) return;
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const url = `http://localhost:5000/api/admin/reject-${role}/${userId}`;
      const res = await axios.delete(url, getHeaders());
      setSuccess(res.data.message || "Rejected successfully!");
      if (role === "parent") {
        fetchPendingParents();
      } else {
        fetchPendingStudents();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <h1 style={heading}>User Registration Approvals</h1>
        <p style={subHeading}>Approve or reject parent and student registration requests, and manage active accounts.</p>

        {error && <div style={errorBox}>{error}</div>}
        {success && <div style={successBox}>{success}</div>}

        {/* Tab Buttons */}
        <div style={tabsRow}>
          <button
            onClick={() => setActiveTab("pending-parents")}
            style={activeTab === "pending-parents" ? activeTabBtn : tabBtn}
          >
            Pending Parents ({pendingParents.length})
          </button>
          
          <button
            onClick={() => setActiveTab("pending-students")}
            style={activeTab === "pending-students" ? activeTabBtn : tabBtn}
          >
            Pending Students ({pendingStudents.length})
          </button>
          
          <button
            onClick={() => setActiveTab("approved")}
            style={activeTab === "approved" ? activeTabBtn : tabBtn}
          >
            Approved Users
          </button>
        </div>

        {/* Tab Contents */}
        <div style={contentCard}>
          {activeTab === "pending-parents" && (
            <div>
              <h2 style={sectionTitle}>Pending Parent Accounts</h2>
              {pendingParents.length === 0 ? (
                <p style={emptyText}>No parents awaiting approval.</p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={tableStyle}>
                    <thead>
                      <tr style={tableHeaderRow}>
                        <th style={thStyle}>Parent Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Mobile</th>
                        <th style={thStyle}>Address</th>
                        <th style={thStyle}>Child Linked</th>
                        <th style={thStyle}>Child Roll</th>
                        <th style={thStyle}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingParents.map((user) => (
                        <tr key={user._id} style={tableRow}>
                          <td style={tdStyle}>{user.name}</td>
                          <td style={tdStyle}>{user.email}</td>
                          <td style={tdStyle}>{user.parentId?.mobile || "N/A"}</td>
                          <td style={tdStyle}>{user.parentId?.address || "N/A"}</td>
                          <td style={tdStyle}>{user.parentId?.childName || "N/A"}</td>
                          <td style={tdStyle}>{user.parentId?.childRollNumber || "N/A"}</td>
                          <td style={tdStyle}>
                            <div style={btnGroup}>
                              <button
                                onClick={() => handleApprove(user._id, "parent")}
                                style={approveBtn}
                                disabled={loading}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(user._id, "parent")}
                                style={rejectBtn}
                                disabled={loading}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "pending-students" && (
            <div>
              <h2 style={sectionTitle}>Pending Student Accounts</h2>
              {pendingStudents.length === 0 ? (
                <p style={emptyText}>No students awaiting approval.</p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={tableStyle}>
                    <thead>
                      <tr style={tableHeaderRow}>
                        <th style={thStyle}>Student Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Roll No</th>
                        <th style={thStyle}>Class/Section</th>
                        <th style={thStyle}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingStudents.map((user) => (
                        <tr key={user._id} style={tableRow}>
                          <td style={tdStyle}>{user.name}</td>
                          <td style={tdStyle}>{user.email}</td>
                          <td style={tdStyle}>{user.studentId?.rollNo || "N/A"}</td>
                          <td style={tdStyle}>{user.studentId?.className || "N/A"}</td>
                          <td style={tdStyle}>
                            <div style={btnGroup}>
                              <button
                                onClick={() => handleApprove(user._id, "student")}
                                style={approveBtn}
                                disabled={loading}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(user._id, "student")}
                                style={rejectBtn}
                                disabled={loading}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "approved" && (
            <div>
              <div style={filterHeader}>
                <h2 style={{ ...sectionTitle, margin: 0 }}>Approved Users Directory</h2>
                
                {/* Search & Filters */}
                <div style={filterRow}>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={searchInput}
                  />
                  
                  <select
                    value={approvedRoleFilter}
                    onChange={(e) => setApprovedRoleFilter(e.target.value)}
                    style={filterSelect}
                  >
                    <option value="">All Roles</option>
                    <option value="parent">Parents</option>
                    <option value="student">Students</option>
                  </select>
                </div>
              </div>

              {approvedUsers.length === 0 ? (
                <p style={emptyText}>No approved users matching search criteria.</p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={tableStyle}>
                    <thead>
                      <tr style={tableHeaderRow}>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Role</th>
                        <th style={thStyle}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedUsers.map((user) => (
                        <tr key={user._id} style={tableRow}>
                          <td style={tdStyle}>{user.name}</td>
                          <td style={tdStyle}>{user.email}</td>
                          <td style={tdStyle}>
                            <span style={user.role === "parent" ? parentBadge : studentBadge}>
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            {user.role === "parent" ? (
                              <span style={detailText}>
                                Child: {user.parentId?.childName} (Roll: {user.parentId?.childRollNumber}), Mob: {user.parentId?.mobile}
                              </span>
                            ) : (
                              <span style={detailText}>
                                Class: {user.studentId?.className} (Roll: {user.studentId?.rollNo})
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

/* Styles */

const heading = {
  color: "#0f172a",
  marginBottom: "8px"
};

const subHeading = {
  color: "#64748b",
  marginBottom: "25px"
};

const sectionTitle = {
  fontSize: "20px",
  color: "#1e293b",
  marginBottom: "20px",
  fontWeight: "700"
};

const tabsRow = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  borderBottom: "1px solid #cbd5e1",
  paddingBottom: "10px"
};

const tabBtn = {
  padding: "10px 18px",
  border: "none",
  background: "transparent",
  color: "#64748b",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  borderRadius: "8px"
};

const activeTabBtn = {
  ...tabBtn,
  background: "#1e3a8a",
  color: "white",
  boxShadow: "0 4px 10px rgba(30, 58, 138, 0.15)"
};

const contentCard = {
  background: "white",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
};

const emptyText = {
  color: "#64748b",
  textAlign: "center",
  padding: "30px",
  fontSize: "15px",
  fontStyle: "italic"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
  fontSize: "14px"
};

const tableHeaderRow = {
  borderBottom: "2px solid #e2e8f0"
};

const thStyle = {
  padding: "14px",
  color: "#475569",
  fontWeight: "600"
};

const tableRow = {
  borderBottom: "1px solid #f1f5f9"
};

const tdStyle = {
  padding: "14px",
  color: "#334155"
};

const btnGroup = {
  display: "flex",
  gap: "8px"
};

const approveBtn = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#16a34a",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "13px"
};

const rejectBtn = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#dc2626",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "13px"
};

const filterHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
  marginBottom: "20px"
};

const filterRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const searchInput = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  outline: "none",
  minWidth: "240px",
  fontSize: "14px"
};

const filterSelect = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: "14px",
  cursor: "pointer"
};

const badge = {
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "700"
};

const parentBadge = {
  ...badge,
  backgroundColor: "#eff6ff",
  color: "#1d4ed8"
};

const studentBadge = {
  ...badge,
  backgroundColor: "#faf5ff",
  color: "#7e22ce"
};

const detailText = {
  color: "#64748b",
  fontSize: "13px"
};

const errorBox = {
  background: "#fef2f2",
  border: "1px solid #fca5a5",
  color: "#b91c1c",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "18px",
  fontSize: "14px",
  fontWeight: "500"
};

const successBox = {
  background: "#f0fdf4",
  border: "1px solid #86efac",
  color: "#15803d",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "18px",
  fontSize: "14px",
  fontWeight: "500"
};
