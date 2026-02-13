"use client";
import React, { useState, useEffect } from "react";
import { Button, Tag } from "antd";

const MediaPage = () => {
  const [mediaItems, setMediaItems] = useState([]);

  // Example static data, replace with API call if needed
  useEffect(() => {
    const items = [
      { id: 1, type: "Video", title: "Euphoria Launch Event", date: "Jan 10, 2026" },
      { id: 2, type: "Image", title: "New Collection Photoshoot", date: "Feb 05, 2026" },
      { id: 3, type: "Video", title: "Behind the Scenes", date: "Feb 12, 2026" },
      { id: 4, type: "Image", title: "Team Workshop Highlights", date: "Jan 22, 2026" },
      { id: 5, type: "Image", title: "Customer Testimonials", date: "Dec 30, 2025" },
      { id: 6, type: "Video", title: "Fashion Trends 2026", date: "Jan 15, 2026" },
    ];
    setMediaItems(items);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
          Media Gallery
        </h1>
        <p className="text-gray-600 text-center md:text-lg">
          Explore our latest media coverage, photos, and videos from events and campaigns.
        </p>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              {/* Placeholder for image/video */}
              <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center text-gray-500 font-medium">
                {item.type}
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800 mt-4">{item.title}</h2>

              {/* Footer */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500 text-sm">{item.date}</span>
                <Tag color={item.type === "Video" ? "purple" : "green"}>{item.type}</Tag>
              </div>

              {/* Optional button */}
              <Button
                type="primary"
                className="mt-4 bg-purple-600 border-none hover:bg-purple-700"
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
