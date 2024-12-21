import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Layout from "./layout";
import Login from "./pages/login/page.tsx";
import Signup from "./pages/signup/page.tsx";

function App() {
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <Routes>
          <Route path="/" element=<Home /> />
          <Route path="/signup" element=<Signup /> />
          <Route path="/login" element=<Login /> />
          <Route path="/about" element=<About /> />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
