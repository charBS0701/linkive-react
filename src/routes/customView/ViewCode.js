import "../../css/customView/ViewCode.css";

const autoResizeTextarea = (e) => {
    let textarea = document.querySelector('.viewCode');
    let background = document.querySelector('.viewCodeBorder');
  
    if (textarea) {
        textarea.style.height = 'auto';
        let height = textarea.scrollHeight; // 높이
        textarea.style.height = `${height}px`;
        if (height>172) {
            background.style.height = 'auto';
        }
        else {
            background.style.height = `${250}px`;
        }
    }
};

function ViewCode() {
    return (
        <div className="viewCodeBorder">
            <div className="viewCodeImageBorder">
                <img 
                    className="viewCodeImage"
                    src="image/ic_code.png"
                />
                <img
                    className="viewCodeTrash"
                    src="image/ic_trash.png"
                />
            </div>
            
            <textarea
                className="viewCode"
                placeholder="코드를 입력하세요."
                onChange={autoResizeTextarea}
            />
            
        </div>
    )
}

export default ViewCode;