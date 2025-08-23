import axios from "axios";
export const baseURL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:8000";

const API = axios.create({
  baseURL: baseURL + "/api/v1",
  withCredentials: true,
});

