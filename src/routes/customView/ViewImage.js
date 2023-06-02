import { useState, useRef } from "react";
import styled from "styled-components";
import palette from "../../styles/colorPalette";

const StyledBorder = styled.div`
    width: 400px;
    object-fit: contain;
    border-radius: 10px;
`;

const StyledAdd = styled.div`
    width: 100%;
    height: 400px;
    background-color: ${palette.lightGray};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
`;

const StyledAddImage = styled.img`
    width : 55px;
    height: 55px;
`;

const StyledAddText = styled.div`
    font-family: 'NanumSquare_acR';
    color: ${palette.darkGray};
    font-size: 17px;
    margin-top: 10px;
`;


const StyledAddInput = styled.input`
    display: none;
`;

const StyledAddBtn = styled.button`
    margin-top: 13px;
    border: none;
    background: none;
`;

const StyledAddBtnImage = styled.img`
    width: 46px;
    height: 46px;
`;

const StyledEditBorder = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const StyledImage = styled.img`
    width: 100%;
`;

const StyledEditMenu = styled.div`
    width: 121px;
    height: 49px;
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 18px;
    margin-right: 21px;
    border: 1px solid #6368E3;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: space-between; /* 수평축 정렬 */
    align-items: center; /* 수직축 정렬 */
`;

const StyledEditMenuEditImg = styled.img`
    width: 30px;
    height: 30px;
`;

const StyledEditMenuEditBtn = styled.button`
    width: 50%;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-left: 17px;
`;

const StyledEditMenuLine = styled.div`
    display: inline;
    border-left: 1px solid #777777;
    height: 100%;
`;

const StyledEditMenuTrashBtn = styled.button`
    border: none;
    background: none;
    margin: 0;
    // margin-right: 14px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledEditMenuTrashImage = styled.img`
    width: 32px;
    height: 32px;
`;

const ViewImage = () => {
    
    //모드
    const [mode, setMode] = useState("add");

    // const AddInputRef = useRef<HTMLInputElement>(null);
    const AddInputRef = useRef(null);
    const [image, setImage] = useState(null);

    const handleClickFileInput = () => {
        AddInputRef.current?.click();
    };

    const uploadImage = (e) => {
        const fileList = e.target.files;
        // const length = fileList? fileList.length : 0;/
        if ( fileList && fileList[0]) {
            const url = URL.createObjectURL(fileList[0]);

            setImage({
                file: fileList[0],
                thumbnail: url,
                type: fileList[0].type.slice(0, 5),
            });
            setMode("edit");
        }
    };

    let content = null;
    if (mode === "add"){
        content =
            <StyledBorder>
                <StyledAdd>
                    <StyledAddImage src="image/img_viewimage_image.png"/>
                    <StyledAddText>사진 추가</StyledAddText>
                    <StyledAddInput type="file" accept="image/jpg, image/jpeg, image/png" 
                        ref={AddInputRef} onChange={uploadImage} />
                    <StyledAddBtn type = "button" onClick={handleClickFileInput}>
                        <StyledAddBtnImage src="image/ic_add_view.png"/>
                    </StyledAddBtn>
                </StyledAdd>
            </StyledBorder>

    }
    // edit 모드
    else if (mode === "edit"){
        content = 
            <StyledBorder>
                <StyledEditBorder>
                    <StyledImage src={image.thumbnail}/>
                    <StyledEditMenu>
                        <StyledAddInput type="file" accept="image/jpg, image/jpeg, image/png" 
                            ref={AddInputRef} onChange={uploadImage} />
                        <StyledEditMenuEditBtn type = "button" onClick={handleClickFileInput}>
                            <StyledEditMenuEditImg src="image/ic_viewimage_edit.png"/>
                        </StyledEditMenuEditBtn >
                        <StyledEditMenuLine/>
                        <StyledEditMenuTrashBtn>
                            <StyledEditMenuTrashImage src="image/ic_trash.png"/>
                        </StyledEditMenuTrashBtn>
                </StyledEditMenu>
                </StyledEditBorder>
            </StyledBorder>
    }
    //view 모드
    else if (mode === "view"){
        content = 
            <StyledBorder>
                <StyledImage src="image/img_viewimage.png"/>
            </StyledBorder>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default ViewImage;