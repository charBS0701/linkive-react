import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

import MenuButton from '../../contents/menu_button.png'

import styles from './ItemMenuComponent.module.css'

function ItemMenuComponent() {
    const [popup, setPopup] = useState(false);
    const openPopup = () => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false);
    }

    return (
        <div className={styles.root}>
            <img className={styles.openMenu} src={MenuButton} onClick={openPopup} width={4}></img>
            {popup && (<ClickAwayListener onClickAway={closePopup}>
                <div className={[styles.menuBox, 'popup'].join(' ')}>
                    <button className={styles.menuItem} onClick={() => console.log("delete")}>삭제하기&nbsp;&nbsp;</button>
                    <hr className={styles.noMargin} />
                    <button className={styles.menuItem} onClick={() => console.log("edit")}>수정하기&nbsp;&nbsp;</button>
                </div>
            </ClickAwayListener>)}
        </div>
    );
}

export default ItemMenuComponent;