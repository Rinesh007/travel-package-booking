import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getPackageById } from "../api/package.api";
import { createBooking } from "../api/booking.api";
import { useAuth } from "../context/AuthContext";

const PackageDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      const res = await getPackageById(id);
      setPkg(res.data);
      setLoading(false);
    };

    fetchPackage();
  }, [id]);

  const handleBook = async () => {
    // Guest → login first
    if (!user) {
      navigate("/login", {
        state: { redirectTo: location.pathname }
      });
      return;
    }

    // Admin cannot book
    if (user.role === "admin") {
      alert("Admins cannot book packages");
      return;
    }

    await createBooking(id);
    alert("Booking created (Pending)");
    navigate("/my-bookings");
  };

  if (loading) return <p>Loading package...</p>;
  if (!pkg) return <p>Package not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{pkg.title}</h2>
      <p><strong>Destination:</strong> {pkg.destination}</p>
      <p><strong>Duration:</strong> {pkg.duration_days} days</p>
      <p><strong>Price:</strong> ₹{pkg.price}</p>
      <p>{pkg.description}</p>

      <button onClick={handleBook}>
        {user ? "Confirm Booking" : "Book Now"}
      </button>
    </div>
  );
};

export default PackageDetails;
