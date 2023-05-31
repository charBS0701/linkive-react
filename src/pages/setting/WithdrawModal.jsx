import React, { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import InputLine from "./InputLine";
import Btn from "./Btn";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  width: 27%;
  background-color: #fff;
  padding: 1% 3% 2%;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  text-align: left;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  text-align: left; // 왼쪽 정렬
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1%;
  `;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin-top: 15px;
`;


const WithdrawModal = ({ isOpen, onClose, onLogout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;
  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8123/users/delete",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Withdraw Success");
        onClose();
        window.location.href = "/login"; // 로그인 페이지로 이동
        onLogout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalContainer>
      <ModalBox>
        <ModalTitle>회원을 탈퇴하시겠습니까?</ModalTitle>
        <div>
          탈퇴할 경우 현재 아이디는 재사용 및 복구가 불가능합니다. 탈퇴 후
          회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.
        </div>
        <br />
        <div>
          계정 탈퇴를 원하시면 아래 정보를 입력 후 탈퇴 버튼을 선택해주세요.
        </div>
        <br />
        <FormContainer onSubmit={handleWithdraw}>
            <InputLine
              type="email"
              placeholder="이메일을 입력하세요"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputLine
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonContainer>
              <Btn onClick={onClose}>취소</Btn>
              <Btn $colored type="submit">
                확인
              </Btn>
            </ButtonContainer>
        </FormContainer>
      </ModalBox>
    </ModalContainer>
  );
};

export default WithdrawModal;
