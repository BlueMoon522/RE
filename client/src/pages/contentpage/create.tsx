import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "@/components/editor";

interface Question {
  tips: string;
  question: string;
  answer: string;
}

interface Topic {
  _id?: string;
  title: string;
  description: string;
  questions: Question[];
}

interface InputFormPageProps {
  topicId: string | null; // Null for creating new content
  initialData?: Topic | null; // Optional data for pre-filling the form when editing
  onSubmit: (updatedTopic: Topic) => Promise<void>; // Handler for submission
  onClose: () => void; // Handler for closing the form
}

const InputFormPage: React.FC<InputFormPageProps> = ({
  initialData,
  onSubmit,
  onClose,
}) => {
  const [title, setTitle] = useState(initialData?.title || ""); // Prefill for updates
  const [description, setDescription] = useState(
    initialData?.description || "",
  ); // Prefill for updates
  const [questions, setQuestions] = useState<Question[]>(
    initialData?.questions || [{ question: "", answer: "", tips: "" }],
  );

  // Differentiate between "Create" and "Edit" mode
  const isEditMode = Boolean(initialData && initialData._id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form: Topic = {
      _id: initialData?._id || "", // Use existing topic ID if editing
      title,
      description,
      questions,
    };

    onSubmit(form); // Call the parent onSubmit handler with the form data
    onClose(); // Close the form
  };

  // Function to remove a question
  const handleRemoveQuestion = (index: number) => {
    setQuestions((qs) => qs.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-3xl bg-white p-10 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
          onClick={onClose}
        >
          ✕
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isEditMode ? "Edit Content" : "Add Content"}
        </h1>
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
            <Editor
              setDescription={setDescription}
              initialValue={description}
            />
          </div>

          {/* Questions */}
          <div>
            <h2 className="text-lg font-medium text-gray-700">
              Questions, Answers, and Hints
            </h2>
            {questions.map((entry, index) => (
              <div key={index} className="mt-4 space-y-4 border p-4 rounded-lg">
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
                      setQuestions((qs) =>
                        qs.map((q, i) =>
                          i === index ? { ...q, question: e.target.value } : q,
                        ),
                      )
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
                      setQuestions((qs) =>
                        qs.map((q, i) =>
                          i === index ? { ...q, answer: e.target.value } : q,
                        ),
                      )
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
                      setQuestions((qs) =>
                        qs.map((q, i) =>
                          i === index ? { ...q, tips: e.target.value } : q,
                        ),
                      )
                    }
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Enter tip for the answer"
                  />
                </div>

                {/* Remove Question Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
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
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              + Add Question
            </button>
          </div>

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

export default InputFormPage;
