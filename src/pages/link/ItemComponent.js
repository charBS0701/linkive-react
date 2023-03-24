import React from 'react';
import ItemMenuComponent from './ItemMenuComponent'

import FolderIcon from '../../contents/folder_icon.png'
import styles from "./ItemComponent.module.css"

function ItemComponent(props) {
    return(
        <li className={styles.li}>
            <img className={styles.mainImage} src={props.src} alt={props.alt} width={240} height={200}/>
            <div className={styles.upper}>
                <img className={styles.faviconImage} src={props.favicon} alt="Favicon" width={18} height={18}/>
                <span className={styles.title}>{props.title}</span>
                <ItemMenuComponent />
            </div>
            <div className={styles.lower}>
                <span className={styles.folderName}>{props.folder}</span>
                <img className={styles.folderIconImage} src={FolderIcon} alt="Folder Icon" width={10} height={10}/>
            </div>
        </li>
    );
}

export default ItemComponent;