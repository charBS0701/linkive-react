import { useState } from "react";
import styled from "styled-components";
import palette from "../../styles/colorPalette";
import arrowUp from "../../contents/arrow_up.png";
import arrowDown from "../../contents/arrow_down.png";
import { useEffect } from "react";



const EditLink = () => {
  const pageSheetDefault = ['자유', '여행', '공부', '개발', '일기', '체크 리스트'];
  const pageSheetCustom = ['맛집', '운동'];
  const folders = ['놀이공원', '제주도', '부산'];

  const [openPageSheet, setOpenPageSheet] = useState(false);
  const [arrowPageSheet, setArrowPageSheet] = useState(arrowUp);
  const [selectedPageSheet, setSelectedPageSheet] = useState(pageSheetDefault[0]);

  const [openFolder, setOpenFolder] = useState(false);
  const [arrowFolder, setArrowFolder] = useState(arrowUp);
  const [selectedFolder, setSelectedFolder] = useState(folders[0]);

  // 페이지 시트 선택 열고 닫기 event
  const openSelectPageSheet = () => {
    setOpenPageSheet(!openPageSheet);
    // 여닫기 화살표 모양도 바꿔주기
    if(openPageSheet) setArrowPageSheet(arrowUp);
    else setArrowPageSheet(arrowDown);
  }

  // 폴더 선택 열고 닫기 event
  const openSelectFolder = () => {
    setOpenFolder(!openFolder);
    // 여닫기 화살표 모양도 바꿔주기
    if(openFolder) setArrowFolder(arrowUp);
    else setArrowFolder(arrowDown);
  }

  useEffect(() => {

  },[openPageSheet, arrowPageSheet, selectedPageSheet,
    openFolder, arrowFolder, selectedFolder]);

  return (
    <TopMenus>
      {/* 페이지 시트 선택 */}
      <PageSheetLabel>
        Page Sheet
      </PageSheetLabel>

      <PageSheetClose>
        <SelectPageSheet
          onClick={openSelectPageSheet}>
          <SelectPageSheetText>{selectedPageSheet}</SelectPageSheetText>
          <SelectPageSheetArrow
            src={arrowPageSheet}
            alt="open" />
        </SelectPageSheet>
      
        {openPageSheet ?
        <SelectPageSheetUl>
          <SelectPageSheetLabel>기본</SelectPageSheetLabel>
          <SelectPageSheetHrDash />
            {
              pageSheetDefault.map(pageSheet => (
                <SelectPageSheetLi
                  value={pageSheet}
                  onClick={() => {
                    setSelectedPageSheet(pageSheet);
                    openSelectPageSheet();
                  }}>
                  {pageSheet}
                </SelectPageSheetLi>
              ))
            }
          <SelectPageSheetHr />
          <SelectPageSheetLabel>커스텀</SelectPageSheetLabel>
          <SelectPageSheetHrDash />
            {
              pageSheetCustom.map(pageSheet => (
                <SelectPageSheetLi
                  value={pageSheet}
                  onClick={() => {
                    setSelectedPageSheet(pageSheet);
                    openSelectPageSheet();
                  }}>
                  {pageSheet}
                </SelectPageSheetLi>
              ))
            }
        </SelectPageSheetUl>
        : null}

      </PageSheetClose>

      {/* 폴더 선택 */}
      <FolderLabel>folder</FolderLabel>
      <FolderClose>
        <SelectFolder>
          <SelectFolderText>{selectedFolder}</SelectFolderText>
          <SelectPageSheetArrow
            src={arrowFolder}
            alt="open"
            onClick={openSelectFolder} />
        </SelectFolder>
        
        {openFolder ? 
          <SelectFolderUl>
            {
              folders.map(folder => (
                <SelectFolderLi
                  value={folder}
                  onClick={() => {
                    setSelectedFolder(folder);
                    openSelectFolder();
                  }}>
                  {folder}
                </SelectFolderLi>
              ))
            }
          </SelectFolderUl>
        : null}
      </FolderClose>
    </TopMenus>
  );
}

// 상단 메뉴: PageSheet 선택, 폴더 선택
const TopMenus = styled.div`
  display: float;
`;

// PageSheet
const PageSheetClose = styled.div`
  display: block;
  margin-left: 1vw;
`;

// Page Sheet 선택 문구
const PageSheetLabel = styled.div`
  color: ${palette.mainColor};
  font-size: 1.2rem;
  font-family: 'NanumSquare_acB';
  margin-top: 15px;
`;

// Page Sheet 선택 리스트
const SelectPageSheet = styled.div`
  display: flex;
  align-items: center;
  width: 140px;
  background: ${palette.white};
  border: 1px solid ${palette.mainColor};
  border-radius: 10vh;
  color: ${palette.black};
  padding: 12px 15px 12px 20px;
`;
const SelectPageSheetText = styled.div`
  font-size: 2vh;
  font-family: 'NanumSquare_acB';
  color: ${palette.black};
`;
const SelectPageSheetArrow = styled.img`
  width: 22px;
  height: auto;
  margin-left: auto;
`;
const SelectPageSheetUl = styled.ul`
  display: block;
  width: fit-content;
  margin: 5px 10px;
  padding-left: 0;
  list-style-type: none;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 2vh;
  font-family: 'NanumSquare_acB';
  color: ${palette.black};
  border: 1px solid ${palette.mainColor};
  background: ${palette.white};
`;
const SelectPageSheetLi = styled.li`
  padding: 14px 15px 12px 15px;
  width: 120px;
`;
const SelectPageSheetLabel = styled.div`
  padding: 14px 15px 12px 15px;
  font-size: 2.1vh;
  font-family: 'NanumSquare_acEB';
  color: ${palette.black};
`;
const SelectPageSheetHrDash = styled.hr`
  border : 0px;
  margin: 0px 10px;
  border-top: 1px dashed ${palette.mainColor};
`;
const SelectPageSheetHr = styled.hr`
  border : 0px;
  margin: 0px 8px;
  border-top: 1.5px solid ${palette.mainColor};
`;

// 폴더 이동/선택
const FolderClose = styled.div`
  display: block;
  margin-left: 1vw;
`;
// 폴더 선택 문구
const FolderLabel = styled.div`
  color: ${palette.mainColor};
  font-size: 1.1rem;
  font-family: 'NanumSquare_acEB';
  margin-top: 15px;
  margin-left: auto;
`;

// 폴더 선택 리스트
const SelectFolder = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  background: ${palette.white};
  border: 1px solid ${palette.mainColor};
  border-top: none;
  border-left: none;
  border-right: none;
  color: ${palette.black};
  padding: 12px 15px 12px 20px;
`;
const SelectFolderText = styled.div`
  font-size: 2vh;
  font-family: 'NanumSquare_acB';
  color: ${palette.black};
`;
const SelectFolderUl = styled.ul`
  display: block;
  width: fit-content;
  margin: 5px 10px;
  padding-left: 0;
  list-style-type: none;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 2vh;
  font-family: 'NanumSquare_acB';
  color: ${palette.black};
  border: 1px solid ${palette.mainColor};
  background: ${palette.white};
`;
const SelectFolderLi = styled.li`
  padding: 14px 15px 12px 15px;
  width: 80px;
`;

export default EditLink;