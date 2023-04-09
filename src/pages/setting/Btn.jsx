import styled, { css } from "styled-components";

const Btn = styled.button`
  width: 170px;
  background-color: white;
  color: #6368e3;
  border: solid 2px #6368e3;
  border-radius: 25px;
  padding: 10px;
  text-align: center;
  font-size: 18px;

  ${(props) =>
    props.$colored &&
    css`
      background-color: #6368e3;
      color: white;
    `}
`;

export default Btn;
