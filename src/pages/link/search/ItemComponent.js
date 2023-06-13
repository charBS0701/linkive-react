import React from "react";

import styles from "./css/ItemComponent.module.css";
import FolderIcon from "../../../contents/folder_icon.png";
import LinkiveLogo from "../../../contents/logo_small.png"
import Favicon from "../../../contents/favicon_test.png"
import {useNavigate} from "react-router-dom";

function ItemComponent(props) {
    const navigate = useNavigate();

    const MAX_CONTENTS = 25;

    const onClickHandler = () => {
        navigate(`/viewlink/${props.data.memo_num}`);
    }

    const Title = () => {
        const text = props.data.title;

        if(props.match == 1) {
            const matchIndex = text.indexOf(props.keyword);
            const before = text.slice(0, matchIndex);
            const matches = text.slice(matchIndex, matchIndex + props.keyword.length);
            const after = text.slice(matchIndex + props.keyword.length);

            return (
                <>
                    {before && <span className={styles.title}>{before}</span>}
                    <span className={styles.matchTitle}>{matches}</span>
                    {after && <span className={styles.title}>{after}</span>}
                </>
            )
        }

        return <span className={styles.title}>{text}</span>
    }

    const Content = () => {
        const coms = props.data.content.arr;
        let text = ''

        for(let i = 0;i < coms.length;i++) {
            if(coms[i].type == "text") {
                text = coms[i].value;
                break;
            }
        }

        if(props.match == 2) {
            const matchIndex = text.indexOf(props.keyword);

            let sp = 0, ep = text.length;
            if(text.length > MAX_CONTENTS) {
                const halfPoint = (matchIndex * 2 + props.keyword.length) / 2;
                const gap = (MAX_CONTENTS - props.keyword.length) / 2

                sp = halfPoint - gap;
                ep = halfPoint + gap;

                if(sp < 0) {
                    ep = Math.max(ep + ((-1) * sp), gap);
                }
                if(ep > text.length) {
                    sp = Math.min(sp - (ep - text.length), halfPoint - gap);
                }
            }

            const before = text.slice(sp, matchIndex);
            const matches = text.slice(matchIndex, matchIndex + props.keyword.length);
            const after = text.slice(matchIndex + props.keyword.length, ep);

            return (
                <>
                    {before && <span className={styles.bodyText}>{sp > 0 && '...'}{before}</span>}
                    <span className={styles.matchText}>{matches}</span>
                    {after && <span className={styles.bodyText}>{after}{ep < text.length && '...'}</span>}
                </>
            )
        }

        return <span className={styles.title}>{text}</span>
    }

    const Folder = () => {
        const text = props.data.folder_name;

        if(props.match == 3) {
            const matchIndex = text.indexOf(props.keyword);
            const before = text.slice(0, matchIndex);
            const matches = text.slice(matchIndex, matchIndex + props.keyword.length);
            const after = text.slice(matchIndex + props.keyword.length);

            return (
                <>
                    {before && <span className={styles.folderName}>{before}</span>}
                    <span className={styles.matchFolderName}>{matches}</span>
                    {after && <span className={styles.folderName}>{after}</span>}
                </>
            )
        }

        return <span className={styles.folderName}>{text}</span>
    }

    return (
        <li className={styles.li} value={props.key}>
            <img className={styles.mainImage}
                 src={(props.data.content.thumbnail) ? props.data.content.thumbnail : LinkiveLogo}
                 alt={props.alt} width={240} height={200}
                onClick={onClickHandler}/>
            <div className={styles.info}>
                <span className={styles.infoItem}>
                    <img className={styles.faviconImage} src={Favicon} alt="Favicon" width={25} height={25}/>
                    <Title />
                </span>
                <span className={styles.infoItem}>
                    <Folder />
                    <img className={styles.folderIconImage} src={FolderIcon} alt="Folder Icon" width={10} height={10}/>
                </span>
            </div>
            {props.match == 2 ?
                <div className={styles.matchDiv}>
                    <Content />
                </div>
                : null}
        </li>
    )
}

export default ItemComponent;