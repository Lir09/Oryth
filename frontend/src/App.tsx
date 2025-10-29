import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Activity from "./pages/Activity";
import Apply from "./pages/Apply";
import Notion from "./pages/Notion";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/notion" element={<Notion />} />
    </Routes>
  );
}

export default App;
