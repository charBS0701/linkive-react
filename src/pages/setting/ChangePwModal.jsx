import React, { useState } from "react";
import {
  ModalContainer,
  ModalBox,
  ModalTitle,
  ContentBox,
  ModalContent,
} from "./InquireModal";
import axios from "axios";
import Btn from "../../components/Btn";
import InputLine from "../../components/InputLine";
import showPwIcon from "../../contents/showPwIcon.png";
import checkImg from "../../contents/check_img.png";
import IncorrectImg from "../../contents/incorrect_img.svg";
import styled from "styled-components";
import Cookies from "js-cookie";
import validPwFormat from "../../utils/validPwFormat";

const CheckImg = styled.img`
  width: 27px;
  height: 27px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const InputLineContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InformValidFormat = styled.div`
  font-size: 12px;
  color: #ff0000;
  margin-bottom: 5px;
  margin-left: 10px;
`;

const ChangePwModal = ({ isOpen, close, onOk, userInfo }) => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  const [currentPw, setCurrentPw] = useState("");
  const [isCurrentPwCorrect, setIsCurrentPwCorrect] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [isValidPw, setIsValidPw] = useState(false);

  const handleOkClick = () => {
    if (!isCurrentPwCorrect) {
      alert("현재 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isValidFormat) {
      alert("비밀번호는 8~16자리의 영문, 숫자, 특수문자 조합이어야 합니다.");
      return;
    }
    if (!isValidPw) {
      alert("변경할 비밀번호가 일치하지 않습니다.");
      return;
    }

    // Call the onOk callback function and pass the newPw value
    onOk(newPw);
    close();
  };

  const handleCurrentPwChange = async (e) => {
    const currentPw = e.target.value; // 유저가 입력한 현재 비밀번호
    setCurrentPw(currentPw);

    // DB에 비밀번호 비교 요청
    try {
      const response = await axios.post(
        "http://localhost:8123/users/checkCurrentPw",
        {
          currentPassword: currentPw,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      if (response.status === 200) {
        // 비밀번호가 일치하면
        setIsCurrentPwCorrect(true);
      }
    } catch (error) {
      setIsCurrentPwCorrect(false);
      console.log(error);
    }
  };

  const handleNewPw = (e) => {
    const newPw = e.target.value;
    // 비밀번호 유효성 검사
    setNewPw(newPw);
    setIsValidFormat(validPwFormat(newPw));
  };

  const handleNewPwCheck = (e) => {
    const newPwCheck = e.target.value;
    // 비밀번호 유효성 검사
    setNewPwCheck(newPwCheck);

    // newPw 와 같은지 확인
    if (newPw === newPwCheck) {
      // 같으면
      setIsValidPw(true);
    } else {
      // 다르면
      setIsValidPw(false);
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <ModalContainer>
      <ModalBox>
        <ModalTitle>비밀번호 변경</ModalTitle>
        <ContentBox style={{ marginBottom: "3%" }}>
          <ModalContent>
            <InputLineContainer style={{ marginBottom: "2%" }}>
              <InputLine
                type="password"
                placeholder="현재 비밀번호"
                value={currentPw}
                onChange={handleCurrentPwChange}
              />
              {isCurrentPwCorrect ? (
                <CheckImg src={checkImg} />
              ) : (
                <CheckImg src={IncorrectImg} />
              )}
            </InputLineContainer>
            {/* 비밀번호 보기 <img src={showPwIcon}/> */}

            <InformValidFormat>
              비밀번호는 8~16자리의 영문, 숫자, 특수문자 조합이어야 합니다.
            </InformValidFormat>
            <InputLineContainer>
              <InputLine
                type="password"
                placeholder="변경할 비밀번호"
                value={newPw}
                onChange={handleNewPw}
              />
              {isValidFormat ? (
                <CheckImg src={checkImg} />
              ) : (
                <CheckImg src={IncorrectImg} />
              )}
            </InputLineContainer>
            <InputLineContainer style={{ marginBottom: "5%" }}>
              <InputLine
                type="password"
                placeholder="비밀번호 확인"
                value={newPwCheck}
                onChange={handleNewPwCheck}
              />
              {isValidPw ? (
                <CheckImg src={checkImg} />
              ) : (
                <CheckImg src={IncorrectImg} />
              )}
            </InputLineContainer>
          </ModalContent>
          <Btn style={{ marginRight: "10%" }} onClick={close}>
            취소
          </Btn>
          <Btn $colored onClick={handleOkClick}>
            확인
          </Btn>
        </ContentBox>
      </ModalBox>
    </ModalContainer>
  );
};
export default ChangePwModal;
