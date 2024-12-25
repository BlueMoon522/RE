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

const InputFormPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answer: "", tips: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<Content | any>(null);

  //to add the questions which is array of objects

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "", tips: "" }]);
  };
  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  const handleQuestionChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q,
    );
    setQuestions(updatedQuestions);
  };

  //post in in the url
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = { title, description, questions };
    try {
      const response = await fetch(
        "http://localhost:3000/api/content/6767f8b70e10133f78d34fde", //add an ${id} later
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );
      const result = await response.json();
      console.log("Data posted successfully:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Input Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            {/*This is a description section*/}
            <Editor setDescription={setDescription} />
          </div>

          {/* Dynamic Entries for Questions, Answers, and Hints */}
          <div>
            <h2 className="text-lg font-medium text-gray-700">
              Questions, Answers, and Hints
            </h2>
            {questions.map((entry, index) => (
              <div key={index} className="mt-4 space-y-4">
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
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  - Remove Entry
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              + Add Entry
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
