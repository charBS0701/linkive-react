import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Link from "./pages/link/Link";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/setting" element={<Setting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/link" element={<Link />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
