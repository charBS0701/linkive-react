import axios from "axios";
import { ItemComponent, FolderItemComponent } from "./ItemComponent";
import React, { useState, useEffect } from "react";

import { getTokens } from "../../utils/getTokens";

import TestFavicon from "../../contents/favicon_test.png";

import LinkiveLogo from "../../contents/logo_small.png";

function ItemListComponent(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const data = [];
        let target = "";

        switch(props.option) {
            case 0:
                axios.post('/api/memos', {}, {
                    headers: getTokens()
                }).then(res => {
                    for (let i = 0; i < res.data.memoList.length; i++) {
                        const current = res.data.memoList[i];

                        data.push(
                            <ItemComponent
                                key={i}
                                data={current}
                            />
                        );
                    }
                    setItems(data);
                });
                break;
            case 1:
                axios.post('/api/folders', {}, {
                    headers: getTokens()
                }).then(res => {
                    for (let i = 0; i < res.data.folderList.length; i++) {
                        const current = res.data.folderList[i];

                        data.push(
                            <FolderItemComponent
                                key={i}
                                data={current}
                            />
                        );
                    }
                    setItems(data);
                });
                break;
        };
    }, [props.option])


    return items;
}

export default ItemListComponent;