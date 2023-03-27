import {useRef, memo, useEffect, useContext} from 'react'

import FavoriteIcon from "../contents/favorite_icon.png";
import styles from "./CustomDialog.module.css";
import { createPortal } from "react-dom";

import useCustomDialog from "../hooks/useCustomDialog";
import { DialogDispatch } from "../App";

function CustomDialog() {
    const rootDialog = document.getElementById("dialog");
    const dialogRef = useRef(null); // showModal 호출용 Ref

    const { state } = useContext(DialogDispatch);
    const { onCloseDialog } = useCustomDialog();

    useEffect(() => {
       if(state.show) {
           dialogRef.current.showModal();
       } else if(state.show) {
           dialogRef.current.close();
       }
    }, [state.show]);

    const onConfirmClick = () => {
        onCloseDialog(true);
    }

    const onCancelClick = () => {
        onCloseDialog(false);
    }

    const FolderElement = () => {
        return(
            <span className={styles.folderName}>
                <img width={10} src={FavoriteIcon} alt={"Favorite Icon"} className={styles.folderIcon}/>
                <span className={styles.folderNameText}>{state.folderName}</span>
            </span>
        );
    }

    const YesNoButtonComponent = (props) => {
        return (
            <div className={styles.buttonDiv}>
                <button className={[styles.buttons, styles.white].join(' ')} onClick={onCancelClick}>
                    {state.buttonText[0]}
                </button>
                <button className={[styles.buttons, styles.mainColor].join(' ')} onClick={onConfirmClick}>
                    {state.buttonText[1]}
                </button>
            </div>
        );
    }

    const DialogComponent = memo(() => (
        <dialog className={styles.dialog} ref={dialogRef}>
            <div className={styles.innerDialog}>
                <div className={styles.header}> {/* Header */}
                    {state.folderName ? <FolderElement /> : null}
                    <span className={styles.title}>{state.title}</span>
                </div>

                <div className={styles.descDiv}>
                    <span className={styles.descText}>{state.desc}</span>
                </div>

                {state.dtype === "Confirm" ?
                    <YesNoButtonComponent/> :
                    <div className={styles.buttonDiv}>
                        <button className={styles.buttons} onClick={onConfirmClick}>{state.buttonText[0]}</button>
                    </div>
                }
            </div>
        </dialog>
    ));

    return createPortal(<DialogComponent />, rootDialog);
}

export default CustomDialog;