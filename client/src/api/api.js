import axios from "axios";
export const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const API = axios.create({
  baseURL: baseURL + "/api/v1",
  withCredentials: true,
});

// post routes
export const getPostAPI = (page, userId="") =>
  API.get(`/post/get-post?page=${page}&userId=${userId}`);
export const deletePostAPI = (postId) =>
  API.delete(`/post/delete-post/${postId}`);
export const createPostAPI = (data) =>
  API.post(`/post/add-post`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  

// user routes
export const loginAPI = (credentials) => API.post("/user/login", credentials);
export const googleLoginAPI = (token) =>
  API.post("/user/google-login", null, {
    headers: {
      Authorization: token,
    },
  });
export const signupAPI = (formdata) => API.post("/user/signup", formdata);
export const getCurrentUserAPI = () => API.get("/user/check-authorization");
export const sendOtpAPI = (email) => API.post("/user/send-otp", { email });
export const changePasswordAPI = (formdata) =>
  API.post("/user/change-password", formdata);
export const logoutAPI = () => API.get("/user/logout");
