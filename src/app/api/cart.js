import api from "./axiosInstance";

export const addToCart = async ({ productId, size, color }) => {
  const res = await api.post("/cart/addToCart", { productId, size, color });
  return res.data;
};

export const getCart = async () => {
  const res = await api.get("/cart/getcart");
  return res.data;
};

export const deleteFromCart = async (productId) => {
  const res = await api.delete(`/cart/delete/${productId}`);
  return res.data;
};

export const updateQuantity = async ({ productId, quantity }) => {
  const res = await api.put("/cart/updatequantity", { productId, quantity });
  return res.data;
};
