import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../styles/colorPalette";

import arrowUp from "../../contents/arrow_up.png";
import arrowDown from "../../contents/arrow_down.png";
import folderIcon from "../../contents/icon_folder.png";
import folderNoneIcon from "../../contents/icon_folder_none.png";
import instagram from "../../contents/platform_instagram.png";
import twitter from "../../contents/platform_twitter.png";
import naverBlog from "../../contents/platform_naver_blog.png";
import defaultPlatform from "../../contents/platform_default.png";
import menuViewLink from "../../contents/menu_view_link.png";
import menuViewLinkArrow from "../../contents/menu_view_link_arrow.png";
import selectFolderBtn from "../../contents/item_checkbox.png";

const ViewLink = () => {
  const folders = ['놀이공원', '제주도', '부산'];
  const platforms = [instagram, twitter, naverBlog, defaultPlatform];
  const title = "제목입니다."

  const [openMenu, setOpenMenu] = useState(false);

  const [openFolder, setOpenFolder] = useState(false);
  const [isFolderIcon, setFolderIcon] = useState(folderNoneIcon);
  const [arrowFolder, setArrowFolder] = useState(arrowUp);
  const [saveFolder, setSaveFolder] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isMoveFolder, setMoveFolder] = useState(false);

  // 폴더 이동 메뉴 선택 시
  const selectMoveFolder = () => {
    setOpenMenu(false);
    setMoveFolder(!isMoveFolder);
    setSelectedFolder(saveFolder);
  }

  // 폴더 선택 열고 닫기 event
  const openSelectFolder = () => {
    setOpenFolder(!openFolder);
    // 여닫기 화살표 모양도 바꿔주기
    if(openFolder) setArrowFolder(arrowUp);
    else setArrowFolder(arrowDown);
  }

  useEffect(() => {

  },[openFolder, arrowFolder, selectedFolder, isMoveFolder, saveFolder]);

  return (
    <Container>
      {/* 폴더 표시 */}
        {!isMoveFolder ? 
          <TopMenus>
            <FolderText>
              {saveFolder=== null
              ? "폴더 없음"
              : saveFolder}
            </FolderText>
            <FolderIcon
              src={isFolderIcon}
              alt="폴더"
            />
          </TopMenus>

        : <TopMenus>
          {/* 폴더 선택 */}
          <FolderLabel>folder</FolderLabel>
          <FolderClose>
            <SelectFolder>
              <SelectFolderText>
                {selectedFolder === null
                  ? "폴더 없음"
                  : selectedFolder}
              </SelectFolderText>
              <SelectFolderArrow
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
          <SelectFolderBtn
            src={selectFolderBtn}
            alt="폴더 이동"
            onClick={() => {
              if(selectedFolder === null) {
                setSaveFolder(null);
                selectMoveFolder();
              }
              else {
                setSaveFolder(selectedFolder);
                setFolderIcon(folderIcon);
                selectMoveFolder();
              }
            }}
          />
        </TopMenus>}

      {/* 제목 */}
      <TitleSet>
        <FlatformIcon
          src={platforms[0]}
          alt="출처 플랫폼"
        />
        <TitleText>{title}</TitleText>
        <MenuViewLinkBtn
          src={menuViewLink}
          alt="링크 메뉴"
          onClick={() => {setOpenMenu(!openMenu);}}
        />
      </TitleSet>

      {/* 링크 메뉴 */}
      {openMenu ? 
      <MenuViewLinkSet>
        <Link
          to="/editLink"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#000000",
          }}>
          <MenuViewLink>
            <div>페이지 수정</div>
            <MenuArrowIcon
              src={menuViewLinkArrow}
              alt="이동"
            />
          </MenuViewLink>
        </Link>
        <MenuViewLink
          onClick={selectMoveFolder}>
          <div>폴더 이동</div>
          <MenuArrowIcon
            src={menuViewLinkArrow}
            alt="이동"
          />
        </MenuViewLink>
        <Link
          to="https://github.com/charBS0701/linkive-react"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#000000",
          }}>
          <MenuViewLink>
            <div>링크로 접속</div>
            <MenuArrowIcon
              src={menuViewLinkArrow}
              alt="이동"
            />
          </MenuViewLink>
        </Link>
        <MenuViewLink>
          <div>삭제하기</div>
          <MenuArrowIcon
            src={menuViewLinkArrow}
            alt="이동"
          />
        </MenuViewLink>
      </MenuViewLinkSet>
      : null }
    </Container>
  );
}

const Container = styled.div`
  display: block;
  position: relative;
`;

// 상단 메뉴: PageSheet 선택, 폴더 선택 ---------------------------------------------------------------------------
const TopMenus = styled.div`
  display: float;
  align-items: center;
`;
const FolderText = styled.div`
  margin-left: auto;
  font-size: 2vh;
  font-family: 'NanumSquare_acB';
  color: ${palette.black};
`;
const FolderIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

// 제목 ----------------------------------------------------------------------------------------------------------------
const TitleSet = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4vh;
  border: 1px solid ${palette.darkGray};
  border-radius: 0.5vh;
  background-color: ${palette.white};
  box-shadow: 3px 3px 10px -5px ${palette.darkGray};
`;
const TitleText = styled.div`
  width: 70%;
  padding: 15px;
  font-size: 3vh;
  font-family: 'NanumSquare_acB';
  color: ${palette.black};
`;
const FlatformIcon = styled.img`
  width: 35px;
  height: 35px;
  margin: 12px 7px 12px 20px;
`;
const MenuViewLinkBtn = styled.img`
  width: 35px;
  height: 35px;
  margin-left: auto;
  margin-right: 10px;
`;

// 링크 메뉴 -------------------------------------------------------------------------------------------------------------
const MenuViewLinkSet = styled.div`
  position: absolute;
  z-index: 5;
  display: block;
  right: 0;
  width: 140px;
  align-items: center;
  margin-top: 4vh;
  padding: 10px 20px 10px 20px;
  border: 0px solid;
  border-radius: 0.5vh;
  background-color: ${palette.white};
  box-shadow: 0px 0px 10px -2px ${palette.darkGray};
`;
const MenuViewLink = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
  width: 140px;
  font-size: 2vh;
  font-family: 'NanumSquare_acB';
  color: ${palette.black};
`;
const MenuArrowIcon = styled.img`
  margin-left: auto;
  width: 15px;
  height: 15px;
`;

// 폴더 이동/선택 -------------------------------------------------------------------------------------------------------
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
const SelectFolderArrow = styled.img`
  width: 22px;
  height: auto;
  margin-left: auto;
`;
const SelectFolderUl = styled.ul`
  position: absolute;
  z-index: 5;
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
const SelectFolderBtn = styled.img`
  margin-left: 10px;
  width: 24px;
  height: auto;
`;

export default ViewLink;