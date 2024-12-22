import React, { useState } from "react";

const Submit: React.FC = () => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    alert(`Submitted text: ${text}`);
  };

  const handleBottomButtonClick = () => {
    alert("Bottom-right button clicked!");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center px-4 text-gray-800">
        This is a text
      </h1>
      <textarea
        className="w-[600px] h-[100px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder="Type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Submit
      </button>
      <button
        onClick={handleBottomButtonClick}
        className="absolute bottom-4 right-4 px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        +
      </button>
    </div>
  );
};

export default Submit;
