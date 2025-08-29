import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user_reducer";
import { postReducer } from "./reducers/post_reducer";


const reducer = {
  userReducer,
  postReducer
};

export const store = configureStore({ reducer });
