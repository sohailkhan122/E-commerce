import api from "./axiosInstance";

export const payment = async (session_id) => {
  const res = await api.get(`/payment/get-payment/${session_id}`);
  return res.data;
};

