import "./section.styles.css";

import React, { useState } from "react";

const App = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleView = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${isToggled ? "hidden" : ""}`}>
        <button className="toggle-button" onClick={toggleView}>
          {isToggled ? "Show" : "Toggle"}
        </button>
        {!isToggled && (
          <>
            <p>Hi, UserName</p>
            <ul>
              <li>HomePage</li>
              <li>Another one</li>
              <li>Another one</li>
            </ul>
          </>
        )}
      </div>
      {!isToggled && (
        <div className="main-content">
          <header>
            <h1>Application Name</h1>
            <h2>Here</h2>
            <button className="new-button">New</button>
          </header>
        </div>
      )}
    </div>
  );
};

export default App;
