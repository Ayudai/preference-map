"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { PlusIcon } from "@heroicons/react/24/solid";
import { LayoutSelectorProps } from "@/types/map";
import { MapForm } from "@/components/map/mapForm";
import { MapItem } from "@/components/map/mapItem";
import { useMapManagement } from "@/hook/useMapManagement";
import { PreferenceMap } from "@/types/map";

const ResponsiveGridLayout = WidthProvider(Responsive);

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onSelectLayout }) => {
  return (
    <div className="mb-6">
      <select
        onChange={(e) => onSelectLayout(e.target.value)}
        className="mr-4 p-2 rounded"
      >
        <option value="">カスタムレイアウト</option>
        <option value="layout1">レイアウト1</option>
        <option value="layout2">レイアウト2</option>
      </select>
    </div>
  );
};

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });

  const { maps, addNewMap, onLayoutChange, setFixedLayout } =
    useMapManagement();
  const [showNewMapForm, setShowNewMapForm] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string>("");

  const handleLayoutSelect = (layoutKey: string): void => {
    setFixedLayout(layoutKey);
    setSelectedLayout(layoutKey);
    setShowNewMapForm(false);
  };

  const memoizedLayouts = useMemo(
    () => ({
      lg: maps.map((map: PreferenceMap) => ({ ...map, i: map.id })),
    }),
    [maps]
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to your Preference Maps, {session?.user?.name}
      </h1>

      <LayoutSelector onSelectLayout={handleLayoutSelect} />

      {!showNewMapForm ? (
        <button
          onClick={() => setShowNewMapForm(true)}
          className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Map
        </button>
      ) : (
        <MapForm
          onAddMap={(type) => {
            addNewMap(type);
            setShowNewMapForm(false);
          }}
        />
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={memoizedLayouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={150}
        onLayoutChange={onLayoutChange}
      >
        {maps.map((map: PreferenceMap) => (
          <div key={map.id}>
            <MapItem map={map} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
