import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addToComparison: (state, action) => {
      if (
        state.items.length < 2 &&
        !state.items.some((item) => item.id === action.payload.id)
      ) {
        state.items.push(action.payload);
      }
    },
    removeFromComparison: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearComparison: (state) => {
      state.items = [];
    },
  },
});

export const { addToComparison, removeFromComparison, clearComparison } =
  comparisonSlice.actions;
export default comparisonSlice.reducer;
