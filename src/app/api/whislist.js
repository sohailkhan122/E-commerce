import api from "./axiosInstance";

/* =========================
   ADD TO WISHLIST
========================= */
export const addToWishlist = async (productId) => {
  try {
    const response = await api.post("/wishlist/add", { productId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

/* =========================
   GET WISHLIST
========================= */
export const getWishlist = async () => {
  try {
    const response = await api.get("/wishlist");
    return response.data; // ✅ response.data contains { success, wishlist }
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

/* =========================
   REMOVE FROM WISHLIST
========================= */
export const removeFromWishlist = async (productId) => {
  try {
    const response = await api.delete("/wishlist/remove", {
      data: { productId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};