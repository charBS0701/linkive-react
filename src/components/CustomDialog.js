import React from 'react'

import FavoriteIcon from "../contents/favorite_icon.png";
import styles from "./CustomDialog.module.css";
import {createPortal} from "react-dom";

function CustomDialog(props, ref) {
    const rootDialog = document.getElementById("dialog");

    const FolderElement = (props_folder) => {
        return(
            <span className={styles.folderName}>
                <img width={10} src={FavoriteIcon}/>
                <span className={styles.whiteText}>{props_folder.folderName}</span>
            </span>
        );
    }

    const closeModal = () => {
        ref.current.close();
    }

    const DialogComponent = React.memo(() => (
        <dialog className={styles.dialog} ref={ref}>
            <div className={styles.header}> {/* Header */}
                {props.folderName ? <FolderElement folderName={props.folderName}/> : null}
                <span className={styles.whiteText}>{props.title}</span>
            </div>
            <div>
                {props.desc}
            </div>
            <button onClick={closeModal}>Close</button>
        </dialog>
    ));

    return createPortal(<DialogComponent />, rootDialog);
}

export default React.forwardRef(CustomDialog);