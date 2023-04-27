import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Setting from "./routes/Setting";
import Login from "./routes/Login";
import ViewImage from "./routes/customView/ViewImage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/setting" element={<Setting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<ViewImage />} />
      </Routes>
    </Router>
  );
}

export default App;
