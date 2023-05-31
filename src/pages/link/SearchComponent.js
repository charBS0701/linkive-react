import SearchIcon from '../../contents/search_icon.png';
import styles from './css/SearchComponent.module.css'

function SearchComponent() {
    return (
        <div className={styles.searchBox}>
            <img className={styles.searchIcon} src={SearchIcon} alt={"Search Icon"} width={20}/>
            <input className={styles.keywordField} type={"text"} placeholder={"검색어를 입력해주세요."}/>
        </div>
    )
}

export default SearchComponent;
