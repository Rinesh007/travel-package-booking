import { useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBooking,
  confirmPayment
} from "../api/booking.api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (err) {
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
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  const handlePay = async (bookingId) => {
    try {
      await confirmPayment(bookingId);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      <div style={{ display: "grid", gap: "16px" }}>
        {bookings.map((b) => (
          <div
            key={b.id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "8px"
            }}
          >
            <h3>{b.title}</h3>
            <p>Destination: {b.destination}</p>
            <p>Amount: ₹{b.total_amount}</p>
            <p>Booking Status: {b.booking_status}</p>
            <p>Payment Status: {b.payment_status}</p>

            {b.booking_status === "PENDING" && (
              <>
                <button onClick={() => handlePay(b.id)}>
                  Pay & Confirm
                </button>

                <button
                  onClick={() => handleCancel(b.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Cancel
                </button>
              </>
            )}

            {b.booking_status === "CONFIRMED" && (
              <p style={{ color: "green" }}>
                Booking Confirmed ✅
              </p>
            )}

            {b.booking_status === "CANCELLED" && (
              <p style={{ color: "red" }}>
                Booking Cancelled ❌
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
