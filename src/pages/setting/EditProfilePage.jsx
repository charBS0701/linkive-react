import checked_img from "../../contents/checked.png";
import edit_profile from "../../contents/edit_profile.png";
import edit_img from "../../contents/edit.png";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
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

const InfoRow = ({ label, img, value, can_edit }) => {
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
        style={{
          flex: "1",
          color: "#6368E3",
          fontWeight: "bold",
          marginLeft: "10px",
        }}
      >
        {label}
      </label>
      <span
        style={{
          flex: "3",
          border: "none",
          color: can_edit ? "inherit" : "#999999",
          fontWeight: can_edit ? "bold" : "normal",
        }}
      >
        {value}
      </span>
      <img
        src={img}
        width="27px"
        height="27px"
        alt={can_edit}
        style={{ marginRight: "20px" }}
      />
    </div>
  );
};

const InfoRowContainer = styled.div`
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
    <Btn $big $colored onClick={handleClick}>
      수정하기
    </Btn>
  );
};

const EditProfile = ({ userInfo }) => {
  userInfo = userInfo.userInfo; // 왜 이렇게 두번으로 접근 해야할까??
  const originNickname = userInfo.nickname;
  const email = userInfo.email;
  const [userId, setUserId] = useState(userInfo.id);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [profileImg, setProfileImg] = useState(userInfo.profile_img_url);
  const [error, setError] = useState("");
  console.log(profileImg);

  useEffect(() => {
    if (userInfo && userInfo.profile_img_url) {
      setProfileImg(userInfo.profile_img_url);
    }
  }, [userInfo, userId, nickname, profileImg]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = Cookies.get("accessToken");
    const requestToken = Cookies.get("requestToken");

    // Validate form input
    if (!userId) {
      setError("Please enter id");
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
          <img
            src={profileImg}
            width="100px"
            height="px"
            alt="profile"
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />{" "}
          {/* 프로필 사진 불러오고 누르면 수정할 수 있도록 */}
          <InputNicknameContainer>
            <input
              type="text"
              placeholder={originNickname}
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
            <img src={edit_img} alt="cheched" style={{width:"25px", height:"25px", padding:"5px 20px"}}/>
          </InputNicknameContainer>
        </ProfileContainer>
        <InfoRowContainer>
          <InfoRow
            label="아이디"
            value={userId}
            img={edit_img}
            can_edit={true}
          />
          <InfoRow label="비밀번호" img={edit_img} can_edit={true} />
          <InfoRow
            label="이메일"
            value={email}
            img={checked_img}
            can_edit={false}
          />
        </InfoRowContainer>
        <ButtonContainer>
          <WithdrawButton />
          <EditButton />
        </ButtonContainer>
      </Container>
    </form>
  );
};

export default EditProfile;
