import React, { useState, useEffect } from "react";
import styled from "styled-components";
import palette from "../../styles/colorPalette";
import Btn from "../../components/Btn";
import {
  validIdFormat,
  validNickFormat,
  validPwFormat,
  validEmailFormat,
} from "../../utils/validFormat";
import axios from "axios";

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  border: solid;
  border-color: ${palette.mainColor};
  border-radius: 10px;
  width: 40%;
  flex-direction: column;
  align-items: flex-start;
`;

const SigninBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 80%;
  padding: 1% 10%;
`;

const InputName = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1%;
  padding-left: 0.5%;
`;

const InputLine = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1px solid;
  padding: 0 10px;
  margin-bottom: 1%;
  font-size: 20px;
  box-sizing: border-box;
  outline: none;
`;

const HiddenMsg = ({
  isInvalidNick,
  isInvalid,
  isDuplicatedId,
  isPwValid,
  isPwSame,
  isValidEmail,
  isDuplicatedEmail,
  label,
}) => {
  if (label === "id") {
    if (isInvalid === true) {
      return <WarningMsg>14글자 이내 영소문자, 숫자, '_' 조합</WarningMsg>;
    } else if (isDuplicatedId === true) {
      return <WarningMsg>이미 사용중인 아이디입니다.</WarningMsg>;
    } else {
      return <OkMsg>사용 가능한 아이디입니다.</OkMsg>;
    }
  } else if (label === "nickname") {
    if (isInvalidNick === true) {
      return <WarningMsg>10글자 이내 한글, 영문, 숫자 조합</WarningMsg>;
    } else {
      return <OkMsg>사용 가능한 닉네임입니다.</OkMsg>;
    }
  } else if (label === "password") {
    if (isPwValid === false) {
      return <WarningMsg>8자 이상 영문, 숫자, 특수문자 조합</WarningMsg>;
    } else {
      return <OkMsg>사용 가능한 비밀번호입니다.</OkMsg>;
    }
  } else if (label === "passwordCheck") {
    if (isPwSame === false) {
      return <WarningMsg>비밀번호가 일치하지 않습니다.</WarningMsg>;
    } else {
      return <OkMsg>비밀번호가 일치합니다.</OkMsg>;
    }
  } else if (label === "email") {
    if (isValidEmail === false) {
      return <WarningMsg>이메일 형식이 올바르지 않습니다.</WarningMsg>;
    } else if (isDuplicatedEmail === true) {
      return <WarningMsg>이미 사용중인 이메일입니다.</WarningMsg>;
    } else {
      return <OkMsg>사용 가능한 이메일입니다.</OkMsg>;
    }
  }
};

const WarningMsg = styled.div`
  color: red;
  font-size: 15px;
  margin-bottom: 5%;
  padding-left: 3%;
  // visibility: hidden;
`;

const OkMsg = styled.div`
  color: blue;
  font-size: 15px;
  margin-bottom: 5%;
  padding-left: 3%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin-top: 1%;
  font-size: 17px;
  margin-left: -15%;
  width: 20%;
`;

const Signin = () => {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const [isInvalid, setIsinvalid] = useState(true);
  const [isDuplicatedId, setIsDuplicatedId] = useState(false);
  const [isInvalidNick, setIsInvalidNick] = useState(true);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPwSame, setIsPwSame] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isDuplicatedEmail, setIsDuplicatedEmail] = useState(false);

  useEffect(() => {
    // id 형식 체크
    if (validIdFormat(id) === true) {
      setIsinvalid(false);
    } else {
      setIsinvalid(true);
    }

    // id 중복 체크
    axios
      .post("/api/users/checkNewId", { newId: id })
      .then((res) => {
        if (res.status === 200) {
          setIsDuplicatedId(false);
        } else {
          setIsDuplicatedId(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    // nickname 형식 체크
    if (validNickFormat(nickname) === true) {
      setIsInvalidNick(false);
    } else {
      setIsInvalidNick(true);
    }
  }, [nickname]);

  useEffect(() => {
    // password 형식 체크
    if (validPwFormat(password) === true) {
      setIsPwValid(true);
    } else {
      setIsPwValid(false);
    }
  }, [password]);

  useEffect(() => {
    // password 일치 체크
    if (password === passwordCheck) {
      setIsPwSame(true);
    } else {
      setIsPwSame(false);
    }
  }, [password, passwordCheck]);

  useEffect(() => {
    // email 형식 체크
    if (validEmailFormat(email) === true) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }

    // email 중복 체크
    axios
      .post("/api/users/checkIsEmail", { email: email })
      .then((res) => {
        if (res.status === 401) {
          setIsDuplicatedEmail(false);
        } else {
          setIsDuplicatedEmail(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  const submitSignin = (e) => {
    e.preventDefault();
    console.log(
      `id: ${id} nickname: ${nickname} password: ${password} email: ${email} agree: ${agree}`
    );
    if (!agree) {
      alert("약관에 동의해주세요.");
    }
    if (isInvalid) {
      alert("아이디 형식을 확인해주세요.");
    } else if (isDuplicatedId) {
      alert("이미 사용중인 아이디입니다.");
    } else if (isInvalidNick) {
      alert("닉네임 형식을 확인해주세요.");
    }
    if (!isPwValid) {
      alert("비밀번호 형식을 확인해주세요.");
    }
    if (!isPwSame) {
      alert("비밀번호가 일치하지 않습니다.");
    }
    if (!isValidEmail) {
      alert("이메일 형식을 확인해주세요.");
    }
    if (!isDuplicatedEmail) {
      alert("이미 사용중인 이메일입니다.");
    }
    if (
      agree &&
      !isInvalid &&
      !isDuplicatedId &&
      !isInvalidNick &&
      isPwValid &&
      isPwSame &&
      isValidEmail &&
      !isDuplicatedEmail
    ) {
      axios
        .post("/api/users/signup", {
          id: id,
          nickname: nickname,
          password: password,
          email: email,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("회원가입이 완료되었습니다.");
            window.location.href = "/login";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleNickChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePwChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePwCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAgreeChange = (e) => {
    setAgree(e.target.checked);
  };

  return (
    <Layout>
      <Container style={{ padding: "3%" }}>
        <SigninBox>
          <InputName>아이디</InputName>
          <InputLine onChange={handleIdChange} />
          <HiddenMsg
            isInvalid={isInvalid}
            isDuplicatedId={isDuplicatedId}
            label="id"
          />

          <InputName label="nickname">닉네임</InputName>
          <InputLine onChange={handleNickChange} />
          <HiddenMsg isInvalidNick={isInvalidNick} label="nickname" />

          <InputName>비밀번호</InputName>
          <InputLine onChange={handlePwChange} type="password" />
          <HiddenMsg isPwValid={isPwValid} label="password" />

          <InputName>비밀번호 확인</InputName>
          <InputLine onChange={handlePwCheckChange} type="password" />
          <HiddenMsg
            isPwValid={isPwValid}
            isPwSame={isPwSame}
            label="passwordCheck"
          />

          <InputName>이메일</InputName>
          <InputLine onChange={handleEmailChange} />
          <HiddenMsg
            isValidEmail={isValidEmail}
            isDuplicatedEmail={isDuplicatedEmail}
            label="email"
          />
        </SigninBox>
      </Container>
      <CheckboxContainer>
        <input
          type="checkbox"
          id="agree"
          name="agree"
          value="agree"
          onClick={handleAgreeChange}
        />
        <label
          style={{ marginLeft: "4%", textDecoration: "underline" }}
          htmlFor="agree"
        >
          개인정보 제공에 동의합니다.
        </label>
      </CheckboxContainer>
      <Btn
        onClick={submitSignin}
        $colored
        style={{ marginLeft: "37%", marginTop: "1%", width: "10%" }}
      >
        회원가입
      </Btn>
    </Layout>
  );
};

export default Signin;
