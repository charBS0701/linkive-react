import React from 'react';

import { useState } from "react";
import ButtonComponent from "./ButtonComponent";

function OptionsComponent(props) {
    const [selectedIdx, setSelectedIdx] = useState(props.default ? props.default : 0);

    const changeSelect = (index) => {
        if(index === selectedIdx)
            return;

        setSelectedIdx(index);
        props.onChange(index);
    }

    const ButtonUnionComponent = () => {
        const ret = [];

        for(let i = 0;i < props.data.length;i++) {
            ret.push(
                selectedIdx === i ?
                <ButtonComponent text={props.data[i]} value={i} onClick={() => changeSelect(i)} selected/> :
                <ButtonComponent text={props.data[i]} value={i} onClick={() => changeSelect(i)}/>
            );
        }

        return ret;
    };

    return (
        <>
            <ButtonUnionComponent />
        </>
    )
}

export default OptionsComponent;