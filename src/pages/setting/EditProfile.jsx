import profile from "../../contents/profile.png";
import checked from "../../contents/checked.png";
import edit_profile from "../../contents/edit_profile.png";
import styled, { css } from "styled-components";
import { useState } from "react";
import WithdrawButton from "./WithdrawButton";
import EditButton from "./EditButton";

const InputBox = ({ label, type, id, value, onChange }) => {
  return (
    <div
      style={{
        fontSize: "20px",
        display: "flex",
        width: "80%",
        borderBottom: "solid",
        borderBottomWidth: "1px",
        borderColor: "#D4D4D4",
        padding: "3% 0",
      }}
    >
      <label
        htmlFor={id}
        style={{ flex: "1", color: "#6368E3", fontWeight: "bold" }}
      >
        {label}
      </label>
      <input
        style={{ flex: "3", border: "none" }}
        placeholder={label}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const EditProfile = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form input
    if (!userId || !password) {
      setError("Please enter id and password");
      return;
    }

    // Perform login request using fetch or Axios
    // ...
    console.log(`userId: ${userId}, Password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          // border: "solid",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            //   border: "solid",
            width: "100%",
            display: "flex",
            flwxDirection: "row",
            alignItems: "center",
            marginBottom: "7%",
            padding: "0 5%",
          }}
        >
          <img src={edit_profile} width="80px" height="80px" alt="profile" />
          <div
            style={{
              border: "solid",
              // 보르더 두께줄이기
              borderColor: "#6368E3",
              borderRadius: "30px",
              width: "70%",
              margin: "5%",
              padding: "2%",
              textJustify: "center",

              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between", // 바깥에 간격있는걸로 바꾸기
            }}
          >
            <input
              type="text"
              placeholder="닉네임"
              // input박스로 변경
              style={{
                marginLeft: "5%",
                fontSize: "25px",
                fontWeight: "bold",
                opacity: "50%",
                border: "none",
              }}
            />
            <img src={checked} alt="cheched" />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            border: "solid",
            borderColor: "#6368E3",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "7%",
            padding: "5% 5%",
          }}
        >
          <InputBox
            label="아이디"
            type="text"
            id="userId"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
          <InputBox
            label="비밀번호"
            type="text"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputBox
            label="이메일"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div
          style={{
            width: "80%",
            //   border: "solid",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <WithdrawButton />
          <EditButton />
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
