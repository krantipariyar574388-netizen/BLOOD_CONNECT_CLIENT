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

export const getEligibleDonors = async (params?: {
  bloodGroup?: string;
  district?: string;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/donors`, { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const updateProfile = async (data: {
  fullName: string;
  phone: string;
  district: string;
  profile_image?: FileList;
}) => {
  try {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("phone", data.phone);
    formData.append("district", data.district);
    if (data.profile_image && data.profile_image.length > 0) {
      formData.append("profile_image", data.profile_image[0]);
    }

    const response = await axios.patch(`${BASE_URL}/users/profile`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/users/change-password`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};