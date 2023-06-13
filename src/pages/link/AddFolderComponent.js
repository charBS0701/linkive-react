import React from 'react';
import { useState } from 'react'

import styles from './css/AddFolderComponent.module.css';
import useCustomDialog from "../../hooks/useCustomDialog";
import axios from "axios";
import {getTokens} from "../../utils/getTokens";

function AddFolderComponent(props) {
    const [state, setState] = useState({
        folderName: '',
        password: '',
    })

    const [wrap, setWrap] = useState(false);
    const [clear, setClear] = useState(true);
    const {alert, input, setDescText} = useCustomDialog();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        if(e.target.name == "folderName") {
            setClear(e.target.value < 1);
        }
    }

    const AddFolderButton = () =>{
        return (
            <button className={styles.addFolderButton} onClick={() => {setWrap(true);}}>
                <span>폴더 추가</span>
                <span className={styles.buttonCircle}>+</span>
            </button>
        )
    }

    const addFolder = async () => {
        if(state.folderName.length < 1) {
            await alert("알림", "폴더명을 입력해주세요");
            return;
        }

        const payload = {
            name: state.folderName,
            thumbnail: null
        }

        if(state.password.length > 0) {
            const result = await input("비밀번호를 다시 입력해주세요.", [{type: "password", placeholder: "비밀번호 확인"}]);
            const confirmPw = result[0];

            if(!confirmPw) {
                return;
            }

            if(state.password != confirmPw) {
                await alert("알림", "비밀번호가 다릅니다.");
                return;
            }

            payload.password = state.password;
        }

        axios.post('/api/folders/create', payload, {headers:getTokens()}).then(async res => {
            if(res.status == 200) {
                await alert("알림", "폴더가 생성되었습니다.");
                window.location.reload();
            }
        }).catch(async e => {
            await alert("알림", "폴더 생성에 실패했습니다.");
        })
    }

    return (
        <>
            {wrap ?
                <span>
                <span className={styles.addForm}>
                    <div className={styles.fieldDiv}>
                        <label htmlFor={"folderName"} className={styles.label}>Folder</label>
                        <input type={"text"} name={"folderName"} className={styles.input} placeholder={"폴더명을 입력해주세요"}
                               value={state.folderName} onChange={handleChange}/>
                    </div>
                    <div className={styles.fieldDiv}>
                        <label htmlFor={"folderPassword"} className={styles.label}>Password</label>
                        <input type={"password"} name={"password"} className={styles.input} placeholder={"비밀번호를 입력해주세요"}
                               value={state.password} onChange={handleChange}/>
                    </div>
                </span>
                    {clear ? <span className={styles.buttonCircleDark} onClick={() => setWrap(false)}>x</span> :
                        <span className={styles.buttonCircleDark} onClick={() => addFolder()}>+</span>}
                </span>
                :
                <AddFolderButton />
            }
        </>
    )
}

export default AddFolderComponent;