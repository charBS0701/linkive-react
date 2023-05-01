import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
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
const LogoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const logout = () => {
    axios
      .post("http://localhost:8123/users/logout")
      .then((response) => {
        // 요청 성공시 로직
        console.log(response);
        onClose();
      })
      .catch((error) => {
        // 요청 실패에 대한 처리
        console.log(error);
      });
  };

  return (
    <ModalContainer>
      <ModalBox>
        <ModalTitle>로그아웃 하시겠습니까?</ModalTitle>
        <Btn onClick={onClose}>취소</Btn>
        <Btn $colored onClick={logout}>
          확인
        </Btn>
      </ModalBox>
    </ModalContainer>
  );
};
export default LogoutModal;
