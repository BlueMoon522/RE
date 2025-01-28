// App.js

import Card from "./card";
import "./test.css";

const App = () => {
  const data = [
    { title: "Abc", description: "This is the first card description." },
    { title: "Def", description: "This is the second card description." },
    { title: "Ghi", description: "This is the third card description." },
    { title: "Jkl", description: "This is the fourth card description." },
    { title: "Mno", description: "This is the fifth card description." },
    { title: "Pqr", description: "This is the sixth card description." },
  ];

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <h1 className="app-title">My Awesome App</h1>
        <div className="underline"></div>
      </header>

      {/* Cards Section */}
      <div className="cards-container">
        {data.map((item, index) => (
          <Card key={index} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
};

export default App;
