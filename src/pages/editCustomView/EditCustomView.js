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

const EditCustomView = () => {

    // 추가된 커스텀뷰 리스트
    const [contentList, setContentList] = useState([0]);

  const linkEditItems = [itemText, itemImage, itemLink, itemPlace, itemCheckbox, itemCode];
    const linkEditItemsText = ["item_text", "item_image", "item_link", "item_place", "item_checkbox", "item_code"];

  const [closeAddLinkItems, setCloseAddLinkItems] = useState(true);

  
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


  return (
    <BtnContainer>
        <Container>
            <TopMenus>
                {/* 페이지 시트 선택 */}
                <PageSheetLabel>
                    Page Sheet
                </PageSheetLabel>
                <PageSheetInputBorder>
                    <PageSheetInput placeholder="페이지 시트 이름" maxLength={10}/>
                </PageSheetInputBorder>
            </TopMenus>
            {/* 제목 */}
            <ViewTitle/>
            {/* <ViewText/> */}
            {/* 추가된 링크 메모 아이템 리스트 */}
            {
              contentList && contentList.map((item, i) => (
                <ContentItem>
                  {item === "item_text" && <ViewText key={i} state="edit" onBackspaceDelete={() => deleteItem(i)}/>}
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
            <BtnDoneAddPageSheet>만들기</BtnDoneAddPageSheet>
        </BtnDoneAddPageSheetWrapper>
    </BtnContainer>
  );
}

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
`;
const BtnDoneAddPageSheetWrapper = styled.div`
  // position: sticky;
  
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default EditCustomView;