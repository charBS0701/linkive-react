import {useEffect, useMemo, useState} from 'react';

import SearchComponent from "../SearchComponent";
import OptionsComponent from "../../../components/OptionsComponent";

import styles from './css/Search.module.css'
import ItemComponent from "./ItemComponent";
import TestFavicon from "../../../contents/favicon_test.png";
import MultiClassName from "../../../utils/MultiClassName";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {getTokens} from "../../../utils/getTokens";

function Search(props) {
    const [optionIdx, setOptionIdx] = useState(0);
    const buttonsData = ["전체", "제목", "본문", "폴더명", "위치"];

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');

    const [searchData, setSearchData] = useState(null);


    useMemo(() => {
        if(keyword.length < 1) {
            return;
        }
        axios.post('/api/search', {
            keyword: keyword,
            method: null
        }, {headers:getTokens()}).then(res => {
            if(res.status == 200) {
                 setSearchData(res.data.searchResult);
            }
        })
    }, [keyword]);

    const ItemListComponent = () => {
        let data = [];
        let target = [];

        switch(optionIdx) {
            case 0:
                target = target.concat(searchData.title, searchData.content, searchData.folder, searchData.place);
                target = target.reduce(function(acc, current) {
                    if (acc.findIndex((obj) => obj.memo_num === current.memo_num) === -1) {
                        acc.push(current);
                    }
                    return acc;
                }, []);
                break;
            case 1:
                target = searchData.title.slice();
                break;
            case 2:
                target = searchData.content.slice();
                break;
            case 3:
                target = searchData.folder.slice();
                break;
            case 4:
                target = searchData.place.slice();
                break;
        }

        for(let i = 0;i < target.length;i++) {
            data.push(
                <ItemComponent key={i} data={target[i]} match={optionIdx} keyword={keyword}/>
            )
        }

        return data;
    }


    const onChangeOptions =  (idx) => {
        setOptionIdx(idx);
    }

    return (
        <div>
            <div className={styles.onlyMargin}>
                <SearchComponent default={keyword}/>
            </div>
            <div className={MultiClassName([styles.onlyMargin, styles.options])}>
                <OptionsComponent data={buttonsData} default={optionIdx} onChange={onChangeOptions}/>
            </div>
            <ul>
                {searchData && <ItemListComponent />}
            </ul>
        </div>
    )
}

export default Search