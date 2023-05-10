import React, { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";

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
  width: 30%;
  background-color: #fff;
  padding: 0.5% 3% 2%;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  text-align: left;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  text-align: left; // 왼쪽 정렬
`;

const ModalInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
`;

const ModalButton = styled.button`
  background-color: white;
  color: #6368e3;
  border: solid 2px #6368e3;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px; // 취소 버튼과 확인 버튼 사이 간격

  ${(props) =>
    props.$colored &&
    css`
      background-color: #6368e3;
      color: white;
    `}
`;

const WithdrawModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;
  const handleWithdraw = async (e) => {
    e.preventDefault();
    const accessToken = Cookies.get("accessToken");
    const requestToken = Cookies.get("requestToken");
    try {
      const response = await axios.delete(
        "http://localhost:8123/users/deleteUser",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": requestToken,
          },
          data: {
            email,
            password,
          },
        }
      );
      if (response.status === 200) {
        console.log("Withdraw Success");
        onClose();
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
        <form onSubmit={handleWithdraw}>
          <ModalInput
            type="email"
            placeholder="이메일을 입력하세요"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ModalInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonContainer>
            <ModalButton onClick={onClose}>취소</ModalButton>
            <ModalButton $colored type="submit">
              확인
            </ModalButton>
          </ButtonContainer>
        </form>
      </ModalBox>
    </ModalContainer>
  );
};

export default WithdrawModal;
