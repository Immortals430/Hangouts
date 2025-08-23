import axios from "axios";
import { toast } from "react-toastify";
export const baseURL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8000";

const API = axios.create({
  baseURL: baseURL + "/api/v1",
  withCredentials: true,
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.message || "Something went wrong");
    return Promise.reject(error);
  }
);

export const loginAPI = (credentials) => API.post("/user/login", credentials);

