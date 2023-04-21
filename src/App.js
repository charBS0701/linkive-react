import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Link from "./pages/link/Link";
import Header from "./pages/home/Header";
import ViewLink from "./pages/viewLinkMemo/ViewLink";
import EditLink from "./pages/editLinkMemo/EditLink";
import "./styles/App.css";

function App() {
  return (
    <div style={{ margin: "3vh 5vw" }}>
      <Router>
        <Header />
        <div style={{ margin: "0 5vw" }}>
          <Routes>
            <Route path="/setting" element={<Setting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/link" element={<Link />} />
            <Route path="/viewlink" element={<ViewLink />} />
            <Route path="/editlink" element={<EditLink />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
