import React from 'react';

import { useState } from 'react';

import SearchComponent from "../SearchComponent";
import OptionsComponent from "../../../components/OptionsComponent";

import styles from './css/Search.module.css'
import ItemComponent from "./ItemComponent";
import TestFavicon from "../../../contents/favicon_test.png";
import MultiClassName from "../../../utils/MultiClassName";

function Search(props) {
    const [match, setMatch] = useState(false);
    const buttonsData = ["전체", "제목", "본문", "폴더명", "장소"]

    const onChangeOptions =  (idx) => {
        console.log(idx);

        if(idx === 2) {
            setMatch(true);
        } else {
            setMatch(false);
        }
    }

    return (
        <div>
            <div className={styles.onlyMargin}>
                <SearchComponent />
            </div>
            <div className={MultiClassName([styles.onlyMargin, styles.options])}>
                <OptionsComponent data={buttonsData} default={0} onChange={onChangeOptions}/>
            </div>
            <ul>
                <ItemComponent
                    src={"/images/img.png"}
                    title={"롯데월드"}
                    favicon={TestFavicon}
                    folder={"놀이공원"}
                    linkNumber={0}
                    match={match}/>
            </ul>
        </div>
    )
}

export default Search