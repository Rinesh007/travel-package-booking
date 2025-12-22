import { useState } from "react";
import { createPackage } from "../../api/package.api";
import toast, { Toaster } from "react-hot-toast";

const AdminCreatePackage = () => {
  const [form, setForm] = useState({
    title: "",
    destination: "",
    price: "",
    duration_days: "",
    description: "",
    image_url: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await createPackage({
        title: form.title,
        destination: form.destination,
        price: Number(form.price),
        duration_days: Number(form.duration_days),
        description: form.description,
        image_url: form.image_url
      });

      toast.success("Package created successfully");
      setForm({
        title: "",
        destination: "",
        price: "",
        duration_days: "",
        description: "",
        image_url: ""
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Travel Package
        </h2>

        {message && (
          <p className="mb-4 text-sm text-gray-700">{message}</p>
        )}

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
              value={form.image_url}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Package"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreatePackage;
