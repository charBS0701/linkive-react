import React, {useEffect, useMemo} from 'react';
import { useState } from 'react'

import styles from './css/AddLinkComponent.module.css';
import SelectComponent from "./SelectComponent";
import axios from "axios";
import {getTokens} from "../../utils/getTokens";

function AddLinkComponent(props) {
    const [wrap, setWrap] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [clear, setClear] = useState(true);

    const [selectValue, setSelectValue] = useState(0);

    const [folderList, setFolderList] = useState([]);

    const noneFolder = ['폴더미지정'];

    useMemo(() => {
        if(props.hold) {
            return;
        }
        axios.post('/api/folders', {}, {headers:getTokens()}).then(res => {
            if(res.status == 200) {
                setFolderList(res.data.folderList);
            }
        });
    }, []);

    const selectOnChange = (e) => {
        setSelectValue(e.target.value);
    }

    const onChangeListener = (e) => {
        setFolderName(e.target.value);
        setClear(e.target.value < 1);
    }

    const AddFolderButton = () =>{
        return (
            <button className={styles.addFolderButton} onClick={() => {setWrap(true);}}>
                <span>링크 추가</span>
                <span className={styles.buttonCircle}>+</span>
            </button>
        )
    }

    let options = {};
    folderList.forEach((v, k) => {
        options[v.folder_num] = v.name;
    });

    options[0] = "폴더 미지정";

    return (
        <>
            {wrap ?
                <span>
                    <span className={styles.addForm}>
                        <div className={styles.fieldDiv}>
                            <label htmlFor={"folderName"} className={styles.label}>Link</label>
                            <input type={"text"} name={"folderName"} className={styles.input} placeholder={"링크를 입력해주세요"}
                                   value={folderName} onChange={onChangeListener}/>
                        </div>
                        <div className={styles.fieldDiv}>
                            <label className={styles.label}>폴더</label>
                            {props.hold ?
                                <span className={styles.input}>{props.hold.name}</span>:
                                <SelectComponent value={selectValue} onChange={selectOnChange} styles={styles.selectDiv} selectStyles={styles.select} options={options} />
                            }
                        </div>
                    </span>
                        {clear ? <span className={styles.buttonCircleDark} onClick={() => setWrap(false)}>+</span> :
                            <span className={styles.buttonCircleDark}>+</span>}
                </span>
                :
                <AddFolderButton />}
        </>
    )
}

export default AddLinkComponent;