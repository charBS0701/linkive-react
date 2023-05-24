import React, { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { ModalButton } from "./WithdrawModal";
import palette from "../../styles/colorPalette";

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
  
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  text-align: center; // 가운데 정렬
  font-weight: bold;
  back
`;

const ModalTitle = styled.div`
  border-radius: 10px 10px 0 0;
  width: 100%;
  padding: 3% 0%;
  margin-bottom: 4%;
  font-size: 1.2rem;
  text-align: center;
  background-color: ${palette.mainColor};
  color: white;
`;

const ContentBox = styled.div`
  padding: 3% 10%;
`;
const DevEmail = styled.div``;

const ModalContent = styled.div`
  text-align: left;
`;

const LightText = styled.span`
  color: #999; // 연한 회색
`;

const InquireModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalBox>
        <ModalTitle>문의하기</ModalTitle>
        <ContentBox>
          <ModalContent>
            Linkive를 사용해주셔서 감사합니다. <br />
            <br />
            서비스 사용과 관련해서 문의사항 또는 불편한 점이 있다면 아래 메일로
            의견을 보내주시기 바랍니다.
            <br />
            <br />
          </ModalContent>
          <DevEmail>
            개발진 <LightText>chaqhdtjr7@gmail.com</LightText>
          </DevEmail>
          <br />
          <ModalButton onClick={onClose} $colored>
            확인
          </ModalButton>
        </ContentBox>
      </ModalBox>
    </ModalContainer>
  );
};

export default InquireModal;
