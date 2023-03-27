import { DialogDispatch } from "../App";
import { useContext } from "react";

function useCustomDialog() {
    const { state, dispatch } = useContext(DialogDispatch);

    const showModal = () => {
        dispatch({type: "SET_SHOW", show: true})
    };

    const closeModal = () => {
        dispatch({type: "SET_SHOW", show: false});
    }

    const setFolderName = (name) => {
        dispatch({type: "SET_FOLDER_NAME", folderName: name});
    }

    const setButtonText = (texts) => {
        dispatch({type: "SET_BUTTON_TEXT", buttonText: texts})
    }

    const onCloseDialog = (value) => {
        closeModal();
        state.resolve(value);
        dispatch({type: "CLEAR"});
    }

    const alert = (title, text) => {
        dispatch({type: "INIT", title: title, desc: text, dtype: 'Alert'});
        showModal();

        return new Promise((res) => {
            dispatch({type: "SET_RESOLVE", resolve: res});
        });
    }

    const confirm = (title, text) => {
        dispatch({type: "INIT", title: title, desc: text, dtype: 'Confirm'});
        dispatch({type: "SET_BUTTON_TEXT", buttonText: ["취소", "확인"]})
        showModal();

        return new Promise((res) => {
            dispatch({type: "SET_RESOLVE", resolve: res});
        });
    }

    return { dispatch, alert, confirm, setFolderName, setButtonText, onCloseDialog };
}

export default useCustomDialog;