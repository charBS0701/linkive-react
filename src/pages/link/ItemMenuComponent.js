import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import styled, { css } from 'styled-components';

function ItemMenuComponent() {
    const InlineDiv = styled.div`
      display: inline;
    `;

    const OutsideButton = styled.button`
      border: none;
      background-color: white;
      cursor: pointer;
    `;

    const InsideButton = styled.button`
      border: none;
      background-color: white;
      display: block;
      cursor: pointer;
    `;

    const MenuBox = styled.div`
      border: 1px solid black;
      width: fit-content;
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
            <OutsideButton onClick={openPopup}>:</OutsideButton>
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