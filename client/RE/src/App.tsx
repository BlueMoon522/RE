import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Login from "./pages/login/page.tsx";
import Signup from "./pages/signup/page.tsx";
import InputFormPage from "./pages/createsessions/page.tsx";
import Submit from "./pages/submitsection/page.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element=<Home /> />
      <Route path="/submit" element=<Submit /> />
      <Route path="/create" element=<InputFormPage /> />
      <Route path="/signup" element=<Signup /> />
      <Route path="/login" element=<Login /> />
      <Route path="/about" element=<About /> />
    </Routes>
  );
}

export default App;
