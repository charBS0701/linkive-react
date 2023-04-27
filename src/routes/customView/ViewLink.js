import "../../css/customView/ViewLink.css";

function ViewLink() {
    return (
        <div className="viewLinkBorder">
            <img 
                className="viewLinkImage"
                src="image/ic_link.png"
                />
            <input 
                className="viewLink"
                placeholder="링크 추가" 
            />
            <img
                className="viewLinkTrash"
                src="image/ic_trash.png"    
            />
        </div>
    )
}

export default ViewLink;