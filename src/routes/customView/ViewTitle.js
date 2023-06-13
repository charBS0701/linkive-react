import { useState } from "react";
// import "../../css/customView/ViewTitle.css";
import styled from "styled-components";
import linkLogo from "../../contents/img_github.png";

const StyledEditBorder = styled.div`
  width: 100%;
  height: 82px;
  border-radius: 5px;
  // border-color: #B3B3B3;
  border: solid #B3B3B3 1px;
  box-shadow: 5px 5px 5px #C2C2C2;
  
  display: flex;
  align-items: center;
`;

const StyledEdit = styled.input`
  width: 100%;
  // height: 82px;
  // border-radius: 5px;
  // border-color: #B3B3B3;
  text-align: middle;
  font-size: 28px;
  padding-left: 35px;
  // box-shadow: 5px 5px 5px #C2C2C2;
  font-weight: 500;
  outline: none;
  border: none;

  font-family: 'NanumSquare_acR';
  &::placeholder {
    color: #7B7B7B;
  }
`;

const StyledView = styled.div`
  width: 100%;
  height: 82px;

  display: flex;
  align_items: center;
  justify-content: space-between;

  // 세로 가운데 정렬
  line-height: 82px;

  //테두리 곡률
  border-radius: 5px;

  border: 2px solid #B3B3B3;
  font-family: 'NanumSquare_acB';
  font-size: 28px;
  padding-left: 35px;
  box-shadow: 5px 5px 5px #C2C2C2;
  font-weight: 500;
`;

const StyledViewText = styled.div`
  margin-left: 23px;
  margin-right: auto;
`;

const StyledViewImage = styled.img`
  width: 43px;
  heigth: 43px;

  //세로 가운데 정렬
  align-self: center;
  margin-left: 27px;
`;

const StyledViewMenuImage = styled.img`
  height: 42px;
  align-self: center; // 세로 가운데 정렬
  margin-left: auto;
  margin-right: 27px;
`;

const StyledViewMenuBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const StyledModal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
`;

const ViewTitle = (props) => {

    //모드
    const [mode, setMode] = useState(props.state);

    // // 모드 초기화
    // setMode(state);

    // 타이틀 내용
    const [value, setValue] = useState("제목");
    // 타이틀 링크 로고

    // // 메뉴 버튼 클릭 시 모달창
    // const [menu, setMenu] = useState(false) //스위치 역할

    const handleChange = (e) => {
      setValue(e.target.value);
    }

    let content = null;
    // edit 모드일 때와 view 모드일 때
    // edit 모드일 때
    // 글자가 수정이 가능, 메뉴 표시가 없음
    if (mode === "edit"){
      content = 
        <StyledEditBorder>
          <StyledViewImage src={linkLogo}/>
          <StyledEdit placeholder="링카이브(Linkive)" maxLength={15} onChange={handleChange}/>
        </StyledEditBorder>
        
    }
    // view 모드
    // 글자 수정 안 됨, 링크 로고 및 메뉴 버튼 생김
    else if (mode==="view"){
      content = 
          <StyledView>
              <StyledViewImage src={linkLogo}/>
              <StyledViewText>{value}</StyledViewText>
              <StyledViewMenuBtn><StyledViewMenuImage src="image/ic_menu.png"/></StyledViewMenuBtn>
          </StyledView>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default ViewTitle;