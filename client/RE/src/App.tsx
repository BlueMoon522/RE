import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Edit from "./pages/edit/page.tsx";
import Login from "./pages/login/login.tsx";
import Signup from "./pages/signup/page.tsx";
import Submit from "./pages/submit/page.tsx";
import YourPage from "./pages/test/page.tsx";
import EditorPage from "./pages/editor/editor.tsx";
import Sidebar from "./components/common/side-bar.tsx";
import EditPage from "./pages/edit/page.tsx";
import UserPostPage from "./pages/createtitle/page.tsx";
import ContentPage from "./pages/contentpage/page.tsx";

function App() {
  return (
    <div className="flex h-screen">
      <div className="flex-grow overflow-y-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<YourPage />} />
          <Route path="/content/:id" element={<ContentPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/title" element={<UserPostPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/submit/:id" element={<Submit />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<Edit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
