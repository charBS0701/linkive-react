import React, { useState, useEffect, useRef } from "react";
import checked_img from "../../contents/checked.png";
import edit_profile from "../../contents/edit_profile.png";
import edit_img from "../../contents/edit.png";
import edit_black_img from "../../contents/edit_black_img.png";
import styled, { css } from "styled-components";
import WithdrawButton from "./WithdrawButton";
import Btn from "../../components/Btn";
import axios from "axios";
import Cookies from "js-cookie";
import ChangePwModal from "./ChangePwModal";
import { validIdFormat, validNickFormat } from "../../utils/validFormat";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
`;

export const ProfileContainer = styled.div`
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

const InfoRow = ({
  label,
  img,
  value,
  setValue,
  can_edit,
  userInfo,
  openChangePwModal,
}) => {
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
      <EditInput
        initialValue={value}
        setValue={setValue}
        label={label}
        can_edit={can_edit}
        img={img}
        openChangePwModal={openChangePwModal}
        userInfo={userInfo}
      />
    </div>
  );
};

export const InfoRowContainer = styled.div`
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

const EditInput = ({
  initialValue,
  setValue,
  label,
  can_edit,
  img,
  openChangePwModal,
  userInfo
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);


  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [isEditing]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleEditClick = () => {
    if (!can_edit) return;
    if (!(userInfo.socialLogin==="")) {
      alert("소셜로그인 사용자는 정보를 수정할 수 없습니다.");
      return;
    }
    if (label === "비밀번호") {
      openChangePwModal();
    } else {
      setIsEditing((prevIsEditing) => !prevIsEditing);
    }
  };

  // const handleBlur = () => {
  //   setIsEditing(false);
  // };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        ref={inputRef}
        readOnly={!isEditing}
        type="text"
        value={initialValue}
        onChange={handleInputChange}
        // onBlur={handleBlur}
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          opacity: isEditing ? "100%" : "50%",
          border: "none",
          background: "transparent",
          outline: "none",
        }}
      />
      <img
        src={isEditing ? edit_black_img : img}
        width="27px"
        height="27px"
        alt="edit"
        style={{ marginRight: "20px" }}
        onClick={handleEditClick}
      />
    </div>
  );
};

const EditButton = ({
  accessToken,
  refreshToken,
  userId,
  nickname,
  newPassword,
  profileImg
}) => {
  const handleChangeUserInfo = async (event) => {
    event.preventDefault();

    if (!validIdFormat(userId)) {
      alert("아이디는 14글자 이내의 영소문자, 숫자, '_' 만 가능합니다.");
      return;
    }

    // 정보 수정 api 호출
    // To do : 닉네임, 아이디, 프로필사진 변경
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "refresh-token": refreshToken,
    };
    let body = {};
    if (newPassword === "") {
      body = {
        newId: userId,
        newNickname: nickname,
        newProfileImg:
        profileImg,
      };
    } else {
      body = {
        newId: userId,
        newNickname: nickname,
        newPassword: newPassword,
        newProfileImg:
        profileImg,
      };
    }

    try {
      const response = await axios.patch(
        "http://localhost:8123/users/changeUserInfo",
        body,
        {
          headers: headers,
        }
      );
      console.log(response);
      if (response.status === 200) {
        // 쿠키삭제
        Cookies.remove('accessToken', { path: '' })
        Cookies.remove('refreshToken', { path: '' })

        alert("회원정보가 수정되었습니다. 다시 로그인 해주세요.");
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

  // 비밀번호 변경 모달열기
  const [changePwModalOpen, setChangePwModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // State variable to hold the newPw value
  // 비밀번호 변경
  const openChangePwModal = () => {
    setChangePwModalOpen(true);
  };
  const closeChangePwModal = () => {
    setChangePwModalOpen(false);
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
          <EditInput
            active="disabled"
            type="text"
            placeholder={originNickname}
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </InputNicknameContainer>
      </ProfileContainer>
      <InfoRowContainer>
        <InfoRow
          label="아이디"
          value={userId}
          setValue={setUserId}
          img={edit_img}
          can_edit={true}
          userInfo={userInfo}
        />
        <InfoRow
          label="비밀번호"
          img={edit_img}
          can_edit={true}
          userInfo={userInfo}
          openChangePwModal={openChangePwModal}
        />
        <InfoRow
          label="이메일"
          value={email}
          img={checked_img}
          can_edit={false}
          userInfo={userInfo}
        />
      </InfoRowContainer>
      <ButtonContainer>
        <WithdrawButton />
        <EditButton
          accessToken={accessToken}
          refreshToken={refreshToken}
          userId={userId}
          nickname={nickname}
          newPassword={newPassword}
          profileImg={profileImg}
        />
      </ButtonContainer>
      <ChangePwModal
        isOpen={changePwModalOpen}
        close={closeChangePwModal}
        onOk={setNewPassword}
      />
    </Container>
  );
};

export default EditProfile;
