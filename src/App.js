import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Link from "./pages/link/Link";
import Header from "./pages/home/Header";

function App() {
  return (
    <div style={{ margin: "3% 3%" }}>
      <Router>
        <Header />
        <div style={{ margin: "0 6%" }}>
          <Routes>
            <Route path="/setting" element={<Setting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/link" element={<Link />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
