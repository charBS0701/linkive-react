import SearchIcon from '../../contents/search_icon.png';
import styles from './css/SearchComponent.module.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchComponent(props) {
    const [text, setText] = useState((props.default ? props.default : ''));
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setText(e.target.value);
    }

    const onKeyDownHandler = (e) => {
        if(e.key == "Enter") {
            if(text.length < 1) {
                alert("검색어를 입력해주세요.");
                return;
            }
            navigate(`/link/search?keyword=${text}`);
        }
    }

    return (
        <div className={styles.searchBox}>
            <img className={styles.searchIcon} src={SearchIcon} alt={"Search Icon"} width={20}/>
            <input className={styles.keywordField} type={"text"} placeholder={"검색어를 입력해주세요."}
                value={text} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
        </div>
    )
}

export default SearchComponent;
