import React, { memo, useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import SearchComponent from "./SearchComponent";
import OptionsComponent from "../../components/OptionsComponent";
import SelectComponent from './SelectComponent';
import ItemListComponent from "./ItemListComponent";

import MultiClassName from "../../utils/MultiClassName";

import styles from "./css/Link.module.css";

import Search from './search/Search';
import Folder from "./folder/Folder";
import AddLinkComponent from "./AddLinkComponent";
import AddFolderComponent from "./AddFolderComponent";

function LinkComponent() {
    const [optionIdx, setOptionIdx] = useState(0);
    const [selectValue, setSelectValue] = useState(0);

    const buttonsData = ["링크별", "폴더별"];
    const optionsOnChange = (idx) => {
        setOptionIdx(idx);
    }

    const selectOnChange = (e) => {
        setSelectValue(e.target.value);
    }

    const HeaderComponent = () => {
        return (
            <div className={MultiClassName([styles.onlyMargin, styles.toolbar])}>
                <SearchComponent />
                {
                    {
                    0: <AddLinkComponent/>,
                    1: <AddFolderComponent/>
                    } [optionIdx]
                }
            </div>
        );
    };

    const options = Object.assign({}, ["생성순", "이름순"]);

    return (
        <div>
            <HeaderComponent />
            <div className={MultiClassName([styles.onlyMargin, styles.buttonsLine])}>
                    <span>
                        <OptionsComponent data={buttonsData} default={0} onChange={optionsOnChange}/>
                    </span>
                <SelectComponent value={selectValue} onChange={selectOnChange} styles={styles.selectDiv} options={options}/>
            </div>
            <ul>
                <ItemListComponent option={optionIdx} sort={selectValue}/>
            </ul>
        </div>
    );
}



function Link() {
    return (
        <Routes>
            <Route path={'search'} element={<Search/>}/>
            <Route path={'folder/:num'} element={<Folder/>}/>
            <Route path={''} element={<LinkComponent />}/>
        </Routes>
    );
};

export default memo(Link);
