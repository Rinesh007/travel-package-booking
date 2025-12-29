import api from "./axios";

export const loginUser = (data) => {
  return api.post("/auth/login", data, {
    withCredentials: true
  });
};


export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
