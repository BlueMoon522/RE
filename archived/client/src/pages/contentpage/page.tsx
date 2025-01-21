import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import InputFormPage from "./create.tsx";

interface Question {
  tips: string;
  question: string;
  answer: string;
  _id: string;
}

interface Topic {
  _id: string;
  title: string;
  description: string; // HTML description
  questions: Question[];
}

const ContentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null); // Tracks which topic is active
  const [showForm, setShowForm] = useState<boolean>(false); // Track form visibility
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null); // Track selected topic ID
  const [formInitialData, setFormInitialData] = useState<Topic | null>(null); // Track initial data for the form
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/content/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const data = await response.json();
        setTopics(data);
      } catch (err: unknown) {
        console.log(err);
        setError("Failed to load content.");
      }
    };

    fetchContent();
  }, [id]);

  const handleTitleClick = (topicId: string) => {
    setActiveTopicId(activeTopicId === topicId ? null : topicId); // Toggle content visibility
  };

  const handleAddContentClick = () => {
    setCurrentTopicId(null); // Set to null for new content creation
    setFormInitialData(null); // Clear initial data
    setShowForm(true); // Show the input form
  };

  const handleEditContentClick = (topic: Topic) => {
    setCurrentTopicId(topic._id); // Set the current topic ID for editing
    setFormInitialData(topic); // Pass the topic data as initial data
    setShowForm(true); // Show the input form
  };

  const handleQuizButtonClick = (contentId: string) => {
    // Navigate to the Submit page with content ID
    navigate(`/submit/${contentId}`);
  };

  const handleUpdateContent = async (updatedTopic: Topic): Promise<void> => {
    try {
      const endpoint = updatedTopic._id
        ? `http://localhost:3000/api/content/update/${updatedTopic._id}`
        : `http://localhost:3000/api/content/${id}`; // Use parent topic ID for new content

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTopic),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setTopics((prevTopics) => {
          if (updatedTopic._id) {
            // Update existing content
            return prevTopics.map((topic) =>
              topic._id === updatedTopic._id ? updatedData : topic,
            );
          } else {
            // Add new content
            return [...prevTopics, updatedData];
          }
        });
        setShowForm(false); // Close the form
      } else {
        console.error("Failed to save content:", await response.text());
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Topic Contents</h1>
      {error ? (
        <div className="text-red-500 text-lg">
          {/*add {error} instead to show error*/}
          No contents for the topic yet!!
        </div>
      ) : (
        <div className="w-full px-6 max-w-5xl">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              {/* Title, Quiz Button, and Edit Button */}
              <div className="flex items-center justify-between">
                <h2
                  className="text-xl font-semibold mb-2 text-blue-600 cursor-pointer hover:underline"
                  onClick={() => handleTitleClick(topic._id)}
                >
                  {topic.title || "Untitled Topic"}
                </h2>
                <div className="flex space-x-2">
                  {/* Quiz Button */}
                  <button
                    onClick={() => handleQuizButtonClick(topic._id)} // Use the content ID here
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Quiz
                  </button>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditContentClick(topic)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Render Description and Questions if the topic is active */}
              {activeTopicId === topic._id && (
                <div className="mt-4">
                  {/* Render HTML description safely */}
                  <div
                    className="prose text-gray-700 text-lg" //change text-lg to text-sm/text-base to change text sizes
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
        onClick={handleAddContentClick}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg text-xl hover:bg-blue-600"
        title="Add Content"
      >
        +
      </button>
      {/* Show Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <InputFormPage
              topicId={currentTopicId || id || null} // Pass current topic ID or parent ID
              initialData={formInitialData} // Pass initial data for editing
              onSubmit={handleUpdateContent}
              onClose={() => setShowForm(false)} // Close the form
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
