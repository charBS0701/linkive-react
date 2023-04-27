import "../../css/customView/ViewAddress.css";

function ViewAddress() {

    return (
        <div className="viewAddressBorder">
            <img 
                className="viewAddressImage"
                src="image/ic_address.png"
            />
            <input
                className="viewAddress"
                placeholder="주소 추가"
            />
            <img
                className="viewAddAddressImage"
                src="image/ic_add_address.png"
                />
            <img
                className="viewAddressTrash"
                src="image/ic_trash.png"    
            />
        </div>
    )
}

export default ViewAddress;