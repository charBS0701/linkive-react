import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting.jsx";
import Login from "./pages/login/Login.jsx";
import LinkMenu from "./pages/link/Link";
import Header from "./pages/home/Header.jsx";
import ViewLink from "./pages/viewLinkMemo/ViewLink";
import EditLink from "./pages/editLinkMemo/EditLink";
import "./styles/App.css";
import EditProfilePage from "./pages/setting/EditProfilePage.jsx";

function RedirectToLogin() {
  return <Navigate to="/login" />;
}

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
    // Check for access token
    const accessToken = getCookie("accessToken");
  
    if (accessToken) {
      setIsLoggedIn(true);
      console.log(isLoggedIn);

      // 유저정보 불러오기
      axios
        .get("http://localhost:8123/users/userInfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": getCookie("refreshToken"),
          },
        })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <div style={{ margin: "3vh 5vw" }}>
      <Router>
        <div style={{ margin: "0 5vw" }}>
          <Header isLoggedIn={isLoggedIn} />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setting" element={<Setting onLogout={() => {
              setIsLoggedIn(false);
              setUserInfo({});
            }} userInfo={userInfo} />}
            />
            <Route path="/setting/editProfile" element={<EditProfilePage />} />
            <Route path="/link" element={<LinkMenu />} />
            <Route path="/viewlink" element={<ViewLink />} />
            <Route path="/editlink" element={<EditLink />} />
          </Routes>
        </div>
      </Router>
    </div>
  ) : (
    <div style={{ margin: "3vh 5vw" }}>
      <Router>
        <div style={{ margin: "0 5vw" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<RedirectToLogin />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;