import styles from './css/FolderListButton.module.css';
import arrowDown from '../../../contents/arrow_down.png';

import useCustomDialog from '../../../hooks/useCustomDialog';

import axios from "axios";
import {getTokens} from "../../../utils/getTokens";
import {useNavigate} from "react-router-dom";

function FolderChangeButton(props) {
    const { list, onCloseDialog } = useCustomDialog();
    const navigate = useNavigate();

    const showList = async () => {
        const res = await axios.post('/api/folders', {}, {headers: getTokens()});
        const folderList = res.data.folderList;
        console.log(folderList);
        const result = await list(folderList, (num) => {
            navigate(`/link/folder/${num}`);
            onCloseDialog();
        });
    }

    return (
        <span className={styles.frame} onClick={() => showList()}>
            <span className={styles.folderName}>{props.folderName}</span>
            <img src={arrowDown} width={15}/>
        </span>
    )
}

export default FolderChangeButton;