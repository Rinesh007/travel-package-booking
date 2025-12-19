import { useEffect, useState } from "react";
import { getPackages, deletePackage } from "../../api/package.api";
import { useNavigate } from "react-router-dom";

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      const res = await getPackages();
      setPackages(res.data);
    } catch {
      console.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    await deletePackage(id);
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return <p className="text-center mt-10">Loading packages...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Manage Packages
        </h2>

        {packages.length === 0 ? (
          <p className="text-gray-500">No packages found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* IMAGE */}
                <img
                  src={
                    pkg.image_url ||
                    "https://via.placeholder.com/400x250?text=Travel+Package"
                  }
                  alt={pkg.title}
                  className="h-40 w-full object-cover"
                />

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {pkg.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {pkg.duration_days} days · ₹{pkg.price}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() =>
                        navigate(`/admin/packages/edit/${pkg.id}`)
                      }
                      className="flex-1 px-3 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="flex-1 px-3 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPackages;
