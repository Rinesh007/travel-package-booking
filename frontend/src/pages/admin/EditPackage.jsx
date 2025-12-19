import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackageById, updatePackage } from "../../api/package.api";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      const res = await getPackageById(id);
      setForm(res.data);
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await updatePackage(id, {
      ...form,
      price: Number(form.price),
      duration_days: Number(form.duration_days)
    });

    setLoading(false);
    alert("✅ Package updated successfully");
    navigate("/admin/packages");
  };

  if (!form) {
    return <p className="text-center mt-10">Loading package...</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Travel Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Package Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Destination
            </label>
            <input
              name="destination"
              value={form.destination}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Image URL
            </label>
            <input
              name="image_url"
              placeholder="Paste image URL from Unsplash"
              value={form.image_url || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Duration (days)
              </label>
              <input
                type="number"
                name="duration_days"
                value={form.duration_days}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/packages")}
              className="flex-1 border py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;
