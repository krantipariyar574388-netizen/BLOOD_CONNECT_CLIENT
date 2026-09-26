import axios from "axios";
import { TCreateBloodRequest } from "@/types/bloodRequest.types";

const BASE_URL = "http://localhost:8003";

export const createBloodRequest = async (data: TCreateBloodRequest) => {
  try {
    const formData = new FormData();
    formData.append("patient", data.patient);
    formData.append("bloodGroup", data.bloodGroup);
    formData.append("units", String(data.units));
    formData.append("hospital", data.hospital);
    formData.append("district", data.district);
    formData.append("phone", data.phone);
    formData.append("requiredDate", data.requiredDate);
    formData.append("urgency", data.urgency);

    if (data.medicalDocument && data.medicalDocument.length > 0) {
      formData.append("medicalDocument", data.medicalDocument[0]);
    }

    const response = await axios.post(
      `${BASE_URL}/bloodrequests`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error: any) {
    throw (
      error?.response?.data ?? {
        message: error?.message ?? "Network error. Is the server running?",
      }
    );
  }
};

export const getAllBloodRequests = async (params?: {
  bloodGroup?: string;
  district?: string;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/bloodrequests`, { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const getMyRequests = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bloodrequests/my`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const fulfillBloodRequest = async (id: string) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/bloodrequests/${id}/fulfill`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const cancelBloodRequest = async (id: string) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/bloodrequests/${id}/cancel`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};

export const getBloodRequestById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/bloodrequests/${id}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data ?? { message: error?.message ?? "Network error" };
  }
};