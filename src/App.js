import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting.jsx";
import Login from "./pages/login/Login.jsx";
import FindPassword from "./pages/login/FindPassword.jsx";
import LinkMenu from "./pages/link/Link";
import Header from "./pages/home/Header.jsx";
import ViewLink from "./pages/viewLinkMemo/ViewLink";
import EditLink from "./pages/editLinkMemo/EditLink";
import "./styles/App.css";
import EditProfilePage from "./pages/setting/EditProfilePage.jsx";
import Cookies from "js-cookie";

function RedirectToLogin() {
  // 로그인 안했을 때 로그인 페이지로 이동
  return <Navigate to="/login" />;
}

function App() {
  // 로그인 여부 확인
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 유저정보 불러오기
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // Check for access token
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (accessToken) {
      setIsLoggedIn(true);

      // 유저정보 불러오기
      axios
        .get("http://localhost:8123/users/userInfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
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

  return (
    <div style={{ margin: "3vh 5vw" }}>
      <Router>
        <div style={{ margin: "0 5vw" }}>
          {isLoggedIn && <Header isLoggedIn={isLoggedIn} />}
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Home />} /> {/* 메인페이지 */}
                <Route
                  path="/setting"
                  element={
                    <Setting
                      onLogout={() => {
                        setIsLoggedIn(false);
                        setUserInfo({});
                      }}
                      userInfo={userInfo}
                    />
                  }
                />
                <Route
                  path="/setting/editProfile"
                  element={<EditProfilePage userInfo={userInfo} />} // 유저정보 수정 페이지
                />
                <Route path="/link" element={<LinkMenu />} />
                <Route path="/viewlink" element={<ViewLink />} />
                <Route path="/editlink" element={<EditLink />} />
                <Route path="/login" element={<Navigate to="/" />} />{" "}
                {/* 로그인 페이지 못가게*/}
              </>
            ) : (
              <>
                <Route
                  path="/login"
                  element={<Login onLogin={() => setIsLoggedIn(true)} />}
                />
                <Route path="/login/findpassword" element={<FindPassword />} />
                <Route path="*" element={<RedirectToLogin />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
