import React, {useCallback} from 'react';
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
import EditImage from "../contents/item_image.png";

// Functions
import useCustomDialog from "../hooks/useCustomDialog";
import { DialogDispatch } from "../App";
import MultiClassName from "../utils/MultiClassName";
import axios from "axios";
import {getTokens} from "../utils/getTokens";

function CustomDialog() {
    const rootDialog = document.getElementById("dialog");
    const dialogRef = useRef(null); // showModal 호출용 Ref

    // Store
    const { state } = useContext(DialogDispatch);

    // Close Dialog Handling
    const { onCloseDialog } = useCustomDialog();

    // input 태그 값 반환용 State
    let inputValues = {};

    const setInputValues = (values) => {
        inputValues = values;
    }

    // Store show 값 변경 리스너
    useEffect( () => {
       if(state.show) {
           beforeShowDialog();
           dialogRef.current.style.display = "flex";
       } else if(!state.show) {
           dialogRef.current.style.display = "none";
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
            return;
        }
        onCloseDialog(true);
    }

    const onCancelClick = () => {
        onCloseDialog(null);
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
                p.onChange(e.target.value, p.index);
            }
        }

        const toggleShow = () => {
            setShow(!show);
        }

        return (
            p.type === "password" ?
                <div className={styles.inputDiv}>
                    <input className={styles.input} type={show ? "text" : "password"} value={value} onChange={(e) => {onChangeInput(e)}} index={p.index} placeholder={p.placeholder}/>
                    <span className={styles.hideButton} onClick={toggleShow}><img src={show ? EyeIcon : HiddenIcon} className={styles.hideImage}/></span>
                </div> :
                <div className={styles.inputDiv}>
                    <input className={styles.input} type="text" value={value} onChange={(e) => {onChangeInput(e)}} index={p.index} placeholder={p.placeholder}/>
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
            } else if(state.inputData[i].type == "desc") {
                result.push(<DescComponent />);
                continue;
            }

            result.push(<InputComponent type={state.inputData[i].type ? state.inputData[i].type : "text"}
                        placeholder={state.inputData[i].placeholder ? state.inputData[i].placeholder : ""} index={i}
                        onChange={(v, i) => {onChangeInput(v, i)}}/>);
        }

        return (<div className={styles.inputList}>
            {result}
        </div>);
    }


    const YesNoButtonComponent = (props) => {
        return (
            <div className={styles.buttonDiv}>
                <button className={MultiClassName([styles.buttons, styles.white])} onClick={() => {onCancelClick()}}>
                    {state.buttonText[0]}
                </button>
                <button className={MultiClassName([styles.buttons, styles.mainColor])} onClick={() => {onConfirmClick()}}>
                    {state.buttonText[1]}
                </button>
            </div>
        );
    }

    const OkButtonComponent = () => {
        return (
            <div className={styles.buttonDiv}>
                <button className={MultiClassName([styles.buttons, styles.white])} onClick={() => {onConfirmClick()}}>{state.buttonText[0]}</button>
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
                    <li className={styles.folderListLi} onClick={() => state.onClickItem(state.listData[i].folder_num)}>
                        <span className={styles.memoCountCircle}>{(state.listData[i].isLocked) ? "L" : state.listData[i].memoCount}</span>
                        <span>{state.listData[i].name}</span>
                    </li>
                )
                if(i < state.listData.length - 1) {
                    result.push(<hr className={styles.listHr}/>);
                }
            }
            return result;
        }

        return (
            <div className={styles.innerDialog}>
                <div className={styles.header}>
                    <span className={styles.title}>폴더 리스트</span>
                </div>
                <ul className={styles.folderListUl}>
                    {data()}
                </ul>
                <OkButtonComponent />
            </div>
        );
    }

    const FolderDialog = () => {
        const thumbObj = state.folderData.thumbnail;
        const [optionIdx, setOptionIdx] = useState(0);

        const colors = ["#FF8B8B", "#FFBB8B", "#FFE58B", "#8CEA8F", "#82B5F2", "#7A7EE4", "#C58BFF", "#A3A3A3"]
        const colorList = [];
        const fileRef = useRef(null);
        const [thumbImage, setThumbImage] = useState((thumbObj ? `/api/static/${thumbObj}`: LinkiveLogo));

        const colorClick = (idx) => {
            setOptionIdx(idx);
        }

        colors.forEach((color, index) => {
            colorList.push((
                <li className={styles.colorCircle} style={{backgroundColor: color}} onClick={() => colorClick(index)}>
                    {optionIdx == index && <img src={CheckIcon} /> }
                </li>
            ))
        });

        const uploadImage = useCallback((e) => {
            fileRef.current.click();
        }, [])

        const handleOnChange = useCallback((e) => {
            const formData = new FormData();
            formData.append('img', e.target.files[0]);

            axios.post('/api/images/upload', formData, {
                headers:getTokens()
            }).then(res => {
                if(res.status == 200) {
                    setThumbImage(`/api/${res.data.file_info.path}`);
                }
            });
        }, []);

        const onFolderClick = (flag) => {
            if(!flag) {
                onCloseDialog(null);
                return;
            }

            const data = {
                thumbnail: {
                    path: thumbImage,
                    color: optionIdx
                }
            }

            onCloseDialog(data);
        }

        return (
            <div className={styles.innerDialog}>
                <div className={styles.header}>
                    {state.folderName && <FolderElement />}
                    <span className={styles.title}>수정하기</span>
                </div>
                <div className={styles.imgDiv}>
                    <img src={thumbImage} width={240} height={240}/>
                    <span className={styles.editImageButton} onClick={uploadImage}>
                        <img src={EditImage} width={35}/>
                        <input type={"file"} style={{display: "none"}} ref={fileRef} onChange={handleOnChange} accept={"image/*"}/>
                    </span>
                </div>
                <div>
                    <span className={styles.colorDesc}>썸네일 색상 선택</span>
                    <ul className={styles.horizontalUl}>{colorList}</ul>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={MultiClassName([styles.buttons, styles.white])} onClick={() => {onFolderClick(false)}}>
                        {state.buttonText[0]}
                    </button>
                    <button className={MultiClassName([styles.buttons, styles.mainColor])} onClick={() => {onFolderClick(true)}}>
                        {state.buttonText[1]}
                    </button>
                </div>
            </div>
        )
    }

    const DialogComponent = memo(() => (
        <div className={styles.preventClick} ref={dialogRef}>
            <div className={styles.dialog} >
                {
                    {
                        "Alert": <DefaultDialog />,
                        "Confirm": <DefaultDialog />,
                        "Input": <DefaultDialog />,
                        "List": <ListDialog />,
                        "Folder": <FolderDialog />
                    }[state.dtype]
                }
            </div>
        </div>
    ));

    return createPortal(<DialogComponent/>, rootDialog);
}

export default CustomDialog;