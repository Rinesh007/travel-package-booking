import { useEffect, useState } from "react";
import {
  getPackages,
  deletePackage
} from "../../api/package.api";
import { useNavigate } from "react-router-dom";

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const fetchPackages = async () => {
    const res = await getPackages();
    setPackages(res.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    await deletePackage(id);
    alert("Package deleted");
    fetchPackages();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Packages</h2>

      {packages.map((pkg) => (
        <div key={pkg.id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h3>{pkg.title}</h3>
          <p>₹{pkg.price} | {pkg.duration_days} days</p>

          <button onClick={() => navigate(`/admin/packages/edit/${pkg.id}`)}>
            Edit
          </button>

          <button onClick={() => handleDelete(pkg.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPackages;
