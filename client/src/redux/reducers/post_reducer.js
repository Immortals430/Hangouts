import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPostAPI, deletePostAPI, getPostAPI } from "../../api/api";

const initialState = {
  posts: [],
  page: 1,
  hasPost: true,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    PUSH_POST: (state, { payload }) => {
      state.posts.push(...payload);
    },
    INCREASE_POST_PAGE: (state) => {
      state.page = state.page + 1;
    },
    RESTRICT_FETCH_POST: (state) => {
      state.hasPost = false;
    },
    DELETE_POST: (state, { payload }) => {
      let index;
      if (!payload.index) {
        index = state.posts.findIndex((post) => post.id === payload.id);
      } else index = payload.index;
      state.posts.splice(payload, 1);
    },
    RESTORE_POST: (state, { payload }) => {
      state.posts.splice(payload.index, 0, payload);
    },
    UNSHIFT_POST: (state, { payload }) => {
      state.posts.unshift(payload);
    },
    UPDATE_SINGLE_POST: (state, { payload }) => {
      const index = state.posts.findIndex(
        (post) => post.id === payload.tempPost.id
      );
      state.posts[index] = payload.data;
    },
  },
});

// create post thunk
export const createPostThunk = createAsyncThunk(
  "post/createPost",
  async (args, { dispatch }) => {
    try {
      const { caption, url } = args;
      dispatch(UNSHIFT_POST(args));
      const { data } = await createPostAPI({ caption, image: url });
      dispatch(UPDATE_SINGLE_POST({ tempPost: args, data: data.data }));
    } catch (err) {
      dispatch(DELETE_POST({id: args.id}))
    }
  }
);

// get post thunk
export const getPostThunk = createAsyncThunk(
  "post/getPost",
  async (page, { dispatch }) => {
    const { data } = await getPostAPI(page);
    dispatch(PUSH_POST(data.data));
    dispatch(INCREASE_POST_PAGE());
    if (!data.data.length) dispatch(RESTRICT_FETCH_POST());
  }
);

// delete post thunk
export const deletePostThunk = createAsyncThunk(
  "post/deletePost",
  async (args, { dispatch }) => {
    try {
      dispatch(DELETE_POST({ index: args.index }));
      await deletePostAPI(args.post.id);
    } catch (err) {
      dispatch(RESTORE_POST(args.post));
    }
  }
);

export const {
  PUSH_POST,
  INCREASE_POST_PAGE,
  RESTRICT_FETCH_POST,
  DELETE_POST,
  RESTORE_POST,
  UNSHIFT_POST,
  UPDATE_SINGLE_POST,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
export const postSelector = (state) => state.postReducer;
