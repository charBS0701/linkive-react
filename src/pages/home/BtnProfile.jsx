import profile from "../../contents/profile.png";
import { Link } from "react-router-dom";

const BtnProfile = () => {
  return (
    <Link to="/setting" className="btn-profile">
      <img src={profile} width='50vw' alt="profile" />
    </Link>
  );
};

export default BtnProfile;
