import React, {useState} from 'react';

import FolderIcon from '../../contents/folder_icon.png'

import styles from "./css/ItemComponent.module.css"
import menuStyles from "./css/ItemMenuComponent.module.css"

import MenuButton from "../../contents/menu_button.png";
import ClickAwayListener from "react-click-away-listener";

import useCustomDialog from "../../hooks/useCustomDialog";

function ItemComponent(props) {
    const [popup, setPopup] = useState(false);
    const { confirm, input, setFolderName } = useCustomDialog();

    const openPopup = () => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false);
    }

    const changePassword = async() => {
        setPopup(false);
        setFolderName(props.folder);

        const result = await input("비밀번호 변경",
            [{type: "password", placeholder: "현재 비밀번호"}, {hr: true},
                {type: "password", placeholder: "변경할 비밀번호"}, {type: "password", placeholder: "비밀번호 확인"}]);

        if(result) {
            console.log(result);
        }
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
                    <button className={menuStyles.menuItem} onClick={changePassword}>비밀번호 설정/변경</button>
                    <hr className={menuStyles.noMargin} />
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