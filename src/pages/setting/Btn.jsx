import styled, { css } from "styled-components";

const Btn = styled.button`
  width: 100px;
  background-color: white;
  color: #6368e3;
  border: solid 2px #6368e3;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px; // 취소 버튼과 확인 버튼 사이 간격

  ${(props) =>
    props.$colored &&
    css`
      background-color: #6368e3;
      color: white;
    `
  }
  ${(props) =>
    props.$big &&
    css`
      width: 200px;
      height: 50px;
      font-size: 1.2rem;
    `
  }
`;

export default Btn;
