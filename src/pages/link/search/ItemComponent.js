import React from "react";

import styles from "./css/ItemComponent.module.css";
import FolderIcon from "../../../contents/folder_icon.png";

function ItemComponent(props) {
    return (
        <li className={styles.li} value={props.key}>
            <img className={styles.mainImage} src={props.src} alt={props.alt} width={240} height={200}/>
            <div className={styles.info}>
                <span className={styles.infoItem}>
                    <img className={styles.faviconImage} src={props.favicon} alt="Favicon" width={25} height={25}/>
                    <span className={styles.title}>{props.title}</span>
                </span>
                <span className={styles.infoItem}>
                    <span className={styles.folderName}>{props.folder}</span>
                    <img className={styles.folderIconImage} src={FolderIcon} alt="Folder Icon" width={10} height={10}/>
                </span>
            </div>
            {props.match ?
                <div className={styles.matchDiv}>
                    <span className={styles.bodyText}>테스트입니다.</span>
                    <span className={styles.matchText}>이게 매칭</span>
                </div>
                : null}
        </li>
    )
}

export default ItemComponent;