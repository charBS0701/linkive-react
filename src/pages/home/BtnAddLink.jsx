import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import palette from "../../styles/colorPalette";

const StyledBeforeBtn = styled.button`
    width: 164px;
    height: 52px;
    position: relative;
    border: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledBeforeBorderimg = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const StyledBeforeBtnBorder = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBeforeBtnText = styled.div`
    // width: auto;
    margin-left: auto;
    font-family: 'NanumSquare_acR';
    font-size: 18px;
    font-weight: 600;
    color: white;
    display: inline;
`;

const StyledBeforeBtnImg = styled.img`
    width: 30px;
    height: 30px;
    margin-left: 16px;
    margin-right: 11px;
`;

const StyledAfterBorder = styled.div`
    display: grid;
    grid-template-columns: 55px 275px 50px;
    // grid-template-rows: 1fr 1fr;
    align-items: center;

    row-gap: 13px;
`;

const StyledAfterLinkText = styled.div`
    font-family: 'NanumSquare_acEB';
    font-size: 15px;
    color: ${palette.mainColor};
    grid-column: 1/2;
    grid-row: 1/2;
`;

const StyledAfterLinkInput = styled.input`
    box-sizing: border-box;
    width: 275px;
    height: 32px;
    padding-left: 21px;
    font-family: 'NanumSquare_acR';
    border: 1px solid #6368E3;
    border-radius: 30px;
    grid-column: 2/3;
    grid-row: 1/2;
    &::placeholder {
        color: ${palette.darkGray};
    }
`;

const StyledAfterFolderText = styled.div`
    font-family: 'NanumSquare_acEB';
    font-size: 15px;
    color: ${palette.mainColor};
    grid-column: 1/2;
    grid-row: 2/3;
    
    // align-self: start;
`;

const StyledAfterFolderListIcon = styled.img`
	margin-left: auto;
    margin-right: 13px;
	align-self: center;
	width: 16px;
	height: 12px;
    grid-column: 2/3;
    grid-row: 1/2;
`;

const StyledAfterFolderListBorder = styled.div`
    width: 275px;
    // height: 32px;
    display: grid;
    // flex-direction: column;

    grid-column: 2/3;
    grid-row: 2/4;
    align-self: start;
    box-sizing: border-box;
    // padding-left: 19px;
    border: 1px solid #6368E3;
    border-radius: 20px;
    cursor: pointer;

    position: relative;
    padding-top: 8px;
    padding-bottom: 8px;

    &:focus + ${StyledAfterFolderListIcon} {
        transform: rotate(180deg);
    }
`;

// const StyledAfterFolderList = styled.select`
//     width: 100%;
//     height: 100%;
//     z-index: 3; // select가 아이콘보다 위여야 함
//     background: transparent;
//     box-sizing: border-box;
//     padding-left: 19px;
//     border: 1px solid #6368E3;
//     border-radius: 30px;
//     color: ${palette.mainColor};

//     font-family: 'NanumSquare_acEB';
//     font-size: 13px;

//     // 방향 화살표 없애기
//     -webkit-appearance: none;
// 	-moz-appearance: none;
// 	appearance: none;

//     &:focus + ${StyledAfterFolderListIcon} {
//         transform: rotate(180deg);
//     }
// `;

const StyledAfterFolderItemSelected = styled.span`
    margin-left: 21px;
    font-family: 'NanumSquare_acEB';
    font-size: 13px;
    color: ${palette.mainColor};
`;

const StyledAfterFolderItemUl = styled.ul`
    width: auto;
    border-radius: 1rem;
    cursor: pointer;
    margin-top : 0px;
    margin-bottom: 0px;
    margin-left: 21px;
    padding-left: 0px;

    list-style-type: none;
`;

const StyledAfterFolderItemLi = styled.li`
    font-family: 'NanumSquare_acEB';
    font-size: 13px;
    color: ${palette.mainColor};
    margin-top: 10px;
`;

// const StyledAfterFolderItemBtn = styled.button`
    
// `;

const StyledAfterAddBtn = styled.button`
    border: none;
    background: none;
    margin-left: 17px;
    grid-column: 3/4;
    grid-row: 2/3;

    align-self: start;
`;

const StyledAfterAddBtnImg = styled.img`
    width: 30px;
    height: 30px;
`;


const BtnAddLink = () => {
    //모드
    const [mode, setMode] = useState("addLink");

    // 리스트가 열렸는지 닫혔는지
    const [isOpen, setIsOpen] = useState(false);
    // 현재 선택된 폴더 리스트 값
    const [selectedOption, setSelectedOption] = useState(null);

    // 리스트 상태 추척
    const folderListRef = useRef(null);


    // 리스트 외부를 클릭했을 때 닫히게
    useEffect(() => {
        const handleClickOutside = (event) => {
            // event.target은 클릭이벤트가 발생한 요소
            if (folderListRef.current && !folderListRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Component rendering 후 이벤트 등록
        // 클릭하면 listener 실행
        // 3번째 메소드는 옵션, default값은 false. true일 경우, 리스너가 추가된 후 최대 한 번만 호출됨을 뜻함
        document.addEventListener("click", handleClickOutside, true);

        // Component 제거 시 이벤트 제거
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [folderListRef]);

    //folderList 선언
    const FolderList = [
        { value: "folder1", name: "여행" },
        { value: "folder2", name: "공부" },
        { value: "folder3", name: "개발" },
        { value: "folder4", name: "일기" },
        { value: "folder5", name: "체크리스트" },
    ];

    // 링크 추가 버튼 클릭 시 링크 추가 모드로 변환
    const changeModeAddLink = () => {
        setMode("addLink")
    }

    const handleFolderListClick = () => {
        setIsOpen(!isOpen);
    };

    const FolderListBox = (props) => {
      
        const handleOptionClick = (option) => {
            setSelectedOption(option);
            setIsOpen(false);
        };
      
        return (
            <StyledAfterFolderListBorder ref={folderListRef} className="select" data-role="selectBox" onClick={handleFolderListClick}>
                <StyledAfterFolderItemSelected
                    date-value={selectedOption ? selectedOption.value : ""}
                    className={`selected-option ${isOpen ? "open" : ""}`}>
                    {selectedOption ? selectedOption.name : "폴더 선택"}
                </StyledAfterFolderItemSelected>
                {isOpen && (
                <StyledAfterFolderItemUl>
                    {props.options.map((option) => (
                        <StyledAfterFolderItemLi key={option.value}  onClick={() => handleOptionClick(option)}>
                            {option.name}
                        </StyledAfterFolderItemLi>
                    ))}
                </StyledAfterFolderItemUl>
                )}
                {!isOpen && (
                    <StyledAfterFolderListIcon src="image/ic_select_down.png" />
                )}
                {isOpen && (
                    <StyledAfterFolderListIcon src="image/ic_select_up.png" />
                )}
            </StyledAfterFolderListBorder>
        );
    }

    let content = null;
    if (mode === "default"){
        content = 
            <StyledBeforeBtn onClick={changeModeAddLink}>
                <StyledBeforeBorderimg src="image/img_btn_add_link_before.png" />
                <StyledBeforeBtnBorder>
                    <StyledBeforeBtnText>링크 추가</StyledBeforeBtnText>
                    <StyledBeforeBtnImg src="image/ic_btn_add_link_before.png" />
                </StyledBeforeBtnBorder>
            </StyledBeforeBtn>
    }

    else if (mode === "addLink"){
        content = 
            <StyledAfterBorder>
                <StyledAfterLinkText>Link</StyledAfterLinkText>
                <StyledAfterLinkInput placeholder="링크를 입력해주세요"/>
                <StyledAfterFolderText>Folder</StyledAfterFolderText>
                <FolderListBox options={FolderList}/>
                <StyledAfterAddBtn>
                    <StyledAfterAddBtnImg src = "image/ic_btn_add_link_after.png"/>
                </StyledAfterAddBtn>
            </StyledAfterBorder>
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default BtnAddLink;