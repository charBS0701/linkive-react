import React, { useEffect, useState } from "react";
import axios from "axios";
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
import {createContext, useReducer} from "react";
import CustomDialog from "./components/CustomDialog";
import Link from './pages/link/Link'

export const DialogDispatch = createContext(initState);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // httpOnly: true 일 때 쿠키의 토큰 확인 로직
  const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
  
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  
  useEffect(() => {
    // acessToken 있는지 확인
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      // console.log("Access token found:", accessToken);
      console.log("User is logged in!");
    } else {
      // console.log("Access token not found.");
      console.log("User is not logged in. Login required.");
    }
  }, []);
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div style={{ margin: "3vh 5vw" }}>
      <Router>
        <DialogDispatch.Provider value={{state, dispatch}}>
          <div style={{ margin: "0 5vw" }}>
            {window.location.pathname !== "/login" && (
              <Header isLoggedIn={isLoggedIn} />
            )}{" "}
            {/* 여기에 조건 추가 */}
            <Routes>
              <Route path="/setting" element={<Setting />} />
              <Route path="/setting/editProfile" element={<EditProfilePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/link/*" element={<Link />} />
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
