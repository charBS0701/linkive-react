import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Link from "./pages/link/Link";
import Header from "./pages/home/Header";
import ViewLink from "./pages/viewLinkMemo/ViewLink";
import EditLink from "./pages/editLinkMemo/EditLink";
import "./styles/App.css";
import EditProfilePage from "./pages/setting/EditProfilePage";

function App() {
  // 로그인 여부 확인
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 유저정보 불러오기
  const [userInfo, setUserInfo] = useState({});


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
      console.log("User is logged in!");
      // 유저정보 불러오기
      axios.get("http://localhost:8123/users/userInfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "refresh-token": getCookie("refreshToken")
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        console.log(setUserInfo);
      })
      .catch((err) => {
        console.log(err);
      });

    } else {
      console.log("User is not logged in. Login required.");
    }
  }, []);

  return (
    <div style={{ margin: "3vh 5vw" }}>
      <Router>
        <div style={{ margin: "0 5vw" }}>
          {window.location.pathname !== "/login" && (
            <Header isLoggedIn={isLoggedIn} />
          )}
          {/* 여기에 조건 추가 */}
          <Routes>
            <Route path="/setting" element={<Setting isLoggedIn={isLoggedIn} userInfo={userInfo}/>} />
            <Route path="/setting/editProfile" element={<EditProfilePage />} />
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
