import { useEffect, useState } from "react";
import { getPackages, getDestinations } from "../api/package.api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [destination, setDestination] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");

  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch destinations for filter dropdown
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await getDestinations();
        setDestinations(res.data);
      } catch (error) {
        console.error("Failed to load destinations");
      }
    };

    fetchDestinations();
  }, []);

  // Fetch packages when filters/sort change
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
    } catch (error) {
      console.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (packageId) => {
    // Guest → login first
    if (!user) {
      navigate("/login", {
        state: { redirectTo: `/packages/${packageId}` }
      });
      return;
    }

    // Admin cannot book
    if (user.role === "admin") {
      alert("Admins cannot book packages");
      return;
    }

    // User → package details
    navigate(`/packages/${packageId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Available Travel Packages
      </h2>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Destinations</option>
          {destinations.map((dest) => (
            <option key={dest} value={dest}>
              {dest}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="duration_days">Duration (days)</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>

        <button
          onClick={() => {
            setDestination("");
            setSort("");
            setOrder("asc");
          }}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-500">Loading packages...</p>
      ) : packages.length === 0 ? (
        <p className="text-gray-500">No packages found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={
                  pkg.image_url ||
                  "https://via.placeholder.com/400x250?text=Travel+Package"
                }
                alt={pkg.title}
                className="h-48 w-full object-cover"
              />

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {pkg.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {pkg.destination}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-blue-600">
                    ₹{pkg.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {pkg.duration_days} days
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  {pkg.description}
                </p>

                <button
                  onClick={() => handleBookNow(pkg.id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Packages;
