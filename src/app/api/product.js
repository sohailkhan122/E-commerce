import api from "./axiosInstance";

// ✅ Get all products
export const getAllProducts = async () => {
  const res = await api.get("/product/getAllProducts");
  return res.data;
};

// ✅ Get product by ID
export const getProductById = async (id) => {
  const res = await api.get(`/product/getProductById/${id}`);
  return res.data;
};

// ✅ Create product (Admin)
export const createProduct = async (data) => {
  const res = await api.post("/product/createProduct", data);
  return res.data;
};

// ✅ Update product (Admin)
export const updateProduct = async (id, data) => {
  const res = await api.put(`/product/updateProduct/${id}`, data);
  return res.data;
};

// ✅ Delete product (Admin)
export const deleteProduct = async (id) => {
  const res = await api.delete(`/product/deleteProducts/${id}`);
  return res.data;
};

// ✅ Get products by Type
export const getProductsByCategory = async (category) => {
  const res = await api.get(`/product/getProductsByCategory/${category}`);
  return res.data;
};

