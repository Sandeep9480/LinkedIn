import { createSlice } from "@reduxjs/toolkit";
import { getAllComments, getAllPosts } from "../../action/postAction";

const initialState = {
  posts: [],
  isError: false,
  postFetched: false,
  isLoding: false,
  loggedIn: false,
  message: "",
  comments: [],
  postId: "",
};

const postSclice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoding = true;
        state.message = "Fetching all the posts...";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        (state.isLoding = false),
          (state.isError = false),
          (state.postFetched = true),
          (state.posts = action.payload.allPost.reverse());
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        (state.isLoding = false),
          (state.isError = true),
          (state.message = action.payload);
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.postId = action.payload.post_id;
        state.comments = action.payload.comments;
        console.log(state.comments);
      });
  },
});
export const { resetPostId } = postSclice.actions;

export default postSclice.reducer;
