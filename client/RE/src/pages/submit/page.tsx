import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the dynamic ID
import RightPanel from "@/components/common/rightPanel";

const Submit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the dynamic ID from the URL
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]); // Use an appropriate type for questions
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    // Fetch the API data based on the dynamic ID
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/content/get/${id}`, // Use the dynamic content ID
        );
        const data = await response.json();
        console.log(data);
        setQuestions(data.questions || []); // Assuming the response has a `questions` array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Re-fetch when the ID changes

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
            style={{
              backgroundImage: "url('/background2.jpg')",
              backgroundAttachment: "fixed",
            }}
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

                {/* Hint/Tips Section */}
                <p className="text-gray-600 mb-2">
                  <strong>Hint:</strong> {question.tips}
                </p>

                {/* Text Area */}
                <textarea
                  className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4"
                  placeholder="Write your notes here..."
                ></textarea>

                {/* Show Answer Button */}
                <button
                  className="mt-2 bg-blue-600 text-white p-2 rounded transition duration-300 hover:bg-purple-600"
                  onClick={() => toggleAnswer(question._id)}
                >
                  {showAnswers[question._id] ? "Hide" : "Show"} Answer
                </button>

                {/* Answer Display */}
                {showAnswers[question._id] && (
                  <p className="mt-2 text-gray-900">{question.answer}</p>
                )}
              </div>
            ))}
          </div>

          {/* Toggle panel button */}
          <button
            onClick={togglePanel}
            className="absolute bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
          >
            +
          </button>
        </div>
      ) : (
        <RightPanel
          fetchUrl={`http://localhost:3000/api/content/${id}`} // Use the dynamic content ID here as well
          isPanelOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default Submit;
