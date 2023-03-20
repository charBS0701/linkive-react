import React from 'react';
import ItemComponent from './ItemComponent'
import TestFavicon from '../../contents/favicon_test.png'

function Link() {
    const itemList = (count) => {
        let data = [];

        for(let i = 0;i < count;i++) {
            data.push(<ItemComponent src="/images/img.png" title="롯데월드" favicon={TestFavicon} folder={"놀이공원"}/>);
        }
        return data;
    }

    return (
        <div>
            <header>
                HEADER SPACE
            </header>
            <ul>
                {itemList(8)}
            </ul>
        </div>
    );
}

export default Link;