import React from "react";
import styled from "styled-components";
import axios from "axios";
import Btn from "../../components/Btn";
import xImg from "../../contents/x.png";
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
  width: 20%;
  background-color: #fff;
  padding: 0.5% 0.5% 1% 0.5%;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  text-align: left;
`;

const XBtn = styled.button`
  float: right;
  background-color: transparent;
  border: none;
`;

const ModalTitle = styled.div`
  font-size: 1.2rem;
  text-align: center; // 왼쪽 정렬
  margin: 15% 5% 10%;
  font-weight: bold;
`;

const Content = styled.div`
  text-align: center;
  margin: 2% 5% 5%;
`;

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  
  if (!isOpen) return null;
  
  const logout = () => {
    // 프론트에서 로그아웃 처리
    // 쿠키삭제
    Cookies.remove('accessToken', { path: '' })
    Cookies.remove('refreshToken', { path: '' })

    alert("로그아웃 되었습니다.");
    window.location.reload();


    // 로그아웃 요청
    // axios
    //   .post("http://localhost:8123/users/logout", {}, { withCredentials: true })
    //   .then((response) => {
    //     // 요청 성공시 로직
    //     console.log(response);
    //     onClose();
    //     window.location.href = '/login' // 로그인 페이지로 이동
    //     onLogout();
    //   })
    //   .catch((error) => {
    //     // 요청 실패에 대한 처리
    //     console.log(error);
    //   });
  };

  return (
    <ModalContainer>
      <ModalBox>
        <XBtn onClick={onClose}>
          <img src={xImg} alt="x" />
        </XBtn>
        <Content>
          <ModalTitle>로그아웃 하시겠습니까?</ModalTitle>
          <Btn onClick={onClose}>취소</Btn>
          <Btn $colored onClick={logout}>
            확인
          </Btn>
        </Content>
      </ModalBox>
    </ModalContainer>
  );
};
export default LogoutModal;
