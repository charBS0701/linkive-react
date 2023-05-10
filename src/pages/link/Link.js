import {memo, useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import ItemComponent from './ItemComponent'
import TestFavicon from '../../contents/favicon_test.png'
import SearchComponent from "./SearchComponent";
import OptionsComponent from "../../components/OptionsComponent";
import AddFolderComponent from "./AddFolderComponent";
import SelectComponent from './SelectComponent';

import MultiClassName from "../../utils/MultiClassName";

import styles from "./css/Link.module.css";

import Search from './search/Search';
import Folder from "./folder/Folder";

function LinkComponent() {
    const [wrap, setWrap] = useState(false);

    const itemList = (count) => {
        let data = [];

        for (let i = 0; i < count; i++) {
            data.push(
                <ItemComponent
                    src={"/images/img.png"}
                    title={"롯데월드"}
                    favicon={TestFavicon}
                    folder={"놀이공원"}
                    linkNumber={i}
                />
            );
        }
        return data;
    };

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
                {wrap ? <AddFolderComponent state={{wrap, setWrap}}/> : <AddFolderButtonComponent onClick={() => setWrap(true)}/>}
            </div>
        );
    };

    const buttonsData = ["링크별", "폴더별"];
    const optionsOnChange = (idx) => {
        console.log(idx);
    }

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
                {itemList(8)}
            </ul>
        </div>
    );
}



function Link() {
    return (
        <Routes>
            <Route path={'search'} element={<Search />}/>
            <Route path={'folder'} element={<Folder />}/>
            <Route path={''} element={<LinkComponent />}/>
        </Routes>
    );
};

export default memo(Link);
