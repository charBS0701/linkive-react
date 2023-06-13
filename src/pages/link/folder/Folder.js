import SearchComponent from "../SearchComponent";
import SelectComponent from "../SelectComponent";

import styles from './css/Folder.module.css';
import ItemListComponent from "./ItemListComponent";
import {useNavigate, useParams} from "react-router-dom";
import FolderListButton from "./FolderListButton";
import {useEffect, useMemo, useState} from "react";

import axios from "axios";
import {getTokens} from "../../../utils/getTokens";
import useCustomDialog from "../../../hooks/useCustomDialog";
import AddLinkComponent from "../AddLinkComponent";

function Folder() {
    const { num } = useParams();
    const [folderInfo, setFolderInfo] = useState({});
    const [memoList, setMemoList] = useState([]);
    const { setFolderName, input, alert } = useCustomDialog();

    const navigate = useNavigate();

    useEffect(() => {
        axios.post('/api/folders/info', {
            folder_num: num
        }, {
            headers: getTokens()
        }).then(async res => {
            let pw = '';
            if (res.data.folder_info.isLocked) {
                setFolderName(res.data.folder_info.name);
                const result = await input("잠긴 폴더입니다", [
                    {type: "password", placeholder: "비밀번호"}
                ]);
                pw = result[0];

                if(!pw) {
                    navigate(-1);
                    return;
                }
            };
            axios.post(`/api/memos/folders/${res.data.folder_info.folder_num}`, {
                password: pw
            }, {
                headers: getTokens()
            }).then(mRes => {
                if(mRes.status == 200) {
                    setMemoList(mRes.data.memoList);
                }
            }).catch(async e => {
                if (res.data.folder_info.isLocked && e.response.status == 401) {
                    await alert("오류", "잘못된 비밀번호입니다.");
                    navigate(-1);
                    return;
                }
            });
            setFolderInfo(res.data.folder_info);
        })
    }, [num])

    const holdData ={
        folder_num: num,
        name: folderInfo.name
    }

    const HeaderComponent = () => {
        return (
            <div className={styles.toolbar}>
                <SearchComponent />
                <AddLinkComponent hold={holdData}/>
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
              <ItemListComponent memoData={memoList} />
          </ul>
      </div>
    );
}

export default Folder;