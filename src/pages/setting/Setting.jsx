import React from "react";
import profile from "../../contents/profile.png";
import edit from "../../contents/edit.png";
import right_arrow from "../../contents/right_arrow.png";
import { Link } from "react-router-dom";

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
const Inqyuiry = (props) => {
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
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        {props.children}
      </div>
      <img src={right_arrow} alt="right_arrow" />
    </div>
  );
};
const Setting = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "3% 25%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={profile} width="80px" height="80px" alt="profile" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "30px",
          }}
        >
          <text
            style={{
              fontSize: "18px",
              marginBottom: "3px",
              fontWeight: "bold",
            }}
          >
            닉네임
          </text>
          <text style={{ opacity: "50%" }}>@id1234</text>
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
        <Inqyuiry>문의하기</Inqyuiry>
        <Inqyuiry>로그아웃</Inqyuiry>
        <Inqyuiry>회원탈퇴</Inqyuiry>
      </div>
    </div>
  );
};

export default Setting;
