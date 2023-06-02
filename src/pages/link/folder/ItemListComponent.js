import axios from "axios";
import { ItemComponent } from "./ItemComponent";
import React, { useState, useEffect } from "react";

import { getTokens } from "../../../utils/getTokens";

import TestFavicon from "../../../contents/favicon_test.png";

import LinkiveLogo from "../../../contents/logo_linkive.png";

function ItemListComponent(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const data = [];
        let target = "";
        axios.post(`/api/memos/folders/${props.folderNum}`, {}, {
            headers: getTokens()
        }).then(res => {
            for (let i = 0; i < res.data.memoList.length; i++) {
                const current = res.data.memoList[i];

                data.push(
                    <ItemComponent
                        src={(current.thumbnail ? current.thumbnail : LinkiveLogo)}
                        title={current.title}
                        favicon={TestFavicon}
                        folder={null}
                        linkNumber={i}
                        memoNum={current.memo_num}
                    />
                );
            }
            setItems(data);
        });
    }, [props.option])


    return items;
}

export default ItemListComponent;