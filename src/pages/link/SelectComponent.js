import {useEffect, useState} from "react";
import styles from "./css/SelectComponent.module.css";

const SelectComponent = (props) => {
    const Options = () => {
        let data = [];

        for(let i in props.options){
            data.push(<option value={i}>{props.options[i]}</option>);
        }

        return data;
    }


    return (
        <div className={props.styles}>
                <select className={((props.selectStyles) ? props.selectStyles : styles.select)} onChange={props.onChange} value={props.value}>
                    <Options />
                </select>
        </div>
    )
};

export default SelectComponent;