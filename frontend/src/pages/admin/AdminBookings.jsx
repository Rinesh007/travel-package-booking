import { useEffect, useState } from "react";
import {
  getAllBookings,
  updateBookingStatus
} from "../../api/booking.api";
import { Toaster } from "react-hot-toast";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await getAllBookings();
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

  const handleStatusUpdate = async (id, status) => {
    await updateBookingStatus(id, status);
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, booking_status: status } : b
      )
    );
  };

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          All Bookings (Admin)
        </h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="p-3">User</th>
                  <th className="p-3">Package</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Booking Status</th>
                  <th className="p-3">Payment Status</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{b.user_name}</td>
                    <td className="p-3">{b.package_title}</td>
                    <td className="p-3 font-semibold text-blue-600">
                      ₹{b.total_amount}
                    </td>

                    {/* Booking Status */}
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold
                          ${
                            b.booking_status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : b.booking_status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {b.booking_status}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="p-3">
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">
                        {b.payment_status}
                      </span>
                    </td>

                    <td className="p-3 text-sm text-gray-500">
                      {new Date(b.created_at).toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="p-3">
                      {b.booking_status === "PENDING" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(b.id, "CONFIRMED")
                            }
                            className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                          >
                            Confirm
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(b.id, "CANCELLED")
                            }
                            className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
