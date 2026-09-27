import axios from "axios";

const BASE_URL = "http://localhost:8003";

export const getMyNotifications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const markNotificationAsRead = async (id: string) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/notifications/${id}/read`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/notifications/read-all`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const deleteNotification = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/notifications/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};