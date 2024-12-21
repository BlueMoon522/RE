import Card from "../../components/common/card";
import RightPanel from "@/components/common/rightPanel";
import { useState } from "react";
export default function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // Toggle the right panel visibility
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  return (
    <div className="flex h-screen">
      {/* Left Panel (Card and other content) */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isPanelOpen ? "w-2/3" : "w-full"
        }`}
      >
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out m-4"
          onClick={togglePanel}
        >
          Open Panel
        </button>

        {/* Cards or other content */}
        <div className="flex flex-wrap gap-y-8 gap-x-4 justify-start pt-8 pl-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>

      {/* Right Panel */}
      <RightPanel isPanelOpen={isPanelOpen} togglePanel={togglePanel} />
    </div>
  );
}
