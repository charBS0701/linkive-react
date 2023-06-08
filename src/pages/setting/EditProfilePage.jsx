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
  border-radius: 40px;
  width: 60%;
  margin: 5%;
  padding: 1% 3%;
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
  name,
}) => {
  return (
    <div
      style={{
        fontSize: "20px",
        display: "flex",
        width: name === undefined ? "80%" : "100%",
        borderBottom: name === undefined ? "solid" : "none",
        borderBottomWidth: "1px",
        borderColor: "#D4D4D4",
        padding: "3% 0",
      }}
    >
      {/* name이 있으면(nickname수정) */}
      {name !== undefined ? null : (
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
      )}
      <EditInput
        initialValue={value}
        setValue={setValue}
        label={label}
        can_edit={can_edit}
        img={img}
        openChangePwModal={openChangePwModal}
        userInfo={userInfo}
        name={name}
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
  userInfo,
  name,
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
    if (!(userInfo.socialLogin === null)) {
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
    <div
      style={{
        display: "flex",
        // name 이 있으면 양 끝으로 정렬
        justifyContent: "space-between",
        width: name === undefined ? "80%" : "100%",
        paddingLeft: name === undefined ? "0px" : "3%",
      }}
    >
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
        onMouseOver={(e) => (e.currentTarget.style.opacity = "50%")}
        onMouseOut={(e) => (e.currentTarget.style.opacity = "100%")}
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
  img,
}) => {
  const handleChangeUserInfo = async (event) => {
    event.preventDefault();
    if (!validNickFormat(nickname)) {
      alert("닉네임은 10글자 이내의 한글, 영문, 숫자만 가능합니다.");
      return;
    }
    if (!validIdFormat(userId)) {
      alert("아이디는 14글자 이내의 영소문자, 숫자, '_' 만 가능합니다.");
      return;
    }

    // 서버에 이미지 업로드
    const formData = new FormData();
    let newImgPath = "http://linkive.site/";
    formData.append("img", img);
    console.log(img);
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
        "refresh-token": refreshToken,
      },
    };
    try {
      const response = await axios.post(
        `/api/images/upload`,
        formData,
        options
      );
      newImgPath = newImgPath + response.data.file_info.path;
    } catch (err) {
      console.log("파일업로드 에러");
      console.log(err);
    }

    // 정보 수정 api 호출
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "refresh-token": refreshToken,
    };
    let body = {};
    if (newPassword === "") {
      body = {
        newId: userId,
        newNickname: nickname,
        newProfileImg: newImgPath,
      };
    } else {
      body = {
        newId: userId,
        newNickname: nickname,
        newPassword: newPassword,
        newProfileImg: newImgPath,
      };
    }

    try {
      const response = await axios.patch(`/api/users/changeUserInfo`, body, {
        headers: headers,
      });
      if (response.status === 200) {
        // 쿠키삭제
        Cookies.remove("accessToken", { path: "" });
        Cookies.remove("refreshToken", { path: "" });
        // 백엔드에서도 로그아웃 처리
        axios.delete(`/api/users/logout`, {
          withCredentials: true,
        });
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
  const fileInputRef = useRef(null);
  const [img, setImg] = useState(null);
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

  // 변경할 이미지 입력
  const handleUpload = (event) => {
    setImg(event.target.files[0]);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // useEffect(() => {}, [userInfo, userId, nickname, profileImg]);

  // 이미지 미리보기(업로드 전)
  useEffect(() => {
    if (img) {
      console.log(img);
      // 이미지 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
    }
  }, [img]);

  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  return (
    <Container>
      <ProfileContainer>
        <input
          type="file"
          name="img"
          ref={fileInputRef}
          onChange={handleUpload}
          style={{ display: "none" }}
        />
        <img
          onClick={handleClick}
          onChange={(e) => setProfileImg(e.target.value)}
          src={profileImg}
          // 마우스 올라가면 투명도 50%로
          onMouseOver={(e) => (e.currentTarget.style.opacity = "50%")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "100%")}
          width="100px"
          height="100px"
          alt="profile"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <InputNicknameContainer>
          <InfoRow
            value={nickname}
            setValue={setNickname}
            img={edit_img}
            can_edit={true}
            userInfo={userInfo}
            name="nickname"
          />
          {/* <EditInput
              active="disabled"
              type="text"
              placeholder={originNickname}
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            /> */}
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
          img={img}
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
