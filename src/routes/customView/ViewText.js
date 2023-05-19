// import "../../css/customView/ViewText.css";
import { useState } from "react";
import styled from "styled-components";

const StyledEdit = styled.textarea`
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    resize: none;
    overflow: hidden;
    font-family: 'NanumSquare_acR';
    &::placeholder {
        color: #9B9B9B;
    }
`;

const StyledView = styled.div`
    width: 100%;
    border: none;
    font-size: 20px;
    resize: none;
    overflow: hidden;
    font-family: 'NanumSquare_acR';
`;

const ViewText = () => {

    // textarea의 크기가 입력된 글자만큼 증감함
    const autoResizeTextarea = (e) => {
        let textarea = document.querySelector('.viewText');

        if (textarea) {
          textarea.style.height = 'auto';
          let height = textarea.scrollHeight; // 높이
          textarea.style.height = `${height}px`;
        }
    };

    //모드
    const [mode, setMode] = useState("view");

    const [value, setValue] = useState("내용입니다.");

    let content = null;
    // edit 모드일 때와 view 모드일 때
    // edit 모드
    if (mode === "edit"){
        content = 
            <StyledEdit className="viewText" placeholder="글을 입력하세요." onChange={autoResizeTextarea}/>
    }
    // view 모드
    else if (mode === "view"){
        content = 
            <StyledView>{value}</StyledView>
    }
    
    return (
        <div>
            {content}
        </div>
    )
}



export default ViewText;