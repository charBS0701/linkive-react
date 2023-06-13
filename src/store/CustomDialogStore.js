export const initState = {
    show: false,
    title: "Title",
    desc: "Desc",
    folderName: '',
    dtype: "Alert",
    buttonText: ["닫기"],
    inputData: [],
    resolve: null,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SHOW':
            return {
                ...state,
                show: action.show
            }
        case 'INIT':
            return {
                ...state,
                title: action.title,
                desc: action.desc,
                dtype: action.dtype,
                callback: action.callback
            }
        case 'SET_FOLDER_NAME':
            return {
                ...state,
                folderName: action.folderName
            }
        case 'SET_BUTTON_TEXT':
            return {
                ...state,
                buttonText: action.buttonText
            }
        case 'SET_DESC_TEXT':
            return {
                ...state,
                desc: action.desc
            }
        case 'SET_INPUT_DATA':
            return {
                ...state,
                inputData: action.inputData
            }
        case 'SET_LIST_DATA':
            return {
                ...state,
                listData: action.listData,
                onClickItem: action.onClickItem
            }
        case 'SET_FOLDER_DATA':
            return {
                ...state,
                folderData: action.folderData
            }
        case 'SET_RESOLVE':
            return {
                ...state,
                resolve: action.resolve,
            }
        case 'CLEAR':
            return initState;
        default:
            return state;
    }
}
