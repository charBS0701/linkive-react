import styled from "styled-components";
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

const ViewCheck = (props) => {

    // 모드
    const [mode, setMode] = useState(props.state);
    
    // 내용
    const [value, setValue] = useState(props.value);

    const [isChecked, setIsChecked] = useState(props.isChecked);

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

    // 빈 값일 때 backspace 키 입력 시 아이템 삭제
    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' && event.target.value === '') {
            props.onBackspaceDelete();
        }
    };

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
                    onKeyDown={handleKeyDown} // 백스페이스 키 이벤트 핸들러 추가
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