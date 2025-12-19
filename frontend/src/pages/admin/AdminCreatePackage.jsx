import { useState } from "react";
import { createPackage } from "../../api/package.api";

const AdminCreatePackage = () => {
  const [form, setForm] = useState({
  title: "",
  destination: "",
  price: "",
  duration_days: "",
  description: ""
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
  description: form.description
});


      setMessage("Package created successfully ✅");
      setForm({
        title: "",
        destination: "",
        price: "",
        description: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Create Travel Package</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Package Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
  type="number"
  name="duration_days"
  placeholder="Duration (days)"
  value={form.duration_days}
  onChange={handleChange}
  required
/>


        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Package"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreatePackage;
