import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user_reducer";


const reducer = {
  userReducer,
};

export const store = configureStore({ reducer });
