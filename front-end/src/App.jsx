import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup.jsx";
import Submit from "./pages/submit/page";
import YourPage from "./pages/test/page";
import EditorPage from "./pages/editor/editor";
import UserPostPage from "./pages/createtitle/page";
import ContentPage from "./pages/contentpage/page";
import Public from "./pages/public/public";
import { useQuery } from "@tanstack/react-query";
import "./App.css";
import Bookmarks from "./pages/bookmarks/bookmarks.jsx";
import TopBar from "./components/common/topbar/topbar.jsx";
import Landing from "./pages/landingpage/landing.jsx";

function App() {
  const { data: authuser, isLoading } = useQuery({
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
        console.error(error);
        return null;
      }
    },
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="wrapper">
      {authuser && (
        <div className="topbar">
          <TopBar />
        </div>
      )}
      <div className="content">
        <Routes>
          <Route
            path="/home"
            element={!authuser ? <Landing /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={
              authuser !== undefined ? (
                authuser ? (
                  <Home />
                ) : (
                  <Navigate to="/home" />
                )
              ) : (
                <div className="loading">Loading...</div>
              )
            }
          />
          {/*These are just test routes so they are not protected*/}
          <Route path="/test" element={<YourPage />} />
          <Route path="/editor" element={<EditorPage />} />
          {/**/}
          <Route
            path="/public"
            element={
              authuser !== undefined ? (
                authuser ? (
                  <Public />
                ) : (
                  <Navigate to="/home" />
                )
              ) : (
                <div className="loading">Loading...</div>
              )
            }
          />
          <Route
            path="/bookmarks"
            element={
              authuser !== undefined ? (
                authuser ? (
                  <Bookmarks />
                ) : (
                  <Navigate to="/home" />
                )
              ) : (
                <div className="loading">Loading...</div>
              )
            }
          />
          <Route
            path="/content/:id"
            element={
              authuser !== undefined ? (
                authuser ? (
                  <ContentPage />
                ) : (
                  <Navigate to="/login" />
                )
              ) : (
                <div className="loading">Loading...</div>
              )
            }
          />
          <Route
            path="/title"
            element={
              authuser !== undefined ? (
                authuser ? (
                  <UserPostPage />
                ) : (
                  <Navigate to="/login" />
                )
              ) : (
                <div className="loading">Loading...</div>
              )
            }
          />
          <Route
            path="/submit/:id"
            element={
              authuser !== undefined ? (
                authuser ? (
                  <Submit />
                ) : (
                  <Navigate to="/login" />
                )
              ) : (
                <div className="loading">Loading...</div>
              )
            }
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
