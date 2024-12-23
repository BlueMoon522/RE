import React, { useState } from "react";
import RightPanel from "@/components/common/rightPanel";

const Submit: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    alert(`Submitted text: ${text}`);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/background2.jpg')",
      }}
    >
      {/* Overlay for background */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Section */}
      <main
        className="relative z-10 flex flex-col items-center bg-white shadow-2xl rounded-xl p-8 mt-10 w-[90%] max-w-2xl transition-all duration-300"
        style={{
          marginRight: isPanelOpen ? "33.33%" : "0", // Shift to the left when panel is open
        }}
      >
        <h2 className="text-4xl font-bold text-blue-600 mb-6">Question here</h2>

        {/* Help Button positioned above the textarea */}
        <div className="relative w-full mb-6">
          <button
            className="absolute top-[-30px] right-0 text-xl cursor-pointer"
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              position: "absolute",
            }}
            title="This is inside the ? mark button"
          >
            ?
          </button>

          {/* Textarea Section */}
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            placeholder="Type your text here..."
            value={text}
            onChange={handleTextChange}
            style={{
              height: "auto",
              minHeight: "50px", // Initial height
              maxHeight: "300px", // Maximum height
              overflowY: "auto", // Scroll if it exceeds max height
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-xl transition-all"
        >
          Submit
        </button>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={togglePanel}
        className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-2xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-green-300 transition-transform transform hover:scale-110"
        title="Open Panel"
      >
        +
      </button>

      {/* Right Panel */}
      <RightPanel
        isPanelOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />

      {/* Footer Section */}
    </div>
  );
};

export default Submit;
