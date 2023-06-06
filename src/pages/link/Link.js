import React, { memo, useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import SearchComponent from "./SearchComponent";
import OptionsComponent from "../../components/OptionsComponent";
import AddFolderComponent from "./AddFolderComponent";
import SelectComponent from './SelectComponent';
import ItemListComponent from "./ItemListComponent";

import MultiClassName from "../../utils/MultiClassName";

import styles from "./css/Link.module.css";

import Search from './search/Search';
import Folder from "./folder/Folder";
import BtnAddLink from "../home/BtnAddLink";

function LinkComponent() {
    const [wrap, setWrap] = useState(false);
    const [optionIdx, setOptionIdx] = useState(0);

    const buttonsData = ["링크별", "폴더별"];
    const optionsOnChange = (idx) => {
        setOptionIdx(idx);
    }

    const AddFolderButtonComponent = (p) =>{
        return (
            <button className={styles.addFolderButton} onClick={p.onClick}>
                <span>폴더 추가</span>
                <span className={styles.buttonCircle}>+</span>
            </button>
        )
    }

    const HeaderComponent = () => {
        return (
            <div className={MultiClassName([styles.onlyMargin, styles.toolbar])}>
                <SearchComponent />
                <BtnAddLink />
            </div>
        );
    };

    //{wrap ? <AddFolderComponent state={{wrap, setWrap}}/> : <AddFolderButtonComponent onClick={() => setWrap(true)}/>}

    return (
        <div>
            <HeaderComponent />
            <div className={MultiClassName([styles.onlyMargin, styles.buttonsLine])}>
                    <span>
                        <OptionsComponent data={buttonsData} default={0} onChange={optionsOnChange}/>
                    </span>
                <SelectComponent />
            </div>
            <ul>
                <ItemListComponent option={optionIdx} />
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
