import { useEffect, useState } from "react";
import {
  getPackages,
  getDestinations
} from "../api/package.api";
import { createBooking } from "../api/booking.api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [destination, setDestination] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");

  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch destinations (for dropdown)
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await getDestinations();
        setDestinations(res.data);
      } catch (err) {
        console.error("Failed to load destinations");
      }
    };

    fetchDestinations();
  }, []);

  // Fetch packages whenever filter/sort changes
  useEffect(() => {
    fetchPackages();
  }, [destination, sort, order]);

  const fetchPackages = async () => {
    setLoading(true);

    const params = {};
    if (destination) params.destination = destination;
    if (sort) params.sort = sort;
    if (order) params.order = order;

    try {
      const res = await getPackages(params);
      setPackages(res.data);
    } catch (err) {
      console.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = async (packageId) => {
    // Guest user → redirect to login
    if (!user) {
      navigate("/login", {
        state: { redirectTo: `/packages/${packageId}` }
      });
      return;
    }

    // Admin should not book
    if (user.role === "admin") {
      alert("Admins cannot book packages");
      return;
    }

    // Logged-in user → go to package details
    navigate(`/packages/${packageId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Travel Packages</h2>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        {/* Destination filter */}
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="">All Destinations</option>
          {destinations.map((dest) => (
            <option key={dest} value={dest}>
              {dest}
            </option>
          ))}
        </select>

        {/* Sort field */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="duration_days">Duration (days)</option>
        </select>

        {/* Sort order */}
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>

        {/* Clear filters */}
        <button
          onClick={() => {
            setDestination("");
            setSort("");
            setOrder("asc");
          }}
        >
          Clear
        </button>
      </div>

      {/* PACKAGES LIST */}
      {loading ? (
        <p>Loading packages...</p>
      ) : packages.length === 0 ? (
        <p>No packages found</p>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px"
              }}
            >
              <h3>{pkg.title}</h3>
              <p><strong>Destination:</strong> {pkg.destination}</p>
              <p><strong>Duration:</strong> {pkg.duration_days} days</p>
              <p><strong>Price:</strong> ₹{pkg.price}</p>
              <p>{pkg.description}</p>

              <button onClick={() => handleBookNow(pkg.id)}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Packages;
