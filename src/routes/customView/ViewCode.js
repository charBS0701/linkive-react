import styled from "styled-components";
import { useState } from "react";

const StyledBorder = styled.div`
    width: 100%;
    // height: 250px;
    display: flex;

    background-color: #CDCDCD;
    /* 테두리 둥글게 */
    border-radius: 5px;
    flex-direction: column;
`;

const StyledCodeImageBorder = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledCodeImage = styled.img`
    width: 27px;
    height: 27px;
    margin-left: 30px;
    margin-top: 16px;
    flex-shrink: 0; /* 아이템 크기 고정 */
`;

const StyledTrashImage = styled.img`
    width: 32px;
    height: 32px;
`;

const StyledTrashBtn = styled.button`
    background-color: transparent;
    border: none;
    flex-shrink: 0; /* 아이템 크기 고정 */
    margin-right: 21px;
    margin-top: 16px;
    margin-left: auto;
`;

const StyledEditInput = styled.textarea`
    width: auto;
    border: none;
    outline: none;
    font-size: 20px;
    resize: none;
    overflow: hidden;
    flex-grow: 1; /* 아이템 크기 자유 조절 */
    background-color: transparent;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 15px;
    margin-bottom: 20px;
    font-family: 'NanumSquare_acR';
    font-size: 18px;
    &::placeholder {
        color: #9B9B9B;
    }
`;

const StyledView = styled.div`
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 15px;
    margin-bottom: 20px;
    font-family: 'NanumSquare_acR';
    font-size: 18px;
`;



const ViewCode = (props) => {

    // 모드
    const [mode, setMode] = useState(props.state);

    // 코드 내용
    const [value, setValue] = useState("#include <stdio.h>"+<br/>+"void main(){"+<br/>+"int a;"+<br/>+"}")
    
    // 텍스트 크기에 따라 view 크기 조정
    const autoResizeTextarea = (e) => {
        let textarea = document.querySelector('.viewCode');
        // let background = document.querySelector('.viewCodeBorder');
    
        if (textarea) {
            textarea.style.height = 'auto';
            let height = textarea.scrollHeight; // 높이
            textarea.style.height = `${height}px`;
            // if (height>172) {
            //     background.style.height = 'auto';
            // }
            // else {
            //     background.style.height = `${250}px`;
            // }
        }
    };


    // textarea tab키 적용
    const applyTab = (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
            let val = e.target.value;
            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;
            e.target.value = val.substring(0, start) + "\t" + val.substring(end);
            e.target.selectionStart = e.target.selectionEnd = start + 1;
            setValue(e.target.value);
            return false; //  prevent focus
        }
    };

    // 아이템 삭제 버튼 구현
    const handleclickTrashBtn = () => {
        props.onClickTrashBtn();
    }

    let content = null;
    //edit 모드
    if (mode === "edit"){
        content = 
            <StyledBorder>
                <StyledCodeImageBorder>
                    <StyledCodeImage src="image/ic_code.png"/>
                    <StyledTrashBtn onClick={handleclickTrashBtn}>
                        <StyledTrashImage src="image/ic_trash.png" />
                    </StyledTrashBtn>
                </StyledCodeImageBorder>
                <StyledEditInput className="viewCode" placeholder="코드를 입력하세요." onChange={autoResizeTextarea} onKeyDown={applyTab}/>
            </StyledBorder>
    }
    else if (mode === "view"){
        content =
            <StyledBorder>
                <StyledCodeImage src="image/ic_code.png"/>
                <StyledView>System.out.print("Linkive");</StyledView>
            </StyledBorder>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default ViewCode;