import styled from "styled-components";
import palette from "../styles/colorPalette";

const InputLine = styled.input`
  // 글자 크기
  font-size: 1rem;
  display: block;
  width: 85%;
  padding: 10px 30px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: 2px solid ${palette.mainColor};
`;

export default InputLine;