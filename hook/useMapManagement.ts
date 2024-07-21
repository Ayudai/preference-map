import { useState, useCallback } from "react";
import { PreferenceMap, MapType } from "@/types/map";
import { FixedLayout } from "@/types/map";
import {
  addMap,
  updateMap,
  updateMapsLayout,
  setMaps,
} from "@/modules/mapsSlice";
import { useSelector, useDispatch } from "react-redux";

const fixedLayouts: FixedLayout = {
  layout1: [
    {
      title: "Text Map",
      type: "text",
      description: "",
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    },
    {
      title: "Image Map",
      type: "image",
      description: "",
      x: 1,
      y: 0,
      w: 1,
      h: 1,
    },
    {
      title: "Video Map",
      type: "video",
      description: "",
      x: 0,
      y: 1,
      w: 2,
      h: 2,
    },
  ],
  layout2: [
    {
      title: "Movie Map",
      type: "movie",
      description: "",
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      title: "Text Map",
      type: "text",
      description: "",
      x: 2,
      y: 0,
      w: 1,
      h: 1,
    },
    {
      title: "Image Map",
      type: "image",
      description: "",
      x: 2,
      y: 1,
      w: 1,
      h: 1,
    },
  ],
};

const colors = [
  "bg-pink-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
];

// Custom hook for map management
export const useMapManagement = () => {
  const maps = useSelector((state: any) => state.maps.maps);
  const dispatch = useDispatch();

  const addNewMap = useCallback(
    (type: MapType, data?: Partial<PreferenceMap>) => {
      const newMap: PreferenceMap = {
        id: Date.now().toString(),
        title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Map`,
        description: "Click to edit",
        color: colors[Math.floor(Math.random() * colors.length)],
        type: type,
        content: "",
        x: 0,
        y: Infinity,
        w:
          type === "video" || type === "movie" || type === "caseIntroduce"
            ? 2
            : 1,
        h:
          type === "video" || type === "movie" || type === "caseIntroduce"
            ? 3
            : 2,
        ...data,
      };
      console.log(newMap);
      dispatch(addMap(newMap));
    },
    []
  );

  const onLayoutChange = useCallback((layout: any) => {
    dispatch(updateMapsLayout(layout));
  }, []);

  const setFixedLayout = useCallback((layoutKey: string) => {
    if (layoutKey && fixedLayouts[layoutKey]) {
      const newMaps: PreferenceMap[] = fixedLayouts[layoutKey].map((item) => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        color: colors[Math.floor(Math.random() * colors.length)],
        content: "",
      }));
      dispatch(setMaps(newMaps));
    } else {
      console.error("Invalid layout key");
    }
  }, []);

  const handleUpdateMap = (updatedMap: PreferenceMap) => {
    dispatch(updateMap(updatedMap));
  };

  return { maps, addNewMap, onLayoutChange, setFixedLayout, handleUpdateMap };
};
