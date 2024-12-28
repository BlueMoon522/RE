import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "@/components/editor";

interface Question {
  tips: string;
  question: string;
  answer: string;
}

interface Content {
  title: string;
  description: string;
  questions: Question[];
}

interface InputFormPageProps {
  topicId: string;
  onClose: () => void;
}
const InputFormPage: React.FC<InputFormPageProps> = ({ topicId, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", answer: "", tips: "" },
  ]);

  // Handle add/remove questions
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "", tips: "" }]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string,
  ) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q,
    );
    setQuestions(updatedQuestions);
  };

  // Submit form with the correct topicId
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = { title, description, questions };
    try {
      const response = await fetch(
        `http://localhost:3000/api/content/${topicId}`, // Correctly using topicId for the request
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (response.ok) {
        console.log("Data posted successfully:", await response.json());
        onClose(); // Close the modal on successful submission
      } else {
        console.error("Failed to post data:", await response.text());
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-10 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
          onClick={onClose}
        >
          ✕
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">Add Content</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Enter title"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <Editor setDescription={setDescription} />
          </div>

          {/* Questions Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700">
              Questions, Answers, and Hints
            </h2>
            {questions.map((entry, index) => (
              <div key={index} className="mt-4 space-y-4 border p-4 rounded-lg">
                {/* Question */}
                <div>
                  <label
                    htmlFor={`question-${index}`}
                    className="block text-lg font-medium text-gray-700"
                  >
                    Question
                  </label>
                  <input
                    type="text"
                    id={`question-${index}`}
                    value={entry.question}
                    onChange={(e) =>
                      handleQuestionChange(index, "question", e.target.value)
                    }
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Enter question"
                  />
                </div>

                {/* Answer */}
                <div>
                  <label
                    htmlFor={`answer-${index}`}
                    className="block text-lg font-medium text-gray-700"
                  >
                    Answer
                  </label>
                  <input
                    type="text"
                    id={`answer-${index}`}
                    value={entry.answer}
                    onChange={(e) =>
                      handleQuestionChange(index, "answer", e.target.value)
                    }
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Enter answer"
                  />
                </div>

                {/* Tips */}
                <div>
                  <label
                    htmlFor={`tips-${index}`}
                    className="block text-lg font-medium text-gray-700"
                  >
                    Tips/Hints
                  </label>
                  <input
                    type="text"
                    id={`tips-${index}`}
                    value={entry.tips}
                    onChange={(e) =>
                      handleQuestionChange(index, "tips", e.target.value)
                    }
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Enter tip for the answer"
                  />
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  - Remove Question
                </button>
              </div>
            ))}

            {/* Add Question Button */}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              + Add Question
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
