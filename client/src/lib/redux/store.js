import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { smartphonesApi } from "./services/smartphonesApi";
import favoritesReducer from "./slices/favoritesSlice";
import comparisonReducer from "./slices/comparisonSlice";

export const store = configureStore({
  reducer: {
    [smartphonesApi.reducerPath]: smartphonesApi.reducer,
    favorites: favoritesReducer,
    comparison: comparisonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(smartphonesApi.middleware),
});

setupListeners(store.dispatch);
