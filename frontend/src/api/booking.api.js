import api from "./axios";

export const createBooking = async (packageId) => {
  const response = await api.post("/bookings", { packageId });
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/bookings/me");
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await api.delete(`/bookings/${bookingId}`);
  return response.data;
};

export const confirmPayment = async (bookingId) => {
  const response = await api.post(`/bookings/${bookingId}/pay`);
  return response.data;
};

export const getAllBookings = async () => {
  const response = await api.get("/bookings/all");
  return response.data;
};
export const updateBookingStatus = async (id, status) => {
  const response = await api.put(`/bookings/${id}/status`, { status });
  return response.data;
};

