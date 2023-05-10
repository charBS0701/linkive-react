import { memo } from 'react'

import styles from './css/ButtonComponent.module.css';
import MultiClassName from "../../utils/MultiClassName";

function ButtonComponent(props) {
    return (
        (props.selected) ?
            <button className={MultiClassName([styles.button, styles.selectedColor])} onClick={props.onClick}>
                {props.text}
            </button> :
            <button className={MultiClassName([styles.button, styles.defaultColor])} onClick={props.onClick}>
                {props.text}
            </button>
    );
}

export default memo(ButtonComponent);