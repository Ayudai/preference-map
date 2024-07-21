import { MapType } from "@/types/map";
import React, { useState } from "react";
import { PreferenceMap } from "@/types/map";

export const MapForm: React.FC<{
  onAddMap: (type: MapType, data?: Partial<PreferenceMap>) => void;
}> = React.memo(({ onAddMap }) => {
  const [newMapType, setNewMapType] = useState<MapType>("text");
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMapType === "caseIntroduce") {
      onAddMap(newMapType, { name, summary, profileImage });
    } else {
      onAddMap(newMapType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <select
        value={newMapType}
        onChange={(e) => setNewMapType(e.target.value as MapType)}
        className="mr-4 p-2 rounded"
      >
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="movie">Movie</option>
        <option value="caseIntroduce">Case Introduce</option>
      </select>
      {newMapType === "caseIntroduce" && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="mr-2 p-2 rounded"
          />
          <input
            type="text"
            placeholder="Profile Image URL"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            className="mr-2 p-2 rounded"
          />
        </>
      )}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
      >
        Add Map
      </button>
    </form>
  );
});
