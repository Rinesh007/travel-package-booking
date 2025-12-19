import { useEffect, useState } from "react";
import { getAllBookings } from "../../api/booking.api";

import { updateBookingStatus } from "../../api/booking.api";

const handleStatusUpdate = async (id, status) => {
  await updateBookingStatus(id, status);
  alert(`Booking ${status.toLowerCase()}`);
  window.location.reload();
};


const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getAllBookings();
        setBookings(res.data);
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Bookings (Admin)</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>User</th>
            <th>Package</th>
            <th>Amount</th>
            <th>Booking Status</th>
            <th>Payment Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.user_name}</td>
              <td>{b.package_title}</td>
              <td>₹{b.total_amount}</td>
              <td>{b.booking_status}</td>
              <td>{b.payment_status}</td>
              <td>{new Date(b.created_at).toLocaleString()}</td>
              <td>
  {b.booking_status === "PENDING" ? (
    <>
      <button
        onClick={() => handleStatusUpdate(b.id, "CONFIRMED")}
      >
        Confirm
      </button>

      <button
        onClick={() => handleStatusUpdate(b.id, "CANCELLED")}
      >
        Cancel
      </button>
    </>
  ) : (
    b.booking_status
  )}
</td>

            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
