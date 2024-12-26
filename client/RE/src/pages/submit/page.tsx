import React, { useEffect, useState } from "react";
import RightPanel from "@/components/common/rightPanel";

const Submit: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    // Fetch the API data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/content/676bf17b7ba0eec6980edc34",
        );
        const data = await response.json();
        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleAnswer = (id: string) => {
    setShowAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex h-full">
      {!isPanelOpen ? (
        <div className="flex-grow flex flex-col items-center justify-start min-h-screen bg-cover bg-center p-4 overflow-y-auto">
          {/* Background */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 -z-10"
            style={{ backgroundImage: "url('/background2.jpg')" }}
          />

          {/* Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {questions.map((question) => (
              <div
                key={question._id}
                className="relative flex flex-col bg-white shadow-2xl rounded-xl p-6 w-full"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {question.question}
                </h3>
                <textarea
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-4 focus:ring-blue-300"
                  placeholder="Write your response here..."
                />
                <div className="mb-4 p-2 bg-gray-100 text-gray-600 rounded-md">
                  Hint: {question.tips}
                </div>
                <button
                  onClick={() => toggleAnswer(question._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {showAnswers[question._id] ? "Hide Answer" : "Show Answer"}
                </button>
                {showAnswers[question._id] && (
                  <p className="mt-4 text-gray-900 font-medium">
                    Answer: {question.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Floating Action Button */}
          <button
            onClick={togglePanel}
            className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-2xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-110 z-50"
          >
            +
          </button>
        </div>
      ) : (
        <RightPanel
          isPanelOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default Submit;
