import React from 'react';
// Libs
import {useRef, memo, useEffect, useContext, useState} from 'react'
import { createPortal } from "react-dom";

// Icons & Stylesheet
import FavoriteIcon from "../contents/favorite_icon.png";
import styles from "./CustomDialog.module.css";
import EyeIcon from "../contents/eye_icon.png";
import HiddenIcon from "../contents/hidden_icon.png";
import CheckIcon from "../contents/check_img.png";

import LinkiveLogo from "../contents/logo_linkive.png";

// Functions
import useCustomDialog from "../hooks/useCustomDialog";
import { DialogDispatch } from "../App";
import MultiClassName from "../utils/MultiClassName";

function CustomDialog() {
    const rootDialog = document.getElementById("dialog");
    const dialogRef = useRef(null); // showModal 호출용 Ref

    // Store
    const { state } = useContext(DialogDispatch);

    // Close Dialog Handling
    const { onCloseDialog } = useCustomDialog();

    // input 태그 값 반환용 State
    const [ inputValues, setInputValues ] = useState({});

    // Store show 값 변경 리스너
    useEffect(() => {
       if(state.show) {
           beforeShowDialog();
           dialogRef.current.showModal();
       } else if(!state.show) {
           dialogRef.current.close();
           postCloseDialog();
       }
    }, [state.show]);

    const beforeShowDialog = () => {

    }

    const postCloseDialog = () => {
        setInputValues({});
    }

    const onConfirmClick = () => {
        if(state.dtype === "Input") {
            onCloseDialog(inputValues);
        }
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

    const InputComponent = (p) => {
        const [value, setValue] = useState('');
        const [show, setShow] = useState(false);

        const onChangeInput = (e) => {
            setValue(e.target.value);
            if(p.onChange) {
                p.onChange(value, p.index);
            }
        }

        const toggleShow = () => {
            setShow(!show);
        }

        return (
            p.type === "password" ?
                <div className={styles.inputDiv}>
                    <input className={styles.input} type={show ? "text" : "password"} value={value} onChange={onChangeInput} index={p.index} placeholder={p.placeholder}/>
                    <span className={styles.hideButton} onClick={toggleShow}><img src={show ? EyeIcon : HiddenIcon} className={styles.hideImage}/></span>
                </div> :
                <div className={styles.inputDiv}>
                    <input className={styles.input} type="text" value={value} onChange={onChangeInput} index={p.index} placeholder={p.placeholder}/>
                </div>
        );
    }

    const InputListComponent = (p) => {
        const result = [];

        const onChangeInput = (value, index) => {
            inputValues[index] = value;
        };

        for(let i = 0;i < state.inputData?.length;i++) {
            if(state.inputData[i].hasOwnProperty('hr') && state.inputData[i].hr) {
                result.push(<hr className={styles.hr}/>);
                continue;
            }

            result.push(<InputComponent type={state.inputData[i].type ? state.inputData[i].type : "text"}
                        placeholder={state.inputData[i].placeholder ? state.inputData[i].placeholder : ""} index={i}
                        onChange={onChangeInput}/>);
        }

        return (<div className={styles.inputList}>
            {result}
        </div>);
    }


    const YesNoButtonComponent = (props) => {
        return (
            <div className={styles.buttonDiv}>
                <button className={MultiClassName([styles.buttons, styles.white])} onClick={onCancelClick}>
                    {state.buttonText[0]}
                </button>
                <button className={MultiClassName([styles.buttons, styles.mainColor])} onClick={onConfirmClick}>
                    {state.buttonText[1]}
                </button>
            </div>
        );
    }

    const OkButtonComponent = () => {
        return (
            <div className={styles.buttonDiv}>
                <button className={styles.buttons} onClick={onConfirmClick}>{state.buttonText[0]}</button>
            </div>
        );
    };

    const DescComponent = () => {
        return (
            <div className={styles.descDiv}>
                <span className={styles.descText}>{state.desc}</span>
            </div>
        );
    };

    const DefaultDialog = () => {
        return (
            <div className={styles.innerDialog}>
                <div className={styles.header}> {/* Header */}
                    {state.folderName && <FolderElement />}
                    <span className={styles.title}>{state.title}</span>
                </div>
                {
                    {
                        "Alert": <div> <DescComponent /> <OkButtonComponent /> </div>,
                        "Confirm": <div> <DescComponent /> <YesNoButtonComponent /> </div>,
                        "Input": <div> <InputListComponent /> <YesNoButtonComponent /> </div>
                    }[state.dtype]
                }
            </div>
        );
    }

    const ListDialog = () => {
        const data = () => {
            const result = []
            for(let i = 0;i < state.listData.length;i++) {
                result.push(
                    <li onClick={() => state.onClickItem(state.listData[i].folder_num)}>
                        {state.listData[i].name}
                    </li>
                )
            }
            return result;
        }

        return (
            <div className={styles.innerDialog}>
                <ul>
                    {data()}
                </ul>
                <button onClick={onCancelClick}>닫기</button>
            </div>
        );
    }

    const FolderDialog = () => {
        const [optionIdx, setOptionIdx] = useState(0);

        const colors = ["#FF8B8B", "#FFBB8B", "#FFE58B", "#8CEA8F", "#82B5F2", "#7A7EE4", "#C58BFF", "#A3A3A3"]
        const colorList = [];

        const colorClick = (idx) => {
            setOptionIdx(idx);
        }

        colors.forEach((color, index) => {
            colorList.push((
                <li className={styles.colorCircle} style={{backgroundColor: color}} onClick={() => colorClick(index)}>
                    {optionIdx == index && <img src={CheckIcon} /> }
                </li>
            ))
        })

        return (
            <div className={styles.innerDialog}>
                <div className={styles.header}>
                    {state.folderName && <FolderElement />}
                    <span className={styles.title}>수정하기</span>
                </div>
                <div className={styles.imgDiv}>
                    <img src={LinkiveLogo} width={240} height={240}/>
                </div>
                <div>
                    <span className={styles.colorDesc}>썸네일 색상 선택</span>
                    <ul className={styles.horizontalUl}>{colorList}</ul>
                </div>
                <YesNoButtonComponent />
            </div>
        )
    }

    const DialogComponent = memo(() => (
        <dialog className={styles.dialog} ref={dialogRef}>
            {
                {
                    "Alert": <DefaultDialog />,
                    "Confirm": <DefaultDialog />,
                    "Input": <DefaultDialog />,
                    "List": <ListDialog />,
                    "Folder": <FolderDialog />
                }[state.dtype]
            }
        </dialog>
    ));

    return createPortal(<DialogComponent />, rootDialog);
}

export default memo(CustomDialog);