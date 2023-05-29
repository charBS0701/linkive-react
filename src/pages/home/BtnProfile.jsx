import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profile from "../../contents/profile.png";
import axios from "axios";

const BtnProfile = ({ isLoggedIn }) => {
  const [profileImg, setProfileImg] = useState(profile);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            "http://localhost:8123/users/profileImg",
            {
              withCredentials: true,
            }
          );
          console.log(response);
          // 로그인 시 프로필 사진 변경
          if (response.data.profileImg !== null) {
            setProfileImg(response.data.profileImg);
          }
        } catch (error) {
          console.error(error);
          setProfileImg(profile);
        }
      }
    };

    fetchProfileImage();
  }, [isLoggedIn]);

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
      <img
        src={profileImg}
        width="50vw"
        alt="profile"
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          width: "50px",
          height: "50px",
        }}
      />
    </Link>
  );
};

export default BtnProfile;
