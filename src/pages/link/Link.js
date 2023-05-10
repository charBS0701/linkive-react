import ItemComponent from './ItemComponent'
import TestFavicon from '../../contents/favicon_test.png'
import useCustomDialog from "../../hooks/useCustomDialog";
import SearchComponent from "./SearchComponent";
import ButtonComponent from "./ButtonComponent";
import AddFolderComponent from "./AddFolderComponent";
import Header from "../home/Header";

import styles from "./css/Link.module.css";

function Link() {
    const { confirm } = useCustomDialog();

    const itemList = (count) => {
        let data = [];

        for (let i = 0; i < count; i++) {
            data.push(
                <ItemComponent
                    src={"/images/img.png"}
                    title={"롯데월드"}
                    favicon={TestFavicon}
                    folder={"놀이공원"}
                    linkNumber={i}
                />
            );
        }
        return data;
    };

    const HeaderComponent = () => {
        return (
            <div className={styles.onlyMargin}>
                <SearchComponent />
                <AddFolderComponent />
            </div>
        )
    }

    return (
        <div>
            <HeaderComponent />
            <div className={styles.onlyMargin}>
                <ButtonComponent text={"링크별"}/>
                <ButtonComponent text={"폴더별"} type={"main"}/>
            </div>
            <ul>
                {itemList(8)}
            </ul>
        </div>
    );
}

export default Link;
