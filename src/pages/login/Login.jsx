import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import InputField from "./InputField";
import logo from "../../contents/logo.png";
import { Link } from "react-router-dom";
import googleBtn from "../../contents/googleBtn.png";
import naverBtn from "../../contents/naverBtn.png";
import kakaoBtn from "../../contents/kakaoBtn.png";
import Cookies from "js-cookie";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
}`;
const LoginContainer = styled.div`
  display: flex;
  border: solid;
  border-color: #6368e3;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 5%;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginBtn = styled.button({
  width: "450px",
  backgroundColor: "#6368E3",
  color: "white",
  border: "solid",
  borderColor: "#6368E3",
  borderRadius: "25px",
  padding: "10px",
  textAlign: "center",
  fontSize: "25px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
});

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // 쿠키가 있다면 출력
  const getCookie = (name) => {
    return Cookies.get(name);
  };
  
  console.log(`쿠키는 : ${getCookie("accessToken")}`);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form input
    if (!id || !password) {
      setError("Please enter id and password");
      return;
    }

    // Perform login request using fetch or Axios
    // ...
  };

  return (
    <Layout>
      <LoginContainer>
        <img src={logo} alt="logo" />
        <LoginForm
          onSubmit={handleSubmit}
          style={{
            // border: "solid",
            marginTop: "10%",
            display: "flex",
          }}
        >
          <InputField
            placeholder="아이디"
            type="text"
            name="id"
            value={id}
            onChange={handleInputChange}
          />
          <InputField
            placeholder="비밀번호"
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <br />
          <LoginBtn type="submit">로그인</LoginBtn>
          {error && <div>{error}</div>}
        </LoginForm>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "400px",
            marginTop: "5%",
            padding: "10px",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        >
          <Link
            to="/login/findId"
            style={{ color: "black", textDecoration: "none" }}
          >
            아이디 찾기
          </Link>
          |
          <Link
            to="/login/findPassword"
            style={{ color: "black", textDecoration: "none" }}
          >
            비밀번호 찾기
          </Link>
          |
          <Link
            to="/login/SignIn"
            style={{ color: "black", textDecoration: "none" }}
          >
            회원가입
          </Link>
        </div>
        <hr style={{ width: "100%", margin: "7%" }} />

        <text
          style={{ fontSize: "20px", fontWeight: "530", marginBottom: "3%" }}
        >
          이메일 아이디로 로그인
        </text>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "300px",
          }}
        >
          <a
            className="social_login_box google"
            href="http://localhost:8123/users/auth/google"
          >
            <img src={googleBtn} alt="google_login" />
          </a>
          <a
            className="social_login_box google"
            href="http://localhost:8123/users/auth/kakao"
          >
            <img src={kakaoBtn} alt="google_login" />
          </a>
          <a
            className="social_login_box google"
            href="http://localhost:8123/users/auth/naver"
          >
            <img src={naverBtn} alt="google_login" />
          </a>
          <a href="http://localhost:8123/users/checkAuth">
            <button>checkAuth</button>
          </a>
        </div>
      </LoginContainer>
    </Layout>
  );
};

export default Login;