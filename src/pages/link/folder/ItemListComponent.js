import axios from "axios";
import { ItemComponent } from "../ItemComponent";
import React, { useState, useEffect } from "react";

import { getTokens } from "../../../utils/getTokens";

import useCustomDialog from "../../../hooks/useCustomDialog";

function ItemListComponent(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if(!props.memoData) {
            return;
        }

        const data = [];
        let memoList = props.memoData;

        if(props.sort == 0) {
            memoList = memoList.sort((a, b) => {
                return ((a.memo_num < b.memo_num) ? -1 : 1)
            })
        } else {
            memoList = memoList.sort((a, b) => {
                return ((a.title < b.title) ? -1 : 1)
            })
        }

        for (let i = 0; i < memoList.length; i++) {;
            const current = memoList[i];
            data.push(
                <ItemComponent
                    key={i}
                    data={current}
                    inFolder={true}
                />
            );
        }
        setItems(data);
    }, [props.memoData])


    return items;
}

export default ItemListComponent;