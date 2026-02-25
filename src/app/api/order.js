import api from "./axiosInstance";

// Get orders of logged-in user
export const getUserOrders = async () => {
  try {
    const response = await api.get('/order/getuserorder'); // backend route: /api/orders
    return response.data; // { success: true, orders: [...] }
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(
      `/order/updateOrderStatus/${orderId}`,
      { status }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const getAllOrders = async () => {
  try {
    const response = await api.get("/order/getallorders");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};