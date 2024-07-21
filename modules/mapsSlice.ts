import { createSlice } from "@reduxjs/toolkit";
import { PreferenceMap } from "@/types/map";
import { Layout } from "react-grid-layout";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  maps: [] as PreferenceMap[],
};

export const mapsSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    addMap: (state, action) => {
      state.maps.push(action.payload);
    },
    updateMap: (state, action) => {
      const index = state.maps.findIndex((map) => map.id === action.payload.id);
      if (index !== -1) {
        state.maps[index] = { ...state.maps[index], ...action.payload };
      }
    },
    deleteMap: (state, action) => {
      state.maps = state.maps.filter((map) => map.id !== action.payload);
    },
    updateMapsLayout: (state, action: PayloadAction<Layout[]>) => {
      state.maps = state.maps.map((map) => {
        const layoutItem = action.payload.find((item) => item.i === map.id);
        if (layoutItem) {
          return {
            ...map,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
        return map;
      });
    },

    setMaps: (state, action: PayloadAction<PreferenceMap[]>) => {
      state.maps = action.payload;
    },
  },
});

export const { addMap, updateMap, deleteMap, setMaps, updateMapsLayout } =
  mapsSlice.actions;

export default mapsSlice.reducer;
