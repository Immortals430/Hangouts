import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "../../api/api";

const initialState = {
  currentUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, { payload }) => {
      console.log("execute login");
      // state.currentUser = payload
    });
  },
});

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials) => {
    // const {data} = await loginAPI(credentials)
    // return data.data;
  }
);


export const googleLoginThunk = createAsyncThunk(
  "user/googleLogin",
  async (token) => {
    // const {data} = await loginAPI(credentials)
    // return data.data;
  }
);


export const changePasswordThunk = createAsyncThunk(
  "user/changePassword",
  async () => {

  }
);


export const sendOtpThunk = createAsyncThunk(
  "user/sendOtp",
  async () => {

  }
);

export const actions = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector = (state) => state.userReducer;
