import logo from "../../logo.png";
import { Link } from "react-router-dom";

const BtnHome = () => {
  return (
    <Link
      to="/"
      className="btn-home"
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <img src={logo} width="60px" alt="이미지" />
      <text
        style={{
          color: "#6368E3",
          fontSize: "35px",
          fontWeight: "bolder",
          marginLeft: "23px",
        }}
      >
        Linkive
      </text>
    </Link>
  );
};
export default BtnHome;
