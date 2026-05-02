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