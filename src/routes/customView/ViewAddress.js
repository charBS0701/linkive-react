import styled from "styled-components";
import { useState } from "react";
import LandingPage from "./LandingPage";

const StyledBorder = styled.div`
    width: 100%;
    padding-top: 13px;
    padding-bottom: 13px;

    /* 점선 넣기 */
    background-image: linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%);
    background-size: 20px 2px, 20px 2px, 2px 20px, 2px 20px;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-position: 0 0, 0 100%, 0 0, 100% 0;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center; /* 수평 중앙 정렬 */
    justify-content: start;

    /* 테두리 둥글게 */
    border-radius: 5px;

`;

// const StyledAddBorder = styled.div`
//     width: 100%;
//     padding-top: 13px;
//     padding-bottom: 13px;

//     /* 점선 넣기 */
//     background-image: linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%);
//     background-size: 20px 2px, 20px 2px, 2px 20px, 2px 20px;
//     background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
//     background-position: 0 0, 0 100%, 0 0, 100% 0;

//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     grid-template-rows: 
//     align-items: center; /* 수평 중앙 정렬 */
//     justify-content: start;

//     /* 테두리 둥글게 */
//     border-radius: 5px;
// `;

const StyledAddrIcon = styled.img`

    width: 42px;
    height: 42px;
    margin-left: 23px;

    grid-column: 1/2;
    grid-row: 1/2;
    margin-right: 29px;
`;

const StyledEditInput = styled.div`
    border: none;
    outline: none;
    font-size: 20px;
    margin-left: 85px;
    font-family: 'NanumSquare_acR';
    grid-column: 1/2;
    grid-row: 1/2;
`;

const StyledEditAddIcon = styled.img`
`;

const StyledEditAddBtn = styled.button`
    margin-left: auto;
    margin-right: auto;
    justify-self: center;
    grid-column: 2/3;
    border: none;
    background: none;
`;

const StyledEditTrashBtn = styled.button`
    background-color: transparent;
    border: none;
    grid-column: 3/4;
    margin-right: 21px;
    margin-left: auto;
`;

const StyledEditTrashIcon = styled.img`
    width: 32px;
    height: 32px;
    /*flex-shrink: 0; /* 아이템 크기 고정 */
`;

const StyledView = styled.div`
    grid-column: 1/3;
    grid-row: 1/2;
    margin-left: 85px;
    // display: flex;
`;

const StyledViewRoad = styled.div`
    font-family: 'NanumSquare_acB';
    font-size: 18px;
    margin-bottom: 4px;
`;

const StyledViewLotNum = styled.div`
    font-family: 'NanumSquare_acR';
    font-size: 18px;
    color: #9B9B9B;
`;

const ViewAddress = (props) => {

    //모드
    const [mode, setMode] = useState(props.state);
    const [road, setRoad] = useState("경남 진주시 진주대로 501");
    const [lot, setLot] = useState("지번: 경남 진주시 가좌동 900")

    const [selectedAddress, setSelectedAddress] = useState(null);

    // 주소 목록에서 클릭된 값을 가져와서 변수 초기화
    const handleSelectedAddress = (address) => {
        setSelectedAddress(address);

        setRoad(address.roadAddress);
        setLot(address.address);

        setMode("editView");
    };

    // 카카오 api 연결
    const SetAdd = () => {
        setMode("add");
    }

    // 아이템 삭제 버튼 구현
    const handleclickTrashBtn = () => {
        props.onClickTrashBtn();
    }

    let content = null;
    // edit 모드일 때
    if (mode === "edit"){
        content = 
            <StyledBorder>
                <StyledAddrIcon src="image/ic_address.png"/>
                <StyledEditInput>주소 추가</StyledEditInput>
                <StyledEditAddBtn onClick={SetAdd}>
                    <StyledEditAddIcon src="image/ic_add_view.png"/>
                </StyledEditAddBtn>
                <StyledEditTrashBtn onClick={handleclickTrashBtn}>
                    <StyledEditTrashIcon src="image/ic_trash.png" />
                </StyledEditTrashBtn>
                
            </StyledBorder>
    }
    // 주소 검색 가능 뷰
    else if (mode==="add"){
        content = 
            <div>
                <LandingPage selectedAddress={selectedAddress} onSelectedAddress={handleSelectedAddress}/>
            </div>
    }
    // 주소는 불러왔지만 아직 수정 모드
    else if (mode==="editView"){
        content =
            <StyledBorder>
                <StyledAddrIcon src="image/ic_address.png"/>
                <StyledView>
                    <StyledViewRoad>{road}</StyledViewRoad>
                    <StyledViewLotNum>지번: {lot}</StyledViewLotNum>
                </StyledView>
                <StyledEditTrashBtn onClick={handleclickTrashBtn}>
                    <StyledEditTrashIcon src="image/ic_trash.png"/>
                </StyledEditTrashBtn>
                
            </StyledBorder>
    }
    // view 모드
    else if (mode==="view"){
        content =
            <StyledBorder>
                <StyledAddrIcon src="image/ic_address.png"/>
                <StyledView>
                    <StyledViewRoad>{road}</StyledViewRoad>
                    <StyledViewLotNum>지번: {lot}</StyledViewLotNum>
                </StyledView>
            </StyledBorder>
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default ViewAddress;