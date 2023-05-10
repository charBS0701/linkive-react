import {useState} from "react";
import styles from "./css/SelectComponent.module.css";

const SelectComponent = (props) => {
    const [selectValue, setSelectValue] = useState();

    const selectOnChange = (e) => {
        setSelectValue(e.target.value);
        if(props.onChange) {
            props.onChange(e.target.value);
        }
    }

    return (
        <div className={styles.selectDiv}>
            <label>
                <select className={styles.select} onChange={selectOnChange} value={selectValue}>
                    <option value={"create"}>생성순</option>
                    <option value={"name"}>이름순</option>
                </select>
            </label>
        </div>
    )
};

export default SelectComponent;