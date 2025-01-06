import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/login.tsx";
import Signup from "./pages/signup/page.tsx";
import Submit from "./pages/submit/page.tsx";
import YourPage from "./pages/test/page.tsx";
import EditorPage from "./pages/editor/editor.tsx";
import Sidebar from "./components/common/side-bar.tsx";
import UserPostPage from "./pages/createtitle/page.tsx";
import ContentPage from "./pages/contentpage/page.tsx";
import Public from "./pages/public/public.tsx";
import { useQuery } from "@tanstack/react-query";

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
    // <div className="flex h-screen">
    // <div className="w-64 bg-gray-800 text-white overflow-y-auto">
    <div className="flex max-w-6xl mx-auto">
      {authuser && <Sidebar />}
      <div className="flex-grow overflow-y-auto p-4">
        <Routes>
          <Route
            path="/"
            element={authuser ? <Home /> : <Navigate to="login" />}
          />
          {/*These are just test routes so not protected*/}
          <Route path="/test" element={<YourPage />} />
          <Route path="/editor" element={<EditorPage />} />
          {/**/}
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
    // </div>
  );
}

export default App;
