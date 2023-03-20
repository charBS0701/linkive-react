import React from 'react';
import ItemMenuComponent from './ItemMenuComponent'
import styled from "styled-components";

function ItemComponent(props) {
    const InlineDiv = styled.div`
      display: inline;
      width: fit-content;
    `;

    return(
        <InlineDiv>
            <img src={props.src} alt={props.alt} width="300" height="300"/>
            <div>
                <img src={props.favicon} alt="Favicon"/>
                <span>Title</span>
                <ItemMenuComponent />
            </div>
        </InlineDiv>
    );
}

export default ItemComponent;