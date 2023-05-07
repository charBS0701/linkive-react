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

const InquireModal = ({ isOpen, onClose }) => {
  const [inquireContent, setInquireContent] = useState("");
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = Cookies.get("accessToken");
    const requestToken = Cookies.get("requestToken");

    const inquireData = e.target.inquire.value;
    try {
      const response = await axios.post(
        "http://localhost:8123/users/inquire",
        {
          inquireData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": requestToken,
          },
        }
      );
      if (response.status === 200) {
        console.log("Inquire Success");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ModalContainer>
      <ModalBox>
        <ModalTitle>
          문의하기
          <form onSubmit={handleSubmit}>
            <textarea
              name="inquire"
              placeholder="문의하실 내용을 입력해주세요"
              value={inquireContent}
              onChange={(e) => setInquireContent(e.target.value)}
            ></textarea>
            <button onClick={onClose}>취소</button>
            <input type="submit" value="보내기" />
          </form>
        </ModalTitle>
      </ModalBox>
    </ModalContainer>
  );
};

export default InquireModal;
