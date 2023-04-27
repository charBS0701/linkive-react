import "../../css/customView/ViewText.css";


const autoResizeTextarea = (e) => {
    let textarea = document.querySelector('.viewText');
  
    if (textarea) {
      textarea.style.height = 'auto';
      let height = textarea.scrollHeight; // 높이
      textarea.style.height = `${height}px`;
    }
};

function ViewText() {
    return (
        <div>
            <textarea
                className="viewText"  
                placeholder="글을 입력하세요." 
                onChange={autoResizeTextarea}
                />
        </div>
    )
}



export default ViewText;