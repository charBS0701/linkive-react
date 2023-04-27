import "../../css/customView/ViewCheck.css";
import React, { useState } from "react";

const autoResizeTextarea = (e) => {
    let textarea = document.querySelector('.viewCheckContent');
  
    if (textarea) {
      textarea.style.height = 'auto';
      let height = textarea.scrollHeight; // 높이
      textarea.style.height = `${height}px`;
    }
};

function ViewCheck() {
    
    const [isChecked, setIsChecked] = useState(false);

    const checkHandler = ({ target }) => {
        let textarea = document.querySelector('.viewCheckContent');

        setIsChecked(!isChecked);
        if (!isChecked){
            textarea.style.color = "#9B9B9B";
        }
        else {
            textarea.style.color = "#000000";
        }
    }


    return (
        <div className="viewCheckBorder">
            <input
                id="viewCheck"
                className="viewCheckIcon"
                type="checkbox"
                checked={isChecked} onChange={(e) => checkHandler(e)}/>
            <label for="viewCheck"/>
            <textarea
                className="viewCheckContent"
                placeholder="글을 입력해주세요."
                onChange={autoResizeTextarea}/>
        </div>
    )
}

export default ViewCheck;