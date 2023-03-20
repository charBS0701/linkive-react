import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import styled from 'styled-components';

import MenuButton from '../../contents/menu_button.png'

function ItemMenuComponent() {
    const InlineDiv = styled.div`
      display: inline;
      margin-left: auto;
      margin-right: 4px;
    `;

    const OutsideButton = styled.img`
      border: none;
      background-color: white;
      cursor: pointer;
    `;

    const InsideButton = styled.button`
      border: none;
      background-color: white;
      display: block;
      cursor: pointer;
      padding: 3px 8px 3px 8px; 
    `;

    const MenuBox = styled.div`
      border: 1px solid black;
      width: fit-content;
      position: absolute;
      z-index: 1;
    `;

    const LessMarginHr = styled.hr`
      margin: 0px;
    `

    const [popup, setPopup] = useState(false);
    const openPopup = () => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false);
    }

    return (
        <InlineDiv>
            <OutsideButton src={MenuButton} onClick={openPopup} width={4}></OutsideButton>
            {popup && (<ClickAwayListener onClickAway={closePopup}>
                <MenuBox className={'popup'}>
                    <InsideButton onClick={() => console.log("delete")}>삭제하기</InsideButton>
                    <LessMarginHr />
                    <InsideButton onClick={() => console.log("edit")}>수정하기</InsideButton>
                </MenuBox>
            </ClickAwayListener>)}
        </InlineDiv>
    );
}

export default ItemMenuComponent;