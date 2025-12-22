import { useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBooking,
  confirmPayment
} from "../api/booking.api";
import toast from "react-hot-toast";

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700"
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed");

    }
  };

  const handlePay = async (bookingId) => {
    try {
      await confirmPayment(bookingId);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading your bookings...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {b.title}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                 {b.destination}
              </p>

              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-blue-600">
                  ₹{b.total_amount}
                </span>
                <StatusBadge status={b.booking_status} />
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Payment Status:{" "}
                <span className="font-medium">
                  {b.payment_status}
                </span>
              </p>

              {/* ACTIONS */}
              {b.booking_status === "PENDING" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handlePay(b.id)}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    Pay & Confirm
                  </button>

                  <button
                    onClick={() => handleCancel(b.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {b.booking_status === "CONFIRMED" && (
                <p className="text-green-600 font-medium">
                   Booking Confirmed
                </p>
              )}

              {b.booking_status === "CANCELLED" && (
                <p className="text-red-600 font-medium">
                   Booking Cancelled
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
