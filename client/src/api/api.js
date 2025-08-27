import axios from "axios";
export const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const API = axios.create({
  baseURL: baseURL + "/api/v1",
  withCredentials: true,
});


export const loginAPI = (credentials) => API.post("/user/login", credentials);

export const googleLoginAPI = (token) =>
  API.post("/user/google-login", null, {
    headers: {
      Authorization: token,
    },
  });

export const signupAPI = (formdata) => API.post("/user/signup", formdata);

export const getCurrentUserAPI = () => API.get("/user/check-authorization");

export const sendOtpAPI = (email) => API.post("/user/send-otp", { email })

export const changePasswordAPI = (formdata) => API.post("/user/change-password", formdata)