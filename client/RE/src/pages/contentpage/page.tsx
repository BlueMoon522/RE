import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputFormPage from "../create/page.tsx";

interface Topic {
  _id: string;
  title: string;
  description: string; // HTML description
  questions: {
    question: string;
    answer: string;
    tips: string;
    _id: string;
  }[];
}

const ContentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // This will be the main topicId from URL.
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false); // Track form visibility
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null); // Track selected topic ID

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/content/${id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.json();
        setTopics(data);
      } catch (err: any) {
        console.error(err.message);
        setError("Failed to load content.");
      }
    };

    fetchContent();
  }, [id]);

  const handleTitleClick = (topicId: string) => {
    setActiveTopicId(activeTopicId === topicId ? null : topicId); // Toggle display of the topic content
  };

  const handleAddContentClick = (topicId: string) => {
    setCurrentTopicId(topicId);
    setShowForm(true); // Show the input form for the selected topic
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Topics</h1>
      {error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : (
        <div className="w-full px-6 max-w-5xl">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              {/* Title */}
              <h2
                className="text-xl font-semibold mb-2 text-blue-600 cursor-pointer hover:underline"
                onClick={() => handleTitleClick(topic._id)}
              >
                {topic.title || "Untitled Topic"}
              </h2>

              {/* Render Description when active */}
              {activeTopicId === topic._id && (
                <div className="mt-4">
                  {/* Render HTML description safely */}
                  <div
                    className="text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{ __html: topic.description }}
                  ></div>

                  {/* Render Questions if available */}
                  {topic.questions.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">Questions</h3>
                      <ul className="list-disc pl-6">
                        {topic.questions.map((q) => (
                          <li key={q._id} className="mb-2">
                            <strong>Q:</strong> {q.question}
                            <br />
                            <strong>A:</strong> {q.answer}
                            <br />
                            <strong>Tips:</strong> {q.tips}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Content Button */}
      <button
        onClick={() => handleAddContentClick(activeTopicId!)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg text-xl hover:bg-blue-600"
        title="Add Content"
        disabled={!activeTopicId}
      >
        +
      </button>

      {/* Show Form Modal */}
      {showForm && currentTopicId && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <InputFormPage
              topicId={currentTopicId} // Ensure the correct topicId is passed
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
