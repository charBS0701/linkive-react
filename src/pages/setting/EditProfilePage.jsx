import profile from "../../contents/profile.png";
import checked from "../../contents/checked.png";
import edit_profile from "../../contents/edit_profile.png";
import styled, { css } from "styled-components";
import { useState } from "react";
import WithdrawButton from "./WithdrawButton";
import Btn from "./Btn";
import axios from "axios";
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 7%;
  padding: 0 5%;
`;

const InputNicknameContainer = styled.div`
  border: solid;
  border-color: #6368e3;
  border-radius: 30px;
  width: 70%;
  margin: 5%;
  padding: 2%;
  text-justify: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

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

const InputBoxContainer = styled.div`
  width: 100%;
  border: solid;
  border-color: #6368e3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 7%;
  padding: 5% 5%;
`;

const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const EditButton = () => {
  const handleClick = (event) => {
    event.preventDefault();
    event.target.closest("form").submit();
  };
  return (
    <Btn $colored onClick={handleClick}>
      수정하기
    </Btn>
  );
};

const EditProfile = () => {
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = Cookies.get("accessToken");
    const requestToken = Cookies.get("requestToken");

    // Validate form input
    if (!userId || !password) {
      setError("Please enter id and password");
      return;
    }

    // Perform login request using fetch or Axios
    try {
      const response = await axios.post(
        "http://localhost:8123/users/changeUserInfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": requestToken,
          },
          data: {
            nickname,
            id: userId,
            password,
          },
        }
      );
      if (response.status === 200) {
        // 수정이 완료되었습니다 알림창 띄우기
        alert("수정이 완료되었습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <ProfileContainer>
          <img src={edit_profile} width="80px" height="80px" alt="profile" />{" "}
          {/* 프로필 사진 불러오고 누르면 수정할 수 있도록 */}
          <InputNicknameContainer>
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              style={{
                marginLeft: "5%",
                fontSize: "25px",
                fontWeight: "bold",
                opacity: "50%",
                border: "none",
              }}
            />
            <img src={checked} alt="cheched" />
          </InputNicknameContainer>
        </ProfileContainer>
        <InputBoxContainer>
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
        </InputBoxContainer>
        <ButtonContainer>
          <WithdrawButton />
          <EditButton />
        </ButtonContainer>
      </Container>
    </form>
  );
};

export default EditProfile;
