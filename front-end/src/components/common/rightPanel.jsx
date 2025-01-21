import React, { useState, useEffect } from "react";

const RightPanel = ({ isPanelOpen, onClose, fetchUrl }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Fetch content data by ID
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
        setLoading(false);
      });
  }, [fetchUrl]);

  if (loading) return <p>Loading...</p>;
  if (!content) return <p>No content found!</p>;

  console.log(content);
  console.log("content title", content.title);
  console.log("content desc", content.description);

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-xl p-4 transition-all duration-300 ease-in-out transform ${
        isPanelOpen ? "w-full translate-x-0" : "w-0 translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="self-start bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md mb-4"
        >
          Back
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">{content.title}</h2>

        {/* Description */}
        <div className="flex-1 overflow-auto mb-4 px-6">
          {/* Rendering HTML content */}
          <div
            dangerouslySetInnerHTML={{ __html: content.description }}
            className="prose max-w-none text-xs leading-relaxed"
            style={{
              lineHeight: "1.4", // Adjusted line spacing for smaller text
              fontSize: "0.75rem", // 12px font size to simulate the 75% zoom
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
