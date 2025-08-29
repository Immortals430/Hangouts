import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPostAPI,
  deletePostAPI,
  getPostAPI,
  toggleLikeAPI,
} from "../../api/api";

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
    TOGGLE_DELETING_POST: (state, { payload }) => {
      const index = state.posts.findIndex((post) => post.id === payload.id);
      state.posts[index].isDeleting = !state.posts[index].isDeleting;
    },
    DELETE_POST: (state, { payload }) => {
      const index = state.posts.findIndex((post) => post.id === payload.id);
      state.posts.splice(index, 1);
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
    TOGGLE_LIKE: (state, { payload }) => {
      const index = state.posts.findIndex((post) => post.id === payload.id);
      state.posts[index].liked
        ? state.posts[index].likeCount--
        : state.posts[index].likeCount++;
      state.posts[index].liked = !state.posts[index].liked;
    },
  },
});

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
  async (post, { dispatch }) => {
    try {
      dispatch(TOGGLE_DELETING_POST({ id: post.id }));
      await deletePostAPI(post.id);
      dispatch(DELETE_POST({ id: post.id }));
    } catch (err) {
      dispatch(TOGGLE_DELETING_POST({ id: post.id }));
    }
  }
);

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
      dispatch(DELETE_POST({ id: args.id }));
    }
  }
);

// toggle like thunk
export const toggleLikeThunk = createAsyncThunk(
  "post/toggleLike",
  async (post, { dispatch }) => {
    try {
      dispatch(TOGGLE_LIKE({ id: post.id }));
      console.log(post)
      await toggleLikeAPI(post.id);
    } catch (err) {
      dispatch(TOGGLE_LIKE({ id: post.id }));
    }
  }
);

export const {
  PUSH_POST,
  INCREASE_POST_PAGE,
  RESTRICT_FETCH_POST,
  DELETE_POST,
  TOGGLE_DELETING_POST,
  UNSHIFT_POST,
  UPDATE_SINGLE_POST,
  TOGGLE_LIKE,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
export const postSelector = (state) => state.postReducer;
