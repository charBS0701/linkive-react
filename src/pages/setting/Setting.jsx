import React, { useState, useEffect } from "react";
// import { redirect } from "react-router-dom";
import axios from "axios";
import profile from "../../contents/profile.png";
import edit from "../../contents/edit.png";
import right_arrow from "../../contents/right_arrow.png";
import { Link } from "react-router-dom";
import WithdrawModal from "./WithdrawModal";
import InquireModal from "./InquireModal";
import LogoutModal from "./LogoutModal";

// 유저정보

const Pagesheet = (props) => {
  const text = props.children;
  let firstLine = text.slice(0, 2);
  let secondLine = text.slice(2);

  if (text.length > 5) {
    firstLine = text.slice(0, 3);
    secondLine = text.slice(3);
  }

  return (
    <a
      href="/"
      style={{
        fontSize: "18px",
        width: "120px",
        height: "100px",
        textDecoration: "none",
        margin: "0 1%",
        color: "#7AABE4",
        borderRadius: "15px",
        border: "solid #7AABE4",

        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        whiteSpace: "nowrap",
      }}
    >
      <div>{firstLine}</div>
      <div>{secondLine}</div>
    </a>
  );
};
const ModalOpener = (props) => {
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [inquireModalOpen, setinquireModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // 회원탈퇴
  const handleWithdrawModalOpen = () => {
    setWithdrawModalOpen(true);
  };
  const handleWithdrawModalClose = () => {
    setWithdrawModalOpen(false);
  };
  // 문의하기
  const handleInquireModalOpen = () => {
    setinquireModalOpen(true);
  };
  const handleInquireModalClose = () => {
    setinquireModalOpen(false);
  };
  // 로그아웃
  const handleLogoutModalOpen = () => {
    setLogoutModalOpen(true);
  };
  const handleLogoutModalClose = () => {
    setLogoutModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        marginBottom: "4%",
      }}
    >
      <div
        style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}
        onClick={() => {
          if (props.children === "회원탈퇴") {
            handleWithdrawModalOpen();
          } else if (props.children === "문의하기") {
            handleInquireModalOpen();
          } else if (props.children === "로그아웃") {
            handleLogoutModalOpen();
          }
        }}
      >
        {props.children}
      </div>
      <img src={right_arrow} alt="right_arrow" />
      <WithdrawModal
        isOpen={withdrawModalOpen}
        onClose={handleWithdrawModalClose}
        onLogout={props.onLogout}
      />
      <InquireModal
        isOpen={inquireModalOpen}
        onClose={handleInquireModalClose}
      />
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={handleLogoutModalClose}
        onLogout={props.onLogout}
      />
    </div>
  );
};

const Setting = (props) => {
  // props로 userInfo 있는데 여기서 또 받아오네. 페이지시트 받아오고 손 보자
  const [userInfo, setUserInfo] = useState({});
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8123/users/userInfo", {
        withCredentials: true,
      })
      .then((response) => {
        setUserInfo(response.data.userInfo);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 302) {
          setIsRedirect(true);
        }
      });
  }, [isRedirect]);

  if (isRedirect) {
    window.location.replace("/login"); // 로그인 안되어있으면 로그인 페이지로 이동 // react로 수정 필요
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "3% 25%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={userInfo.profile_img_url}
          width="80px"
          height="80px"
          alt="profileImg"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "30px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              marginBottom: "3px",
              fontWeight: "bold",
            }}
          >
            닉네임
          </span>
          <span style={{ opacity: "50%" }}>@{userInfo.nickname}</span>
        </div>
        <Link to="/setting/editProfile" style={{ marginLeft: "auto" }}>
          <img src={edit} width="30px" height="30px" alt="edit" />
        </Link>
      </div>

      <div
        style={{
          padding: "5% 10%",
          margin: "4% -10%",
          borderTop: "#CDCDCD solid 3px",
          borderBottom: "#CDCDCD solid 3px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "white",
            backgroundColor: "#6368E3",
            borderRadius: "30px",
            padding: "7px 20px",
          }}
        >
          Page Sheet
        </span>
        <div
          style={{
            margin: "3% 3%",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flexStart",
                marginBottom: "3%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <span style={{ width: "100px", textAlign: "center" }}>
                  기본
                </span>
              </div>
              <Pagesheet>여행</Pagesheet>
              <Pagesheet>공부</Pagesheet>
              <Pagesheet>개발</Pagesheet>
              <Pagesheet>일기</Pagesheet>
              <Pagesheet>체크리스트</Pagesheet>
            </div>
            <div style={{ display: "inline-flex" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <span style={{ width: "100px", textAlign: "center" }}>
                  커스텀
                </span>
              </div>
              <Pagesheet>여행</Pagesheet>
              <Pagesheet>공부</Pagesheet>
              <Pagesheet>체크리스트</Pagesheet>
              <Pagesheet>+</Pagesheet>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "white",
            alignContent: "center",
            backgroundColor: "#6368E3",
            borderRadius: "30px",
            padding: "8px 20px",
            marginTop: "2%",
            marginBottom: "7%",
          }}
        >
          고객지원
        </span>
        <ModalOpener>문의하기</ModalOpener>
        <ModalOpener>로그아웃</ModalOpener>
        <ModalOpener>회원탈퇴</ModalOpener>
      </div>
    </div>
  );
};

export default Setting;
