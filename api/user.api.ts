import axios from "axios";

const BASE_URL = "http://localhost:8003";

export const getMe = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const toggleAvailability = async () => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/users/toggle-availability`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};