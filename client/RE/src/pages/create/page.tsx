import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "@/components/editor";

const InputFormPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState<
    { question: string; answer: string; hint: string }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Title: ${title}\nDescription: ${description}\nEntries: ${JSON.stringify(entries)}`,
    );
  };

  const addEntry = () => {
    setEntries([...entries, { question: "", answer: "", hint: "" }]);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (
    index: number,
    field: "question" | "answer" | "hint",
    value: string,
  ) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
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
            <Editor />
          </div>

          {/* Dynamic Entries for Questions, Answers, and Hints */}
          <div>
            <h2 className="text-lg font-medium text-gray-700">
              Questions, Answers, and Hints
            </h2>
            {entries.map((entry, index) => (
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
                      updateEntry(index, "question", e.target.value)
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
                      updateEntry(index, "answer", e.target.value)
                    }
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Enter answer"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`hint-${index}`}
                    className="block text-lg font-medium text-gray-700"
                  >
                    Hint
                  </label>
                  <input
                    type="text"
                    id={`hint-${index}`}
                    value={entry.hint}
                    onChange={(e) => updateEntry(index, "hint", e.target.value)}
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Enter hint"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeEntry(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  - Remove Entry
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addEntry}
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
