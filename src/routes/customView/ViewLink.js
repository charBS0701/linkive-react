import styled from "styled-components";
import { useState } from "react";

const StyledBorder = styled.div`
    width: 100%;
    // height: 74px;
    padding-top: 21px;
    padding-bottom: 21px;

    /* 점선 넣기 */
    background-image: linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%);
    background-size: 20px 2px, 20px 2px, 2px 20px, 2px 20px;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-position: 0 0, 0 100%, 0 0, 100% 0;


    display: flex; /* 수평 중앙 정렬 */
    align-items: center; /* 수평 중앙 정렬 */

    /* 테두리 둥글게 */
    border-radius: 5px;
`;

const StyledLinkIcon = styled.img`
    width: 44px;
    height: 44px;
    margin-left: 23px;
    flex-shrink: 0; // 아이템 크기 고정
    &::placeholder {
        color: #9B9B9B;
    }
`;

const StyledEditInput = styled.input`
    border: none;
    outline: none;
    font-size: 20px;
    margin-left: 18px;
    margin-right: 18px;
    flex-grow: 1; /* 아이템 크기 자유 조절 */
`;

const StyledEditTrashIcon = styled.img`
    width: 32px;
    height: 32px;
    flex-shrink: 0; /* 아이템 크기 고정 */
    margin-right: 21px;s
`;

const StyledEditTrashBtn = styled.button`
    background-color: transparent;
    border: none;
`;

const StyledView = styled.div`
    margin-left: 22px;
`;

const StyledViewLinkTitle = styled.div`
    font-family: 'NanumSquare_acB';
    font-size: 20px;
    margin-bottom: 4px;
`;

const StyledViewLinkAddr = styled.div`
    font-family: 'NanumSquare_acR';
    font-size: 18px;
    color: #9B9B9B;
`;


const ViewLink = (props) => {

    // 모드
    const [mode, setMode] = useState(props.state);

    const [title, setTitle] = useState("GitHub - charBS0701/linkive-react");
    const [addr, setAddr] = useState("https://github.com/charBS0701/linkive-react");

    // 아이템 삭제 버튼 구현
    const handleclickTrashBtn = () => {
        props.onClickTrashBtn();
    }

    let content = null;
    // edit 모드일 때
    // enter를 치면 링크의 제목을 가져오며 뷰 모드처럼 보여야 하는데 클릭하면 수정은 돼야 함
    if (mode === "edit"){
        content = 
            <StyledBorder>
                <StyledLinkIcon src="image/ic_link.png"/>
                <StyledEditInput placeholder="링크 추가" />
                <StyledEditTrashBtn onClick={handleclickTrashBtn}>
                    <StyledEditTrashIcon src="image/ic_trash.png"/>
                </StyledEditTrashBtn>
            </StyledBorder>
    }
    else if (mode === "view"){
        content =
            <StyledBorder>
                <StyledLinkIcon src="image/ic_link.png"/>
                <StyledView>
                    <StyledViewLinkTitle>{title}</StyledViewLinkTitle>
                    <StyledViewLinkAddr>{addr}</StyledViewLinkAddr>
                </StyledView>
                
            </StyledBorder>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default ViewLink;