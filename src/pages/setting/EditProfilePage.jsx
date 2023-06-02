import checked_img from "../../contents/checked.png";
import edit_profile from "../../contents/edit_profile.png";
import edit_img from "../../contents/edit.png";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import WithdrawButton from "./WithdrawButton";
import Btn from "./Btn";
import axios from "axios";
import Cookies from "js-cookie";
import ChangePwModal from "./ChangePwModal";

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

const InfoRow = ({ label, img, value, can_edit, userInfo, handlePasswordChange}) => {
  // 변경할 정보 입력하는 모달열기
  const [changeNicknameModalOpen, setChangeNicknameModalOpen] = useState(false);
  const [changePwModalOpen, setChangePwModalOpen] = useState(false);
  const [changeIdModalOpen, setChangeIdModalOpen] = useState(false);

  // 닉네임 변경
  const openChangeNicknameModal = () => {
    setChangeNicknameModalOpen(true);
  };
  const closeChangeNicknameModal = () => {
    setChangeNicknameModalOpen(false);
  };
  // 비밀번호 변경
  const openChangePwModal = () => {
    setChangePwModalOpen(true);
  };
  const closeChangePwModal = () => {
    setChangePwModalOpen(false);
  };
  // 아이디 변경
  const openChangeIdModal = () => {
    setChangeIdModalOpen(true);
  };
  const closeChangeIdModal = () => {
    setChangeIdModalOpen(false);
  };

  const handleEditClick = () => {
    if (label === "닉네임") {
      openChangeNicknameModal();
    } else if (label === "비밀번호") {
      openChangePwModal();
    } else if (label === "아이디") {
      openChangeIdModal();
    }
  };


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
        onClick={handleEditClick}
      />
      <ChangePwModal
        isOpen={changePwModalOpen}
        close={closeChangePwModal}
        onOk={handlePasswordChange} // Pass the callback function to the ChangePwModal
        header="닉네임 변경"
        label="닉네임"
        value={value}
        userInfo={userInfo}
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

const EditButton = ({accessToken, refreshToken, newPassword}) => {
  const handleChangeUserInfo = async (event) => {
    event.preventDefault();
    
    // 정보 수정 api 호출
    // To do : 닉네임, 아이디, 프로필사진 변경
    try {
      const response = await axios.post(
        "http://localhost:8123/users/changeUserInfo",
        {
          newNickname: "dum12",
          newId: "du1r2",
          newPassword: newPassword,
          newProfileImg: "http://k.kakaocdn.net/dn/dGxpqk/btrVBQOZowS/hbRZhxNkPnfIGSikcys6V0/img_640x640.jpg"
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response);
      if (response.status===200) {
        alert("회원정보가 수정되었습니다.");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      alert("회원정보 수정에 실패했습니다.");
    }

  };
  return (
    <Btn $big $colored onClick={handleChangeUserInfo}>
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

  const [newPassword, setNewPassword] = useState(""); // State variable to hold the newPw value
  const handlePasswordChange = (newPw) => {
    setNewPassword(newPw);
  };

  useEffect(() => {
    if (userInfo && userInfo.profile_img_url) {
      setProfileImg(userInfo.profile_img_url);
    }
  }, [userInfo, userId, nickname, profileImg]);

  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  return (
    
      <Container>
        <ProfileContainer>
          <img
            src={profileImg}
            width="100px"
            height="100px"
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
          <InfoRow label="비밀번호" img={edit_img} can_edit={true} userInfo={userInfo} handlePasswordChange={handlePasswordChange}/>
          <InfoRow
            label="이메일"
            value={email}
            img={checked_img}
            can_edit={false}
          />
        </InfoRowContainer>
        <ButtonContainer>
          <WithdrawButton />
          <EditButton accessToken={accessToken} refreshToken={refreshToken} newPassword={newPassword}/>
        </ButtonContainer>
      </Container>
  );
};

export default EditProfile;
