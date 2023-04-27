import "../../css/customView/ViewImage.css";

function ViewImage() {
    return (
        <div className="viewImageBorder">
            <img 
                className="viewImage"
                src="image/img_viewimage.png"
                />
            <div className="viewImageEditBorder">
                <img 
                    className="viewImageEditImage"
                    src="image/ic_viewimage_edit.png"
                />
                <div 
                    className="viewImageEditLine"
                />
                <img
                    className="viewImageTrashImage"
                    src="image/ic_trash.png"    
                />
            </div>
        </div>
    )
}

export default ViewImage;