import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import { default as LinkPage} from "./pages/link/Link"; // Prevent name collision
import Header from "./pages/home/Header";
import ViewLink from "./pages/viewLinkMemo/ViewLink";
import EditLink from "./pages/editLinkMemo/EditLink";
import "./styles/App.css";
import EditProfilePage from "./pages/setting/EditProfilePage";

import { initState, reducer } from "./store/CustomDialogStore";
import React, {createContext, useReducer} from "react";
import CustomDialog from "./components/CustomDialog";

export const DialogDispatch = createContext(initState);

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div style={{ margin: "3vh 5vw" }}>
      <Router>
        <DialogDispatch.Provider value={{state, dispatch}}>
          <div style={{ margin: "0 5vw" }}>
            {window.location.pathname !== "/login" && <Header />}{" "}
            {/* 여기에 조건 추가 */}
            <Routes>
              <Route path="/setting" element={<Setting />} />
              <Route path="/setting/editProfile" element={<EditProfilePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/link/*" element={<LinkPage />} />
              <Route path="/link" element={<Link />} />
              <Route path="/viewlink" element={<ViewLink />} />
              <Route path="/editlink" element={<EditLink />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <CustomDialog />
        </DialogDispatch.Provider>
      </Router>
    </div>
  );
}

export default App;
