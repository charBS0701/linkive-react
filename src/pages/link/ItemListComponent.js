import axios from "axios";
import { ItemComponent, FolderItemComponent } from "./ItemComponent";
import React, { useState, useEffect } from "react";

import { getTokens } from "../../utils/getTokens";

import TestFavicon from "../../contents/favicon_test.png";

import LinkiveLogo from "../../contents/logo_small.png";
import folder from "./folder/Folder";

function ItemListComponent(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        //setItems(null);
        const data = [];
        let target = "";



        switch(props.option) {
            case 0:
                axios.post('/api/memos', {}, {
                    headers: getTokens()
                }).then(res => {
                    if(!res.data.memoList) {
                        return;
                    }

                    let memoList = res.data.memoList;
                    if(props.sort == 0) {
                        memoList = memoList.sort((a, b) => {
                            return ((a.memo_num < b.memo_num) ? -1 : 1)
                        })
                    } else {
                        memoList = memoList.sort((a, b) => {
                            return ((a.title < b.title) ? -1 : 1)
                        })
                    }

                    for (let i = 0;i < memoList.length; i++) {
                        const current = memoList[i];

                        data.push(
                            <ItemComponent
                                key={i}
                                data={current}
                            />
                        );
                    }
                    setItems(data);
                }).catch(e => {

                });
                break;
            case 1:
                axios.post('/api/folders', {}, {
                    headers: getTokens()
                }).then(res => {
                    if(!res.data.folderList) {
                        return;
                    }

                    let folderList = res.data.folderList;
                    if(props.sort == 0) {
                        folderList = folderList.sort((a, b) => {
                            return ((a.folder_num < b.folder_num) ? -1 : 1);
                        })
                    } else {
                        folderList = folderList.sort((a, b) => {
                            return ((a.name < b.name) ? -1 : 1);
                        }) ;
                    }

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
                }).catch(e => {
                    
                });
                break;
        };
    }, [props.option, props.sort]);

    const Nothing = () => {
        return (
            {
                0: <span>메모가 없습니다.</span>,
                1: <span>폴더가 없습니다.</span>
            } [props.option]
        );
    }

    return (
        (items ? items : <Nothing/>)
    );
}

export default ItemListComponent;