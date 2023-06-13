import React, {useEffect, useState} from 'react';

import FolderIcon from '../../contents/folder_icon.png'

import styles from "./css/ItemComponent.module.css"
import menuStyles from "./css/ItemMenuComponent.module.css"

import MenuButton from "../../contents/menu_button.png";
import ClickAwayListener from "react-click-away-listener";

import LinkiveLogo from "../../contents/logo_small.png";
import Insta from '../../contents/favicon_test.png'

import useCustomDialog from "../../hooks/useCustomDialog";
import axios from "axios";
import {getTokens} from "../../utils/getTokens";

import {useNavigate} from "react-router-dom";

export function ItemComponent(props) {
    const [popup, setPopup] = useState(false);
    const { confirm, input, alert, setFolderName } = useCustomDialog();

    const navigate = useNavigate();

    const openPopup = () => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false);
    }

    const deleteLink = async() => {
        setPopup(false);

        setFolderName(props.data.folder_name);
        const result = await confirm("삭제하기", "링크를 삭제하면 복구가 불가능합니다.\n삭제하시겠습니까?");

        if(!result) {
            return;
        }

        axios.post( '/api/memos/delete', {
            memo_num: props.data.memo_num
        }, {headers: getTokens()}).then(async result => {
            if (result.status == 200) {
                const msg = await alert("삭제", "삭제되었습니다.");
            }
        });
    }

    const editLink = () => {
        setPopup(false);
    }


    const ItemMenuComponent = () => (
        <div className={menuStyles.root}>
            <img className={menuStyles.openMenu} src={MenuButton} onClick={openPopup} width={4}></img>
            {popup && (<ClickAwayListener onClickAway={closePopup}>
                <div className={[menuStyles.memoMenuBox, 'popup'].join(' ')}>
                    <button className={menuStyles.menuItem} onClick={deleteLink}>삭제하기&nbsp;&nbsp;</button>
                    <hr className={menuStyles.noMargin} />
                    <button className={menuStyles.menuItem} onClick={editLink}>수정하기&nbsp;&nbsp;</button>
                </div>
            </ClickAwayListener>)}
        </div>
    );

    return(
        <li className={styles.li} value={props.key}>
            {(props.data.content.thumbnail ? <img className={styles.mainImage}
                                            src={props.data.content.thumbnail}
                                            width={240} height={200}
                                            onClick={() => navigate(`/viewlink/${props.data.memo_num}`)}/> :
            <img src={LinkiveLogo} width={240} height={200} onClick={() => navigate(`/viewlink/${props.data.memo_num}`)} />
            )}
            <div className={styles.upper}>
                <img className={styles.faviconImage} src={Insta} alt="Favicon" width={18} height={18}/>
                <span className={styles.title} onClick={() => navigate(`/viewlink/${props.data.memo_num}`)}>{props.data.title}</span>
                <ItemMenuComponent />
            </div>
            {
                <div className={styles.lower} style={(props.inFolder) && {visibility: "hidden"}}>
                    <span className={styles.folderName}>{props.data.folder_name}</span>
                    <img className={styles.folderIconImage} src={FolderIcon} alt="Folder Icon" width={10} height={10}/>
                </div>
            }
        </li>
    );
}

export function FolderItemComponent(props) {
    const [popup, setPopup] = useState(false);
    const { confirm, input, editFolder, setFolderName, alert } = useCustomDialog();

    const navigate = useNavigate();

    const openPopup = () => {
        setPopup(true);
    }

    const closePopup = () => {
        setPopup(false);
    }

    const changePassword = async() => {
        const title = "비밀번호 변경";

        setPopup(false);
        setFolderName(props.data.name);

        const result = await input(title,
            [{type: "password", placeholder: "현재 비밀번호"}, {hr: true},
                {type: "password", placeholder: "변경할 비밀번호"}, {type: "password", placeholder: "비밀번호 확인"}]);

        if(!result) {
            return;
        }

        const prev = result[0];
        const pw = result[2];
        const confpw = result[3];

        setFolderName(props.data.name);
        if(!prev || !pw || !confpw) {
            await alert(title, "현재 비밀번호, 비밀번호, 비밀번호 확인을 모두 입력해주세요.");
            return;
        }

        if(pw != confpw) {
            await alert(title, "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        const payload = {
            ...props.data,
        };
        delete payload.isLocked;
        delete payload.memoCount;
        delete payload.users_num;

        payload.password = pw;
        payload.prev_password = prev;

        axios.post('/api/folders/edit', payload, {
            headers: getTokens()
        }).then(async res => {
            const code = res.status;

            if(code == 200) {
                await alert(title, "비밀번호가 변경되었습니다.");
                return;
            }
        }).catch(async e => {
            if(e.response.status == 401) {
                await alert(title, "현재 비밀번호가 일치하지 않습니다.");
                return;
            }
        })
    }

    const addPassword = async() => {
        const title = "비밀번호 설정";

        setPopup(false);
        setFolderName(props.data.name);

        const result = await input(title, [{type: "password", placeholder: "설정할 비밀번호"}, {type: "password", placeholder: "비밀번호 확인"}])

        const pw = result[0];
        const confpw = result[1];

        setFolderName(props.data.name);
        if(!pw || !confpw) {
            await alert(title, "비밀번호와 비밀번호 확인을 입력해주세요.");
            return;
        }

        if(pw != confpw) {
            await alert(title, "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        const payload = {
            ...props.data,
        };
        delete payload.isLocked;
        delete payload.memoCount;
        delete payload.users_num;

        payload.password = pw;

        axios.post('/api/folders/edit', payload, {
            headers: getTokens()
        }).then(async res => {
            if(res.status == 200) {
                await alert("비밀번호 설정", "비밀번호를 설정했습니다.");
            }
        })
    }


    const deleteLink = async() => {
        setPopup(false);

        setFolderName(props.data.name);
        const result = await confirm("삭제하기", "폴더를 삭제하면 폴더에 포함된 글도 같이 삭제됩니다.\n폴더를 삭제하시겠습니까?");

        if(result) {
            console.log(`Deleted ${props.key}`);
        } else {
            console.log(`Canceled`);
        }
    }

    const editLink = async () => {
        setPopup(false);

        setFolderName(props.data.name);
        const result = await editFolder(props.data.name, props.data);

        if(!result) {
            return;
        }

        const payload = props.data;

        if(props.data.isLocked) {
            const pwres = await input("비밀번호가 필요합니다", [{type: "password", placeholder: "비밀번호"}]);

            if(!pwres) {
                return;
            }
        }

        payload.thumbnail = result.thumbnail;

        axios.post('/api/folders/edit', payload, {
            headers: getTokens()
        }).then(async res => {
            if(res.status == 200) {
                await alert("수정되었습니다.");
                window.location.reload();
                return;
            }
        }).catch(e => {

        })
    }


    const ItemMenuComponent = () => (
        <div className={menuStyles.root}>
            <img className={menuStyles.openMenu} src={MenuButton} onClick={openPopup} width={4}></img>
            {popup && (<ClickAwayListener onClickAway={closePopup}>
                <div className={[menuStyles.menuBox, 'popup'].join(' ')}>
                    {props.data.isLocked ? <button className={menuStyles.menuItem} onClick={changePassword}>비밀번호 변경</button> :
                        <button className={menuStyles.menuItem} onClick={addPassword}>비밀번호 설정</button>}
                    <hr className={menuStyles.noMargin} />
                    <button className={menuStyles.menuItem} onClick={deleteLink}>삭제하기&nbsp;&nbsp;</button>
                    <hr className={menuStyles.noMargin} />
                    <button className={menuStyles.menuItem} onClick={editLink}>수정하기&nbsp;&nbsp;</button>
                </div>
            </ClickAwayListener>)}
        </div>
    );

    const bottomMargin = {marginBottom: "20px"};

    let thumbnail = LinkiveLogo;
    if(props.data.thumbnail) {
        const thumbObject = JSON.parse(props.data.thumbnail);
        thumbnail = thumbObject.path;
    }

    return(
        <li className={styles.li} value={props.key} >
            <img className={styles.mainImage}
                 src={thumbnail}
                 width={240} height={200}
                 onClick={() => navigate(`/link/folder/${props.data.folder_num}`)}/>
            <div className={styles.upper} style={bottomMargin}>
                <img className={styles.faviconImage} src={FolderIcon} alt="Favicon" width={18} height={18}/>
                <span className={styles.title} onClick={() => navigate(`/link/folder/${props.data.folder_num}`)}>{props.data.name}</span>
                <ItemMenuComponent />
            </div>
        </li>
    );
}

export default ItemComponent;