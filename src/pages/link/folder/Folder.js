import SearchComponent from "../SearchComponent";
import SelectComponent from "../SelectComponent";

import styles from './css/Folder.module.css';
import ItemListComponent from "./ItemListComponent";
import {useParams} from "react-router-dom";

function Folder() {
    const { num } = useParams();
    const HeaderComponent = () => {
        return (
            <div>
                <SearchComponent />
                <span>
                    글 작성하기
                </span>
            </div>
        );
    };

    return (
      <div>
          <HeaderComponent />
          <div className={styles.toolbar}>
              <SelectComponent />
          </div>
          <ul>
            <ItemListComponent folderNum={num}/>
          </ul>
      </div>
    );
}

export default Folder;