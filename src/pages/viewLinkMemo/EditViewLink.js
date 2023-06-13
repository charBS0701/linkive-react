import ViewText from "../../routes/customView/ViewText";
import ViewTitle from "../../routes/customView/ViewTitle";
import ViewLink from "../../routes/customView/ViewLink";
import ViewCode from "../../routes/customView/ViewCode";
import ViewCheck from "../../routes/customView/ViewCheck";
import ViewAddress from "../../routes/customView/ViewAddress";
import ViewImage from "../../routes/customView/ViewImage";
import BtnAddLink from "../home/BtnAddLink";
import MapContainer from "../../routes/customView/MapContainer";
import LandingPage from "../../routes/customView/LandingPage";
import menuViewLink from "../../contents/menu_view_link.png";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import styled from "styled-components";
import palette from "../../styles/colorPalette";
import addLinkEditItem from "../../contents/add_link_edit_item.png";
import itemText from "../../contents/item_text.png";
import itemImage from "../../contents/item_image.png";
import itemLink from "../../contents/item_link.png";
import itemPlace from "../../contents/item_place.png";
import itemCheckbox from "../../contents/item_checkbox.png";
import itemCode from "../../contents/item_code.png";

import arrowUp from "../../contents/arrow_up.png";
import arrowDown from "../../contents/arrow_down.png";
import folderIcon from "../../contents/icon_folder.png";
import folderNoneIcon from "../../contents/icon_folder_none.png";
import instagram from "../../contents/platform_instagram.png";
import twitter from "../../contents/platform_twitter.png";
import naverBlog from "../../contents/platform_naver_blog.png";
import defaultPlatform from "../../contents/platform_default.png";
import menuViewLinkArrow from "../../contents/menu_view_link_arrow.png";
import selectFolderBtn from "../../contents/item_checkbox.png";
import github from "../../contents/img_github.png"

const EditViewLink = () => {

    const [mode, setMode] = useState("edit");

    // 추가된 커스텀뷰 리스트
    const [contentList, setContentList] = useState([0]);

  const linkEditItems = [itemText, itemImage, itemLink, itemPlace, itemCheckbox, itemCode];
    const linkEditItemsText = ["item_text", "item_image", "item_link", "item_place", "item_checkbox", "item_code"];

  const [closeAddLinkItems, setCloseAddLinkItems] = useState(true);

  
  const [openMenu, setOpenMenu] = useState(false);

  
  // 링크 편집 아이템 추가 버튼 리스트 열고 닫기 event
  const openAddLinkItems = () => {
    setCloseAddLinkItems(!closeAddLinkItems);
  }

  // 아이템 추가 리스트에서 아이템 클릭 시 추가된 아이템 리스트에 새 아이템 추가
  const clickAddLinkItem = (item) => {
    setCloseAddLinkItems(!closeAddLinkItems);
  
    let content = [...contentList];
    content.push(item);
    setContentList(content);
  };

  // 아이템 삭제하기
  const deleteItem = (index) => {
    const updatedContentList = [...contentList];
    updatedContentList.pop(index);
    setContentList(updatedContentList);
  };


  // 아이템 수정완료 버튼
  const clickDoneEdit = () => {
    console.log("버튼 클릭");
    setMode("view");
  }


  let content = null;
  if(mode==="edit"){
    content = 
        <BtnContainer>
            <Container>
                
                {/* 제목 */}
                <ViewTitle state={mode}/>
                {/* <ViewText/> */}
                {/* 추가된 링크 메모 아이템 리스트 */}
                {
                contentList && contentList.map((item, i) => (
                    <ContentItem>
                    {item === "item_text" && <ViewText key={i} state={mode} onBackspaceDelete={() => deleteItem(i)}/>}
                    {item === "item_image" && <ViewImage key={i} state="add" onClickTrashBtn={() => deleteItem(i)}/>}
                    {item === "item_link" && <ViewLink key={i} state="edit" onClickTrashBtn={() => deleteItem(i)}/> }
                    {item === "item_place" && <ViewAddress key={i} state="edit" onClickTrashBtn={() => deleteItem(i)}/>}
                    {item === "item_checkbox" && <ViewCheck key={i} state="edit" onBackspaceDelete={() => deleteItem(i)}/>} 
                    {item === "item_code" && <ViewCode key={i} state="edit" onClickTrashBtn={() => deleteItem(i)}/>}
                    </ContentItem>
                ))
                }
                {/* 링크 메모 아이템 리스트 보여주기 */}
                {/* 링크 메모 아이템 추가 버튼 */}
                <AddLinkMemoSet>
                    {closeAddLinkItems ?
                    <AddLinkMemoItemBtn
                        src={addLinkEditItem}
                        alt="링크 아이템 추가 버튼"
                        onClick={openAddLinkItems}/>
                    : <AddLinkMemoItemList>
                        {
                        linkEditItemsText.map(linkEditItem => (
                            <AddLinkMemoItem
                            src={require(`../../contents/${linkEditItem}.png`)}
                            alt="링크 아이템"
                            onClick={() => clickAddLinkItem(linkEditItem)}
                            />
                        ))
                        }
                    </AddLinkMemoItemList>
                    }
                </AddLinkMemoSet>

                
            </Container>
            <BtnDoneAddPageSheetWrapper>
                <BtnDoneAddPageSheet onClick={clickDoneEdit}>수정하기</BtnDoneAddPageSheet>
            </BtnDoneAddPageSheetWrapper>
        </BtnContainer>
  }

  else if (mode ==="view"){
    content = 
        <Container>
                    
            {/* 제목 */}
            <TitleSet>
                <FlatformIcon
                src={github}
                alt="출처 플랫폼"
                />
                <TitleText state={mode}>
                도원결의
                </TitleText>
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
                <MenuViewLink>
                <div>폴더 이동</div>
                <MenuArrowIcon
                    src={menuViewLinkArrow}
                    alt="이동"
                />
                </MenuViewLink>
                <Link
                to="https://github.com/jung0115/Linkive_AOS"
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
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#000000",
                    }}>
                    <MenuViewLink>
                    <div>삭제하기</div>
                    <MenuArrowIcon
                        src={menuViewLinkArrow}
                        alt="이동"
                    />
                    </MenuViewLink>
                </Link>
            </MenuViewLinkSet>
            : null }
            {/* <ViewText/> */}
            {/* 추가된 링크 메모 아이템 리스트 */}
            {
            contentList && contentList.map((item, i) => (
                <ContentItem>
                {item === "item_text" && <ViewText key={i} state={mode} onBackspaceDelete={() => deleteItem(i)}/>}
                {item === "item_image" && <ViewImage key={i} state={mode} onClickTrashBtn={() => deleteItem(i)}/>}
                {item === "item_link" && <ViewLink key={i} state={mode} onClickTrashBtn={() => deleteItem(i)}/> }
                {item === "item_place" && <ViewAddress key={i} state={mode} onClickTrashBtn={() => deleteItem(i)}/>}
                </ContentItem>
            ))
            }
                <ContentItem><ViewCheck state={mode} isChecked={true} value ="최종 보고서"/></ContentItem>
                <ContentItem><ViewCheck state={mode} isChecked={false} value="최종 발표"/></ContentItem>
                <ContentItem><ViewCode state={mode}/></ContentItem>
        </Container>
  }


  return (
    <div>
        {content}
    </div>
  );
}

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

const BtnContainer = styled.div`
    // position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    // flex-wrap: space-between;
`;

const Container = styled.div`
  display: block;
  position: relative;
  margin-bottom : 50px;
  flex-grow: 1;
`;

// 상단 메뉴: PageSheet 선택, 폴더 선택 ---------------------------------------------------------------------------
const TopMenus = styled.div`
  display: float;
  margin-bottom: 43px;
`;

// Page Sheet 선택 문구
const PageSheetLabel = styled.div`
  color: ${palette.mainColor};
  font-size: 1.2rem;
  font-family: 'NanumSquare_acB';
  margin-top: 15px;
`;

const PageSheetInputBorder = styled.div`
    box-sizing: border-box;

    width: 258px;
    height: 51px;

    background: #FFFFFF;
    border: 1.5px solid #6368E3;
    border-radius: 50px;

    display: flex;
    align-items: center;

    margin-left: 30px;
`;

const PageSheetInput = styled.input`
    width: 200px;
    border: none;
    outline: none;
    margin-left: 30px;
    font-size: 22px;
    font-family: 'NanumSquare_acR';
    &::placeholder {
        color: ${palette.darkGray};
    }
`;

const ContentItem = styled.div`
    margin-bottom: 40px;
`;


// 링크 메모 아이템 추가 -------------------------------------------------------------------------------------------------------
const AddLinkMemoSet = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5vh;
`;
const AddLinkMemoItemBtn = styled.img`
  width: 45px;
  height: 45px;
  margin: auto;
`;
const AddLinkMemoItemList = styled.div`
  display: flex;
  margin: auto;
  padding: 5px 10px;
  align-items: center;
  border: 1px solid ${palette.mainColor};
  border-radius: 0.5vh;
  background-color: ${palette.white};
  box-shadow: 3px 3px 10px -5px ${palette.darkGray};
`;
const AddLinkMemoItem = styled.img`
  width: 20px;
  height: 20px;
  margin: 5px 15px;
`;

const BtnDoneAddPageSheet = styled.button`
    width: 152px;
    height: 48px;

    background: #6368E3;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    border: none;

    font-size: 18px;
    color: ${palette.white};
    font-family: 'NanumSquare_acB';
    margin-bottom: 121px;
    cursor: pointer;
`;
const BtnDoneAddPageSheetWrapper = styled.div`
  // position: sticky;
  
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default EditViewLink;