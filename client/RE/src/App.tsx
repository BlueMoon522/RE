import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Login from "./pages/login/page.tsx";
import Signup from "./pages/signup/page.tsx";
import InputFormPage from "./pages/create/page.tsx";
import Submit from "./pages/submit/page.tsx";
import YourPage from "./pages/test/page.tsx";
import EditorPage from "./pages/editor/editor.tsx";
import Sidebar from "./components/common/side-bar.tsx";

function App() {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<YourPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/create" element={<InputFormPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
