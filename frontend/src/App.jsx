import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Packages from "./pages/Packages";
import Navbar from "./components/Navbar";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminCreatePackage from "./pages/admin/AdminCreatePackage";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminStats from "./pages/admin/AdminStats";
import PackageDetails from "./pages/PackageDetails";
import AdminPackages from "./pages/admin/AdminPackages";
import EditPackage from "./pages/admin/EditPackage";
import UserDashboard from "./pages/UserDashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
       <>
      <Toaster position="top-right" />
      {/* routes / layout */}

    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Packages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>}/>
        <Route path="/admin/packages/create" element={<AdminRoute><AdminCreatePackage /></AdminRoute>}/>
        <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>}/>
        <Route path="/packages/:id" element={<PackageDetails />} />
        

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
  path="/admin/packages/edit/:id"
  element={
    <AdminRoute>
      <EditPackage />
    </AdminRoute>
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

</Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
