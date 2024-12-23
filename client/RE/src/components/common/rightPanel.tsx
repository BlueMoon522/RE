interface RightPanelProps {
  isPanelOpen: boolean;
  onClose: () => void; // Function to handle closing the panel
}

const RightPanel: React.FC<RightPanelProps> = ({ isPanelOpen, onClose }) => {
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
        <div className="mt-4 border-t pt-2">
          <p>Panel Footer</p>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
