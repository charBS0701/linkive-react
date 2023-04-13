import styled from "styled-components";
import logo from "../../logo.png";
import { Link } from "react-router-dom";

const Linkive = styled.p`
  color: #6368E3;
  font-size: 35px;
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
      <img src={logo} width="60px" alt="이미지" />
      <Linkive>
        Linkive
      </Linkive>
    </Link>
  );
};
export default BtnHome;
