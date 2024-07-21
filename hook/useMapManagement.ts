import { useState, useCallback } from "react";
import { PreferenceMap, MapType } from "@/types/map";
import { FixedLayout } from "@/types/map";

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
  const [maps, setMaps] = useState<PreferenceMap[]>([]);

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
      setMaps((prevMaps) => [...prevMaps, newMap]);
    },
    []
  );

  const onLayoutChange = useCallback((layout: any) => {
    setMaps((prevMaps) =>
      prevMaps.map((map) => {
        const layoutItem = layout.find((item: any) => item.i === map.id);
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
      })
    );
  }, []);

  const setFixedLayout = useCallback((layoutKey: string) => {
    if (layoutKey && fixedLayouts[layoutKey]) {
      const newMaps: PreferenceMap[] = fixedLayouts[layoutKey].map((item) => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        color: colors[Math.floor(Math.random() * colors.length)],
        content: "",
      }));
      setMaps(newMaps);
    } else {
      setMaps([]);
    }
  }, []);

  const handleUpdateMap = (updatedMap: PreferenceMap) => {
    setMaps((prevMaps) =>
      prevMaps.map((map) => (map.id === updatedMap.id ? updatedMap : map))
    );
  };

  return { maps, addNewMap, onLayoutChange, setFixedLayout, handleUpdateMap };
};
