import styled from "styled-components";
import palette from "../../styles/colorPalette";

const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.2);
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;

`;

const Container = styled.div`
    width: 346px;
    height: 184px;

    display: flex;
    flex-direction: column;
    background: ${palette.white};

    border-radius: 10px;
`;

const TopContainer = styled.div`
    width: 100%;
    height: 47px;
    background: ${palette.mainColor};
    display: flex;
    align-items: center;

    border-radius: 10px 10px 0px 0px;
`;

const TopContainerText = styled.div`
    margin-left: 28px;
    font-size: 16px;
    color: ${palette.white};
    font-family: 'NanumSquare_acR';
`;

const TextDelete = styled.div`
    width: 100%;

    padding-left: 28px;
    padding-top: 25px;

    // display: flex;
    // flex-direction : row;
    font-family: 'NanumSquare_acR';
    font-size: 13px;
`;

const BottomContainer = styled.div`
    width: 100%;
    
    display: flex;
    margin-top: 45px;
    justify-content: center;
`;

const BtnCancle = styled.button`
    box-sizing: border-box;

    width: 92.95px;
    height: 31px;

    background: ${palette.white};
    border: 1px solid #6368E3;
    border-radius: 30px;
    color: ${palette.mainColor};
    font-family: 'NanumSquare_acR';
    font-size: 16px;

    margin-right: 33px;
`;

const BtnConfirm = styled.button`
    box-sizing: border-box;

    width: 92.95px;
    height: 31px;

    background: ${palette.mainColor};
    border: 1px solid #6368E3;
    border-radius: 30px;
    color: ${palette.white};
    font-family: 'NanumSquare_acR';
    font-size: 16px;
`;

const DeleteLinkModal = () => {

    return (
        <BackgroundContainer>
            <Container>
                <TopContainer>
                    <TopContainerText>삭제하기</TopContainerText>
                </TopContainer>
                <TextDelete>해당 링크 페이지를 영구적으로 삭제하시겠습니까?</TextDelete>
                <BottomContainer>
                    <BtnCancle>취소</BtnCancle>
                    <BtnConfirm>확인</BtnConfirm>
                </BottomContainer>
            </Container>
        </BackgroundContainer>
    );
};

export default DeleteLinkModal;