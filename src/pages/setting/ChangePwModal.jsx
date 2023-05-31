import {
  ModalContainer,
  ModalBox,
  ModalTitle,
  ContentBox,
  ModalContent,
} from "./InquireModal";
import Btn from "./Btn";
import InputLine from "./InputLine";
import showPwIcon from "../../contents/showPwIcon.png";

const ChangePwModal = ({ isOpen, close, onOk }) => {
  if (!isOpen) return null;
  return (
    <ModalContainer>
      <ModalBox>
        <ModalTitle>비밀번호 변경</ModalTitle>
        <ContentBox style={{marginBottom:"1%"}}>
          <ModalContent>
            <InputLine style={{marginBottom:"5%"}}
            type="password" placeholder="현재 비밀번호" />
            {/* 비밀번호 보기 <img src={showPwIcon}/> */} 
            <InputLine type="password" placeholder="변경할 비밀번호" />
            <InputLine style={{marginBottom:"5% "}} type="password" placeholder="비밀번호 확인" />
          </ModalContent>
            <Btn style={{marginRight:"10%"}} onClick={close}>취소</Btn>
            <Btn $colored onClick={close}>확인</Btn>
        </ContentBox>
      </ModalBox>
    </ModalContainer>
  );
};

export default ChangePwModal;
