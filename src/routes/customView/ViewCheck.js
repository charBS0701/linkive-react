import styled from "styled-components";
// import "../../css/customView/ViewCheck.css";
import React, { useState } from "react";

const StyledBorder = styled.div`
    display: flex;
    width: 100%;
`;


const StyledCheckIcon = styled.input.attrs(() => ({
    type: 'checkbox',
}))`
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
`;

const StyledCheckIconLabel = styled.label`
    width: 31px;
    height: 31px;
    display: inline-block;
    position: relative;
    background-image: url('image/ic_viewcheck_false.png');
    cursor: pointer;

    &::after {
        content: '';
        width: 31px;
        height: 31px;
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('image/ic_viewcheck_true.png');
        opacity: 0;
    }

    ${StyledCheckIcon}:checked + &::after {
        opacity: 1;
    }
`;

const StyledCheckContent = styled.textarea`
    height: auto;
    border: none;
    outline: none;
    font-size: 20px;
    resize: none;
    overflow: hidden;
    margin-left: 14px;
    flex: 1; /* 아이템 크기 자유 조절 */
    vertical-align: middle;
    margin-top: 4px;
    &::placeholder {
        color: #9B9B9B;
    }
    font-family: 'NanumSquare_acR';

`;

const StyledViewContent = styled.div`
    height: auto;
    font-size: 20px;
    margin-left: 14px;
    // flex: 1; /* 아이템 크기 자유 조절 */
    // vertical-align: middle;
    margin-top: 4px;
    font-family: 'NanumSquare_acR';
`;

const ViewCheck = () => {

    // 모드
    const [mode, setMode] = useState("view");
    
    // 내용
    const [value, setValue] = useState("체크 리스트");

    const [isChecked, setIsChecked] = useState(false);

    // 텍스트의 크기에 따라 뷰의 크기 변경
    const autoResizeTextarea = (e) => {
        let textarea = document.querySelector('.viewCheckContent');
      
        if (textarea) {
          textarea.style.height = 'auto';
          let height = textarea.scrollHeight; // 높이
          textarea.style.height = `${height}px`;
          setValue(textarea.value)
        }
    };

    // 체크 유무에 따라
    const checkHandler = ({ target }) => {
        let content;
        if (mode === "edit"){
            content = document.querySelector('.viewCheckContent');
        }
        else{
            content = document.querySelector('.viewContent');
        }
        setIsChecked(!isChecked);
        if (!isChecked){
            content.style.color = "#9B9B9B";
        }
        else {
            content.style.color = "#000000";
        }
    }

    let content = null;
    //edit 모드
    if (mode === "edit"){
        content = (
            <StyledBorder>
                <StyledCheckIcon
                    id="viewCheck"
                    checked={isChecked}
                    onChange={(e) => checkHandler(e)}
                />
                <StyledCheckIconLabel htmlFor="viewCheck" />
                <StyledCheckContent
                    className="viewCheckContent"
                    placeholder="글을 입력해주세요."
                    onChange={autoResizeTextarea}
                />
            </StyledBorder>
        );
    }
    else if (mode === "view"){
        content = (
            <StyledBorder>
                <StyledCheckIcon
                    id="viewCheck"
                    checked={isChecked}
                    onChange={(e) => checkHandler(e)}
                />
                <StyledCheckIconLabel htmlFor="viewCheck" />
                <StyledViewContent className="viewContent" >{value}</StyledViewContent>
            </StyledBorder>
        );
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default ViewCheck;