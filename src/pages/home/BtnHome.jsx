import styled from "styled-components";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import palette from "../../styles/colorPalette";

const Linkive = styled.p`
  color: ${palette.mainColor};
  font-size: 2.2rem;
  font-weight: bolder;
  margin-left: 23px;
  font-family: 'YANGJIN';
`;

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
      <img src={logo} width="60vw" alt="이미지" />
      <Linkive>
        Linkive
      </Linkive>
    </Link>
  );
};
export default BtnHome;
