import styled from "styled-components";

const MainColorButton = styled.button`
  background-color: #6368E3;
  color: white;

  margin-right: 14px;
  border: 1px solid #6368E3;
`;

const WhiteColorButton = styled.button`
  background-color: white;
  color: #6368E3;
  
  margin-right: 14px;
  border: 1px solid #6368E3;
`

function ButtonComponent(props) {
    return (
        (props.type?.toLowerCase() === "main") ?
            <MainColorButton>
                {props.text}
            </MainColorButton> :
            <WhiteColorButton>
                {props.text}
            </WhiteColorButton>
    );
}

export default ButtonComponent;