import React, {useState} from 'react';

import FolderIcon from '../../contents/folder_icon.png'

import styles from "./css/ItemComponent.module.css"
import menuStyles from "./css/ItemMenuComponent.module.css"

import MenuButton from "../../contents/menu_button.png";
import ClickAwayListener from "react-click-away-listener";

import useCustomDialog from "../../hooks/useCustomDialog";

function ItemComponent(props) {
    const [popup, setPopup] = useState(false);
    const { confirm, setFolderName } = useCustomDialog();

    const openPopup = () => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false);
    }

    const deleteLink = async() => {
        setPopup(false);

        setFolderName(props.folder);
        const result = await confirm("삭제하기", "폴더를 삭제하면 폴더에 포함된 글도 같이 삭제됩니다.\n폴더를 삭제하시겠습니까?");

        if(result) {
            console.log(`Deleted ${props.linkNumber}`);
        } else {
            console.log(`Canceled`);
        }
    }

    const editLink = () => {
        setPopup(false);
    }


    const ItemMenuComponent = () => (
        <div className={menuStyles.root}>
            <img className={menuStyles.openMenu} src={MenuButton} onClick={openPopup} width={4}></img>
            {popup && (<ClickAwayListener onClickAway={closePopup}>
                <div className={[menuStyles.menuBox, 'popup'].join(' ')}>
                    <button className={menuStyles.menuItem} onClick={deleteLink}>삭제하기&nbsp;&nbsp;</button>
                    <hr className={menuStyles.noMargin} />
                    <button className={menuStyles.menuItem} onClick={editLink}>수정하기&nbsp;&nbsp;</button>
                </div>
            </ClickAwayListener>)}
        </div>
    );

    return(
        <li className={styles.li} value={props.key}>
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