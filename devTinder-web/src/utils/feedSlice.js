import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    removeFeedUser: (state, action) => {
      return state.filter((u) => u._id !== action.payload);
    },
  },
});

export const { addFeed, removeFeedUser } = feedSlice.actions;
export default feedSlice.reducer;