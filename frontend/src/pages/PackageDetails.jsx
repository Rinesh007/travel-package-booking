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
    if (!user) {
      navigate("/login", {
        state: { redirectTo: location.pathname }
      });
      return;
    }

    if (user.role === "admin") {
      alert("Admins cannot book packages");
      return;
    }

    await createBooking(id);
    alert("Booking created (Pending)");
    navigate("/my-bookings");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading package...</p>;
  }

  if (!pkg) {
    return <p className="text-center mt-10">Package not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
      {/* IMAGE */}
      <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
        <img
          src={pkg.image_url || "https://via.placeholder.com/1200x500"}
          alt={pkg.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <h1 className="text-white text-4xl font-bold p-6">
            {pkg.title}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: DETAILS */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About this package
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            {pkg.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-semibold text-gray-800">
                📍 {pkg.destination}
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold text-gray-800">
                ⏱ {pkg.duration_days} days
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-semibold text-blue-600">
                ₹{pkg.price}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: BOOKING CARD */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Ready to book?
          </h3>

          <p className="text-gray-600 mb-4">
            Secure your spot for this amazing trip.
          </p>

          <div className="text-3xl font-bold text-blue-600 mb-6">
            ₹{pkg.price}
          </div>

          <button
            onClick={handleBook}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {user ? "Confirm Booking" : "Book Now"}
          </button>

          {!user && (
            <p className="text-xs text-gray-500 text-center mt-3">
              You’ll be asked to login before booking
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
