import React from 'react';
import ItemMenuComponent from './ItemMenuComponent'
import styled from "styled-components";

import FolderIcon from '../../contents/folder_icon.png'

function ItemComponent(props) {
    const ItemLi = styled.li`
      list-style: none;
      float: left;
      margin: 8px;
      box-shadow: 1px 2px 10px black;
      border-radius: 10px;
    `;

    const MainImage = styled.img`
      border-radius: 10px 10px 0 0;
    `

    const FaviconImage = styled.img`
      margin: 3px;
    `

    const FolderIconImage = styled.img`
      margin-left: 3px;
      margin-right: 8px;
    `

    const UpperDiv = styled.div`
      display: flex;
      margin: 3px 10px 0 10px;
      align-items: center;
    `

    const LowerDiv = styled.div`
      text-align: right;
      margin: 0 5px 8px 0;
    `

    const TitleSpan = styled.span`
      margin-left: 3px;
      font-size: 16px;
    `

    const FolderNameSpan = styled.span`
      font-size: 8px
    `

    return(
        <ItemLi>
            <MainImage src={props.src} alt={props.alt} width={240} height={200}/>
            <UpperDiv>
                <FaviconImage src={props.favicon} alt="Favicon" width={18} height={18}/>
                <TitleSpan>{props.title}</TitleSpan>
                <ItemMenuComponent />
            </UpperDiv>
            <LowerDiv>
                <FolderNameSpan>{props.folder}</FolderNameSpan>
                <FolderIconImage src={FolderIcon} alt="Folder Icon" width={10} height={10}/>
            </LowerDiv>
        </ItemLi>
    );
}

export default ItemComponent;