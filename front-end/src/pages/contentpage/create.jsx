import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "../../components/editor.jsx";
import "./content.styles.css"; // Import the CSS file
import PropTypes from "prop-types";

const InputFormPage = ({ initialData, onSubmit, onClose }) => {
  const [title, setTitle] = useState(initialData?.title || ""); // Prefill for updates
  const [description, setDescription] = useState(
    initialData?.description || "",
  ); // Prefill for updates
  const [questions, setQuestions] = useState(
    initialData?.questions || [{ question: "", answer: "", tips: "" }],
  );

  // Differentiate between "Create" and "Edit" mode
  const isEditMode = Boolean(initialData && initialData._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      _id: initialData?._id || "", // Use existing topic ID if editing
      title,
      description,
      questions,
    };

    onSubmit(form); // Call the parent onSubmit handler with the form data
    onClose(); // Close the form
  };

  // Function to remove a question
  const handleRemoveQuestion = (index) => {
    setQuestions((qs) => qs.filter((_, i) => i !== index));
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <h1 className="form-title">
          {isEditMode ? "Edit Content" : "Add Content"}
        </h1>
        <form onSubmit={handleSubmit} className="form-content">
          {/* Title */}
          <div>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Enter title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <Editor
              setDescription={setDescription}
              initialValue={description}
            />
          </div>

          {/* Questions */}
          <div>
            <h2 className="form-subtitle">Questions, Answers, and Hints</h2>
            {questions.map((entry, index) => (
              <div key={index} className="question-container">
                <div>
                  <label htmlFor={`question-${index}`} className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    id={`question-${index}`}
                    value={entry.question}
                    onChange={(e) =>
                      setQuestions((qs) =>
                        qs.map((q, i) =>
                          i === index ? { ...q, question: e.target.value } : q,
                        ),
                      )
                    }
                    className="form-input"
                    placeholder="Enter question"
                  />
                </div>
                {/* Answer */}
                <div>
                  <label htmlFor={`answer-${index}`} className="form-label">
                    Answer
                  </label>
                  <input
                    type="text"
                    id={`answer-${index}`}
                    value={entry.answer}
                    onChange={(e) =>
                      setQuestions((qs) =>
                        qs.map((q, i) =>
                          i === index ? { ...q, answer: e.target.value } : q,
                        ),
                      )
                    }
                    className="form-input"
                    placeholder="Enter answer"
                  />
                </div>
                {/* Tips */}
                <div>
                  <label htmlFor={`tips-${index}`} className="form-label">
                    Tips/Hints
                  </label>
                  <input
                    type="text"
                    id={`tips-${index}`}
                    value={entry.tips}
                    onChange={(e) =>
                      setQuestions((qs) =>
                        qs.map((q, i) =>
                          i === index ? { ...q, tips: e.target.value } : q,
                        ),
                      )
                    }
                    className="form-input"
                    placeholder="Enter tip for the answer"
                  />
                </div>

                {/* Remove Question Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="remove-question-btn"
                >
                  Remove Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setQuestions([
                  ...questions,
                  { question: "", answer: "", tips: "" },
                ])
              }
              className="add-question-btn"
            >
              + Add Question
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
InputFormPage.propTypes = {
  initialData: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
        tips: PropTypes.string,
      }),
    ),
  }),
  onSubmit: PropTypes.func.isRequired, // Function to handle form submission
  onClose: PropTypes.func.isRequired, // Function to close the form
};
export default InputFormPage;
