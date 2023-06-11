import SearchComponent from "../SearchComponent";
import SelectComponent from "../SelectComponent";

import styles from './css/Folder.module.css';
import ItemListComponent from "./ItemListComponent";
import {useParams} from "react-router-dom";
import FolderListButton from "./FolderListButton";
import {useEffect, useState} from "react";

import axios from "axios";
import {getTokens} from "../../../utils/getTokens";

function Folder() {
    const { num } = useParams();
    const [folderInfo, setFolderInfo] = useState();

    useEffect(() => {
        axios.post('/api/folders/info', {
            folder_num: num
        }, {
            headers: getTokens()
        }).then(res => {
            setFolderInfo(res.data.folder_info);
        })
    }, [])

    const HeaderComponent = () => {
        return (
            <div>
                <SearchComponent />
                <span>
                    글 작성하기
                </span>
            </div>
        );
    };

    return (
      <div>
          <HeaderComponent />
          <div className={styles.toolbar}>
              <FolderListButton folderName={folderInfo?.name}/>
              <SelectComponent />
          </div>
          <ul>
            <ItemListComponent folderNum={num}/>
          </ul>
      </div>
    );
}

export default Folder;