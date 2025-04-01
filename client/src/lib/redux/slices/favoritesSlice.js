import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const serializedFavorites = localStorage.getItem("favorites");
    if (serializedFavorites === null) return { items: [] };

    return JSON.parse(serializedFavorites);
  } catch (err) {
    console.error("Error loading favorites from localStorage:", err);
    return { items: [] };
  }
};

const initialState = loadFavorites();

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
