import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackageById, updatePackage } from "../../api/package.api";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      const res = await getPackageById(id);
      setForm(res.data);
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePackage(id, form);
    alert("Package updated");
    navigate("/admin/packages");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Package</h2>

      <input name="title" value={form.title} onChange={handleChange} />
      <input name="destination" value={form.destination} onChange={handleChange} />
      <input name="price" value={form.price} onChange={handleChange} />
      <input name="duration_days" value={form.duration_days} onChange={handleChange} />
      <textarea name="description" value={form.description} onChange={handleChange} />

      <button type="submit">Save</button>
    </form>
  );
};

export default EditPackage;
