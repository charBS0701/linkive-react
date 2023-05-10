import { useRef, useState, memo, useCallback } from 'react'

import styles from './css/AddFolderComponent.module.css'

function AddFolderComponent(props) {
    const { wrap, setWrap } = props.state;

    const [folderName, setFolderName] = useState('');
    const [clear, setClear] = useState(true);

    const onChangeListener = (e) => {
        setFolderName(e.target.value);
        setClear(e.target.value < 1);
    }

    return (
        <span>
        <span className={styles.addForm}>
            <div className={styles.fieldDiv}>
                <label htmlFor={"folderName"} className={styles.label}>Folder</label>
                <input type={"text"} name={"folderName"} className={styles.input} placeholder={"폴더명을 입력해주세요"}
                       value={folderName} onChange={onChangeListener}/>
            </div>
            <div className={styles.fieldDiv}>
                <label htmlFor={"folderPassword"} className={styles.label}>Password</label>
                <input type={"password"} namer={"folderPassword"} className={styles.input} placeholder={"비밀번호를 입력해주세요"} />
            </div>
        </span>
            {clear ? <span className={styles.button} onClick={() => setWrap(false)}>X</span> : <span className={styles.button}>+</span>}
        </span>
    )
}

export default AddFolderComponent;