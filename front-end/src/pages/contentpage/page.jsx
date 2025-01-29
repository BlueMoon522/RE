import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputFormPage from "./create";
import "./content.styles.css"; // Updated CSS

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
    <div className="content-container">
      <h1 className="page-title">Topic Contents</h1>
      <button onClick={handleAddContentClick} className="new-button">
        New
      </button>
      {error ? (
        <div className="error-message">No contents for the topic yet!!</div>
      ) : (
        <div className="topics-container">
          {topics.map((topic) => (
            <div key={topic._id} className="topic-card">
              <div className="topic-header">
                <h2
                  className="topic-title"
                  onClick={() => handleTitleClick(topic._id)}
                >
                  {topic.title || "Untitled Topic"}
                </h2>
                <div className="button-group">
                  <button
                    onClick={() => handleEditContentClick(topic)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleQuizButtonClick(topic._id)}
                    className="quiz-button"
                  >
                    Quiz
                  </button>
                </div>
              </div>

              {activeTopicId === topic._id && (
                <div className="topic-details">
                  <p>
                    <strong>Description:</strong>
                  </p>
                  <div
                    className="topic-description"
                    dangerouslySetInnerHTML={{ __html: topic.description }}
                  />
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(topic.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(topic.updatedAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Questions:</strong>
                  </p>
                  <ul className="question-list">
                    {topic.questions.map((q, index) => (
                      <li key={q._id} className="question-item">
                        <p>
                          <strong>Question {index + 1}:</strong> {q.question}
                        </p>
                        <p>
                          <strong>Answer:</strong> {q.answer}
                        </p>
                        <p>
                          <strong>Tips:</strong> {q.tips}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <InputFormPage
          currentTopicId={currentTopicId}
          initialData={formInitialData}
          onSubmit={handleUpdateContent}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ContentPage;
