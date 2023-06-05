import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import InputField from "./InputField";
import logo from "../../contents/logo.png";
import { Link } from "react-router-dom";
import googleBtn from "../../contents/googleBtn.png";
import naverBtn from "../../contents/naverBtn.png";
import kakaoBtn from "../../contents/kakaoBtn.png";
// import { useNavigate } from "react-router-dom";

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
  padding: 4% 3% 3%;
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

const Login = ({onLogin}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form input
    if (!id || !password) {
      setError("Please enter id and password");
      return;
    }

    // Perform login request using Axios
    axios
      .post(`${process.env.REACT_APP_SERVER}/users/login`, { id, password },{ withCredentials: true })
      .then((res) => {  
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if (res.status === 200) {
          if (res.data.accessToken) {
            // 쿠키에 토큰 저장 // 서버에서 처리했음
            // Cookies.set("accessToken", res.data.accessToken);
            // Cookies.set("refreshToken", res.data.refreshToken);
          }
          // 메인페이지로 이동
          console.log("로그인 성공");
          onLogin();
          // navigate("/");
          window.location.href = "/";

        }
      })
      // .catch((error) => {
      //   if (error.response.status?.value === 401) {
      //     alert("아이디 또는 비밀번호가 틀렸습니다.");
      //   }
      //   console.log(error);
      // });
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
        <hr style={{ width: "75%", margin: "7%" }} />

        <span
          style={{ fontSize: "20px", fontWeight: "530", marginBottom: "3%" }}
        >
          이메일 아이디로 로그인
        </span>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "300px",
          }}
        >
          <a href={`${process.env.REACT_APP_SERVER}/users/auth/google`}>
            <img src={googleBtn} alt="google_login" />
          </a>
          <a href={`${process.env.REACT_APP_SERVER}/users/auth/kakao`}>
            <img src={kakaoBtn} alt="kakao_login" />
          </a>
          <a href={`${process.env.REACT_APP_SERVER}/users/auth/naver`}>
            <img src={naverBtn} alt="naver_login" />
          </a>
        </div>
      </LoginContainer>
    </Layout>
  );
};

export default Login;
