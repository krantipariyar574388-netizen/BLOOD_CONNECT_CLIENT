import axios from "axios";

const BASE_URL = "http://localhost:8003";

export const getLandingStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stats/landing`);
    return response.data.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};