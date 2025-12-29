import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import MyBookings from "./pages/MyBookings";
import UserDashboard from "./pages/UserDashboard";

import AdminCreatePackage from "./pages/admin/AdminCreatePackage";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminStats from "./pages/admin/AdminStats";
import AdminPackages from "./pages/admin/AdminPackages";
import EditPackage from "./pages/admin/EditPackage";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Packages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/packages/:id" element={<PackageDetails />} />

          {/* User routes */}
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminStats />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/packages"
            element={
              <AdminRoute>
                <AdminPackages />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/packages/create"
            element={
              <AdminRoute>
                <AdminCreatePackage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/packages/edit/:id"
            element={
              <AdminRoute>
                <EditPackage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
