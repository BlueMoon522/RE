import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/page";
import Submit from "./pages/submit/page";
import YourPage from "./pages/test/page";
import EditorPage from "./pages/editor/editor";
import Sidebar from "./components/common/side-bar";
import UserPostPage from "./pages/createtitle/page";
import ContentPage from "./pages/contentpage/page";
import Public from "./pages/public/public";
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
    <div className="flex max-w-full mx-auto">
      {authuser && (
        <div
          style={{
            width: "250px", // Fixed width for the sidebar
            position: "fixed", // Sidebar stays fixed on the left
            height: "100vh", // Full height
            backgroundColor: "#f4f4f4", // Optional background color for the sidebar
          }}
          className="flex-shrink-0"
        >
          <Sidebar />
        </div>
      )}
      <div className="flex-grow overflow-y-auto p-4 ml-[250px]">
        {" "}
        {/* Adjust the left margin to accommodate the sidebar */}
        <Routes>
          <Route
            path="/"
            element={authuser ? <Home /> : <Navigate to="login" />}
          />
          {/* These are just test routes, so not protected */}
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
  );
}

export default App;
