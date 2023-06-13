// import "../../css/customView/ViewText.css";
import { useState, useEffect } from "react";
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

// const ViewText = (props) => {

//     // textarea의 크기가 입력된 글자만큼 증감함
//     const autoResizeTextarea = (e) => {
//         let textarea = document.querySelector('.viewText');

//         if (textarea) {
//           textarea.style.height = 'auto';
//           let height = textarea.scrollHeight; // 높이
//           textarea.style.height = `${height}px`;
//         }
//     };

//     //모드
//     const [mode, setMode] = useState(props.state);
//     const [value, setValue] = useState("내용입니다.");

//     let content = null;
//     // edit 모드일 때와 view 모드일 때
//     // edit 모드
//     if (mode === "edit"){
//         content = 
//             <StyledEdit placeholder="글을 입력하세요." onChange={autoResizeTextarea}/>
//     }
//     // view 모드
//     else if (mode === "view"){
//         content = 
//             <StyledView>{value}</StyledView>
//     }
    
//     return (
//         <div>
//             {content}
//         </div>
//     )
// }
const ViewText = (props) => {
    const [mode, setMode] = useState(props.state);
    const [value, setValue] = useState("링카이브 깃허브 레포");

    const autoResizeTextarea = (e) => {
        let textarea = e.target;
        textarea.style.height = 'auto';
        let height = textarea.scrollHeight; // 높이
        textarea.style.height = `${height}px`;

        // setValue(e.target.value);
    };

    // 빈 값일 때 backspace 키 입력 시 아이템 삭제
    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' && event.target.value === '') {
            props.onBackspaceDelete();
        }
    };

    let content = null;
    if (mode === "edit") {
        content =
            <StyledEdit
                placeholder="글을 입력하세요."
                onChange={autoResizeTextarea}
                onKeyDown={handleKeyDown} // 백스페이스 키 이벤트 핸들러 추가
            />;
    } else if (mode === "view") {
        content =
            <StyledView>{value}</StyledView>;
    }

    return (
        <div>
            {content}
        </div>
    );
};




export default ViewText;