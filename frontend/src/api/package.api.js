import api from "./axios";

export const getPackages = async (params = {}) => {
  const response = await api.get("/packages", { params });
  return response.data;
};

// CREATE package (admin only)
export const createPackage = async (data) => {
  const response = await api.post("/packages", data);
  return response.data;
};
export const getDestinations = async () => {
  const response = await api.get("/packages/destinations");
  return response.data;
};
export const getPackageById = async (id) => {
  const response = await api.get(`/packages/${id}`);
  return response.data;
};
export const deletePackage = async (id) => {
  const response = await api.delete(`/packages/${id}`);
  return response.data;
};

export const updatePackage = async (id, data) => {
  const response = await api.put(`/packages/${id}`, data);
  return response.data;
};
