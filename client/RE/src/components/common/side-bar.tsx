import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        Sidebar
      </div>
      <ul className="flex-grow">
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/create">Create</Link>
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/quizzes">Quizzes</Link>
        </li>
        <li>
          <div
            className="p-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center"
            onClick={toggleDropdown}
          >
            <span>Titles</span>
            <span>{isDropdownOpen ? "▲" : "▼"}</span>
          </div>
          {isDropdownOpen && (
            <ul className="bg-gray-700">
              {[
                "Topic 1",
                "Topic 2",
                "Topic 3",
                "Topic 1",
                "Topic 2",
                "Topic 3",
                "Topic 1",
                "Topic 2",
                "Topic 3",
                "Topic 1",
                "Topic 2",
                "Topic 3",
              ].map((topic, index) => (
                <li
                  key={index}
                  className="p-4 pl-8 hover:bg-gray-600 cursor-pointer"
                >
                  <Link to={`/topic/${topic.toLowerCase().replace(" ", "-")}`}>
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
      <div className="p-4 hover:bg-gray-700 cursor-pointer border-t border-gray-700">
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
