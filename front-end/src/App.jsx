import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/page";
import Submit from "./pages/submit/page";
import YourPage from "./pages/test/page";
import EditorPage from "./pages/editor/editor";
import Sidebar from "./components/common/sidebar/side-bar.jsx";
import UserPostPage from "./pages/createtitle/page";
import ContentPage from "./pages/contentpage/page";
import Public from "./pages/public/public";
import { useQuery } from "@tanstack/react-query";
import "./App.css"; // Import the CSS file

function App() {
  const { data: authuser } = useQuery({
    queryKey: ["authuser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user/auth");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authuser data", data);
        return data;
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <div className="app-container">
      {authuser && (
        <div className="sidebar-container">
          <Sidebar />
        </div>
      )}
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={authuser ? <Home /> : <Navigate to="login" />}
          />
          <Route path="/test" element={<YourPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route
            path="/public"
            element={authuser ? <Public /> : <Navigate to="/login" />}
          />
          <Route
            path="/content/:id"
            element={authuser ? <ContentPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/title"
            element={authuser ? <UserPostPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/submit/:id"
            element={authuser ? <Submit /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authuser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authuser ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
