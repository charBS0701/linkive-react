import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profile from "../../contents/profile.png";
import profileLoggedIn from "../../contents/checked.png";

const BtnProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   console.log(document);
  //   const cookies = document.cookie.split("; ");
  //   const isLoggedInCookie = cookies.find((cookie) => cookie.startsWith("accessToken="));
  //   setIsLoggedIn(isLoggedInCookie ? isLoggedInCookie.split("=")[1] === "true" : false);
  // }, []);

  return (
    <Link to="/setting" className="btn-profile">
      <img src={isLoggedIn ? profileLoggedIn : profile} alt="profile" />
    </Link>
  );
};
export default BtnProfile;
