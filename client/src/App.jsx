import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AddStudent from "./pages/AddStudent";
import ViewStudents from "./pages/ViewStudent";
import EditStudent from "./pages/EditStudent";
import PayFees from "./pages/PayFees";
import PaymentHistory from "./pages/PaymentHistory";
import Login from "./pages/Login";
import ParentDashboard from "./pages/ParentDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ParentPayments from "./pages/ParentPayments";
import ParentPay from "./pages/ParentPay";
import AddNotice from "./pages/add-notice";
import Performance from "./pages/performance";
import SchoolUpdates from "./pages/school-updates";
import Transport from "./pages/transport";
import RegisterParent from "./pages/RegisterParent";
import RegisterStudent from "./pages/RegisterStudent";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AdminApprovals from "./pages/AdminApprovals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
  path="/"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/students"
  element={
    <ProtectedRoute allowedRole="admin">
      <ViewStudents />
    </ProtectedRoute>
  }
/>



<Route
  path="/add-student"
  element={
    <ProtectedRoute allowedRole="admin">
      <AddStudent />
    </ProtectedRoute>
  }
/>

<Route
  path="/payments"
  element={
    <ProtectedRoute allowedRole="admin">
      <PaymentHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/add-notice"
  element={
    <ProtectedRoute allowedRole="admin">
      <AddNotice />
    </ProtectedRoute>
  }
/>

<Route
  path="/performance"
  element={
    <ProtectedRoute allowedRole="admin">
      <Performance />
    </ProtectedRoute>
  }
/>

<Route
  path="/school-updates"
  element={
    <ProtectedRoute allowedRole="admin">
      <SchoolUpdates />
    </ProtectedRoute>
  }
/>

<Route
  path="/transport"
  element={
    <ProtectedRoute allowedRole="admin">
      <Transport />
    </ProtectedRoute>
  }
/>

<Route
  path="/transport"
  element={
    <ProtectedRoute allowedRole="admin">
      <Transport />
    </ProtectedRoute>
  }
/>

<Route
  path="/parent-dashboard"
  element={
    <ProtectedRoute allowedRole="parent">
      <ParentDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/parent-payments"
  element={
    <ProtectedRoute allowedRole="parent">
      <ParentPayments />
    </ProtectedRoute>
  }
/>

<Route
  path="/parent-pay"
  element={
    <ProtectedRoute allowedRole="parent">
      <ParentPay />
    </ProtectedRoute>
  }
/>

<Route
  path="/student-dashboard"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>
        {/* Auth routes */}
        <Route path="/register-parent" element={<RegisterParent />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* Admin Approvals Route */}
        <Route
          path="/admin/approvals"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminApprovals />
            </ProtectedRoute>
          }
        />

        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/students" element={<ViewStudents />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/pay-fees/:id" element={<PayFees />} />
        <Route path="/payments" element={<PaymentHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;