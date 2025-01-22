import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputFormPage from "./create";

import "./content.styles.css"; // Import the CSS file

const ContentPage = () => {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [formInitialData, setFormInitialData] = useState(null);
  const navigate = useNavigate();

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
      } catch (err) {
        console.log(err);
        setError("Failed to load content.");
      }
    };

    fetchContent();
  }, [id]);

  const handleTitleClick = (topicId) => {
    setActiveTopicId(activeTopicId === topicId ? null : topicId);
  };

  const handleAddContentClick = () => {
    setCurrentTopicId(null);
    setFormInitialData(null);
    setShowForm(true);
  };

  const handleEditContentClick = (topic) => {
    setCurrentTopicId(topic._id);
    setFormInitialData(topic);
    setShowForm(true);
  };

  const handleQuizButtonClick = (contentId) => {
    navigate(`/submit/${contentId}`);
  };

  const handleUpdateContent = async (updatedTopic) => {
    try {
      const endpoint = updatedTopic._id
        ? `http://localhost:3000/api/content/update/${updatedTopic._id}`
        : `http://localhost:3000/api/content/${id}`;

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
            return prevTopics.map((topic) =>
              topic._id === updatedTopic._id ? updatedData : topic,
            );
          } else {
            return [...prevTopics, updatedData];
          }
        });
        setShowForm(false);
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
          No contents for the topic yet!!
        </div>
      ) : (
        <div className="w-full px-6 max-w-5xl">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <div className="flex items-center justify-between">
                <h2
                  className="text-xl font-semibold mb-2 text-blue-600 cursor-pointer hover:underline"
                  onClick={() => handleTitleClick(topic._id)}
                >
                  {topic.title || "Untitled Topic"}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleQuizButtonClick(topic._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Quiz
                  </button>
                  <button
                    onClick={() => handleEditContentClick(topic)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {activeTopicId === topic._id && (
                <div className="mt-4">
                  <div className="text-lg">{topic.content}</div>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={handleAddContentClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
          >
            Add Content
          </button>
        </div>
      )}
      {showForm && (
        <InputFormPage
          currentTopicId={currentTopicId}
          initialData={formInitialData}
          onSubmit={handleUpdateContent}
        />
      )}
    </div>
  );
};

export default ContentPage;
