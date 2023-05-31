import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profile from "../../contents/profile.png";
import profileLoggedIn from "../../contents/checked.png";

const BtnProfile = ({ isLoggedIn }) => {
  console.log(isLoggedIn);
  let profileImg = profile;

  // 로그인 시 프로필 사진 변경
  if (isLoggedIn) {
    profileImg = profileLoggedIn;
  } else {
    profileImg = profile;
  }

    return (
    <Link
      to="/setting"
      className="btn-profile"
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <img src={profileImg} width="50vw" alt="profile" />
    </Link>
  );
};
export default BtnProfile;
