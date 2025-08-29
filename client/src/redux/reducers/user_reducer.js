import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserAPI,
  googleLoginAPI,
  loginAPI,
  logoutAPI,
} from "../../api/api";
import { toast } from "react-toastify";

const initialState = {
  currentUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_CURRENTUSER: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

// get loggedin user thunk
export const getCurrentUserThunk = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { dispatch }) => {
    const { data } = await getCurrentUserAPI();
    dispatch(SET_CURRENTUSER(data.data));
  }
);

// login thunk
export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch }) => {
    try {
      const { data } = await loginAPI(credentials);
      dispatch(SET_CURRENTUSER(data.data));
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
    }
  }
);

// login with google thunk
export const googleLoginThunk = createAsyncThunk(
  "user/googleLogin",
  async (token, { dispatch }) => {
    const { data } = await googleLoginAPI(token);
    dispatch(SET_CURRENTUSER(data.data));
  }
);

// logout
export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    const { data } = await logoutAPI();
    dispatch(SET_CURRENTUSER(data.data));
  }
);

export const { SET_CURRENTUSER } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector = (state) => state.userReducer;
