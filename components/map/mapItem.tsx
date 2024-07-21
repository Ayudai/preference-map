import React from "react";
import { PreferenceMap } from "@/types/map";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { useState } from "react";

// MapItem component
export const MapItem = React.memo(({ map }: { map: PreferenceMap }) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderCaseIntroduce = () => (
    <motion.div
      className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.img
        src={map.profileImage}
        alt="Profile"
        className="w-32 h-32 rounded-full mb-4 border-4 border-white"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1 }}
      />
      <motion.h3
        className="text-3xl font-bold mb-2 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {map.name}
      </motion.h3>
      <motion.p
        className="text-lg text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {map.summary}
      </motion.p>
    </motion.div>
  );

  const renderMapContent = useCallback(() => {
    switch (map.type) {
      case "text":
        return (
          <p className="text-gray-600">{map.content || map.description}</p>
        );
      case "image":
        return map.content ? (
          <img src={map.content} alt={map.title} className="w-full h-auto" />
        ) : (
          <p>Add an image URL</p>
        );
      case "video":
        return map.content ? (
          <video controls className="w-full h-auto">
            <source src={map.content} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Add a video URL</p>
        );
      case "movie":
        return (
          <div>
            <p>
              <strong>Title:</strong> {map.title}
            </p>
            <p>
              <strong>Director:</strong> {map.content}
            </p>
            <p>
              <strong>Rating:</strong> Not rated yet
            </p>
          </div>
        );
      case "caseIntroduce":
        return renderCaseIntroduce();
      default:
        return <p>Unknown map type</p>;
    }
  }, [map]);

  return (
    <div
      className={`${map.color} p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow h-full w-full`}
    >
      <h2 className="text-xl font-semibold mb-2">{map.title}</h2>
      {renderMapContent()}
    </div>
  );
});
