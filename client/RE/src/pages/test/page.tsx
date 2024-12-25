import React, { useEffect, useState } from "react";

const Test: React.FC = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tips, setTips] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answer: "", tips: "" },
  ]);

  //to add the questions which is array of objects

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "", tips: "" }]);
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

  //postin in the url
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = { title, description, questions };
    try {
      const response = await fetch(
        "http://localhost:3000/api/content/6767f8b70e10133f78d34fde",
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
  //get from the post
  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:3000/api/content/") // Replace with your GET route
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Questions:</label>
          {questions.map((q, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Answer"
                value={q.answer}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Tips/Hints"
                value={q.tips}
                onChange={(e) =>
                  handleQuestionChange(index, "tips", e.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h1>Data from API</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Test;

// {
//   "title": "This is a not a hittle title",
//     "description": "This is a another description",
//       "questions":
//   [
//     { "question": "What is JavaScript?", "answer": "A programming language.", "tips": "this a first tip" },
//   ]
// }
