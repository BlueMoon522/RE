import React, { useState } from "react";

interface RightPanelProps {
  isPanelOpen: boolean;
  onClose: () => void; // Function to handle closing the panel
}

const RightPanel: React.FC<RightPanelProps> = ({ isPanelOpen, onClose }) => {
  const [isContentVisible, setIsContentVisible] = useState(false); // State to manage visibility of the footer content
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage showing the confirmation prompt

  const handleShowContent = () => {
    setShowConfirmation(true); // Show the confirmation prompt when the user presses "Show"
  };

  const handleConfirmShowContent = () => {
    setIsContentVisible(true); // Confirm and show the footer content
    setShowConfirmation(false); // Hide the confirmation prompt
  };

  const handleCancelShowContent = () => {
    setShowConfirmation(false); // Cancel and hide the confirmation prompt
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-xl p-4 transition-all duration-300 ease-in-out transform ${
        isPanelOpen ? "w-1/3 translate-x-0" : "w-0 translate-x-full"
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
        <h2 className="text-xl font-bold mb-4">Panel Title</h2>

        {/* Description */}
        <div className="flex-1 overflow-auto mb-4">
          <p>
            {/* Description content */}
            This is the description section. You can put a large amount of text
            here. It will scroll if the content exceeds the available space.
          </p>
          <div className="mt-4">
            <img
              src="https://c7.alamy.com/comp/MR0G79/random-pictures-MR0G79.jpg"
              alt="Placeholder Image"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 border-t pt-2 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Answer</h3>{" "}
          {/* Footer name */}
          {showConfirmation ? (
            <div>
              <p>Are you sure you want to reveal the content?</p>
              <div className="mt-2">
                <button
                  onClick={handleConfirmShowContent}
                  className="bg-green-500 text-white px-2 py-1 rounded-md mr-2 text-sm"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelShowContent}
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <div>
              {!isContentVisible && (
                <div className="flex items-center w-full justify-between">
                  <p>Reveal the hidden content</p>
                  <button
                    onClick={handleShowContent}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs ml-auto"
                  >
                    Show
                  </button>
                </div>
              )}

              {isContentVisible && (
                <div className="mt-4">
                  <p>Here is the footer content that was hidden before.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
