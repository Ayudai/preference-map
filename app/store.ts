import { configureStore } from "@reduxjs/toolkit";
import mapsReducer from "@/modules/mapsSlice";

export const store = configureStore({
  reducer: {
    maps: mapsReducer,
  },
});
