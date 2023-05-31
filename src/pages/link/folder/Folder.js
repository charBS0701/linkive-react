import SearchComponent from "../SearchComponent";
import SelectComponent from "../SelectComponent";

import styles from './css/Folder.module.css';

function Folder() {
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
      </div>
    );
}

export default Folder;