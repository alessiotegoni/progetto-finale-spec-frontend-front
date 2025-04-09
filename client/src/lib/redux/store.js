import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { devicesApi } from "./services/devicesApi";
import favoritesReducer from "./slices/favoritesSlice";
import comparisonReducer from "./slices/comparisonSlice";

export const store = configureStore({
  reducer: {
    [devicesApi.reducerPath]: devicesApi.reducer,
    favorites: favoritesReducer,
    comparison: comparisonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(devicesApi.middleware),
});

setupListeners(store.dispatch);
