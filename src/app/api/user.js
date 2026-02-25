import api from "./axiosInstance";

// ---------------- REGISTER ----------------
export const registerUser = async (userData) => {
    try {
        const res = await api.post("/user/register", userData);
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

// ---------------- LOGIN ----------------
export const loginUser = async (email, password) => {
    try {
        const res = await api.post("/user/login", { email, password });
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

// ---------------- LOGOUT ----------------
export const logoutUser = async () => {
    try {
        const res = await api.post("/user/logout");
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

// ---------------- FORGOT PASSWORD ----------------
export const forgotPassword = async (data) => {
    console.log("API Call: forgotPassword with data:", data);
    try {
        const res = await api.post("/user/forgot-password", data);
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
}
// ---------------- RESET PASSWORD ----------------
export const resetPassword = async (token, password) => {
    try {
        const res = await api.post(`/user/reset-password/${token}`, { password });
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

// ---------------- GET CURRENT USER ----------------
export const getCurrentUser = async () => {
    try {
        const res = await api.get("/user/current"); // no userId needed
        return res.data; // { user: {...} }
    } catch (err) {
        throw err.response?.data || err;
    }
};

// ---------------- UPDATE USER ----------------
export const updateUser = async (updateData) => {
    try {
        const res = await api.put("/user/updateUser", updateData); // cookie se identify hoga
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

// ---------------- GET ALL USERS (ADMIN) ----------------
export const getAllUsers = async () => {
    try {
        const res = await api.get("/user/getalluser");
        return res.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};