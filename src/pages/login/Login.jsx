import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import logo from '../../contents/logo.png';
import { Link } from "react-router-dom";
import googleBtn from '../../contents/googleBtn.png';
import naverBtn from '../../contents/naverBtn.png';
import kakaoBtn from '../../contents/kakaoBtn.png';



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

const LoginBtn = styled.button(
{
  width: "450px",
  backgroundColor: "#6368E3",
  color: "white",
  border: "solid",
  borderColor: "#6368E3",
  borderRadius: "25px",
  padding: "10px",
  textAlign: "center",
  fontSize: "25px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
});

/*
const GoogleButton = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // 구글 로그인 성공 시 처리할 코드 작성
  };

  const onFailure = (error) => {
    console.log(error);
    // 구글 로그인 실패 시 처리할 코드 작성
  };

  return (
    <GoogleLogin
      clientId="구글 OAuth 클라이언트 ID"
      buttonText="구글 로그인"
      onSuccess={responseGoogle}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};
*/


const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'id') {
      setId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form input
    if (!id || !password) {
      setError('Please enter id and password');
      return;
    }

    // Perform login request using fetch or Axios
    // ...
  };

  return (
    <Layout>
      <LoginContainer>
        <img src={logo} alt="logo" />
        <LoginForm onSubmit={handleSubmit}
          style={{
            // border: "solid",
            marginTop: "10%",
            display: "flex",

          }}>
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
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "400px",
            marginTop: "5%",
            padding: "10px",
            fontSize: "17px",
            fontWeight: "bold"
          }}>
            <Link to="/login/findId" style={{ color: "black", textDecoration: "none"}}>아이디 찾기</Link>| 
            <Link to="/login/findPassword"style={{color: "black", textDecoration: "none"}}>비밀번호 찾기</Link>|
            <Link to="/login/SignIn"style={{ color: "black",textDecoration: "none"}}>회원가입</Link>
          </div>
          <hr style={{width: "100%",  margin: "7%",}}/>
          
          <text style={{fontSize:"20px", fontWeight:"530", marginBottom:"3%"}}>이메일 아이디로 로그인</text>

          <div style={{display:"flex"
          , justifyContent:"space-between",
          width: "300px",
        }}>
            <img src={googleBtn} alt='google login button' style={{width: "25%",
          }} />
            <img src={kakaoBtn} alt='google login button' style={{width: "25%",
          }} />
            <img src={naverBtn} alt='google login button' style={{width: "25%",
          }} />
          </div>
      </LoginContainer>
    </Layout>
  );
};

export default Login;
