import axios from "axios";

const BASE_URL = "http://localhost:8003";

export const getAdminStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/admin/stats`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const getAllUsers = async (params?: { role?: string; query?: string }) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/admin/all`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const toggleUserBan = async (id: string) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/users/admin/${id}/ban`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/admin/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
}; 

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/admin/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};
