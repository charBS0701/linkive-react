import React, { useState } from "react";
import WithdrawModal from "./WithdrawModal";
import Btn from "./Btn";

const WithdrawButton = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleWithdraw = () => {
    // 탈퇴확인 모달창 띄우기
    setModalIsOpen(true);
  };

  const handleClose = () => {
    // 탈퇴확인 모달창 닫기
    setModalIsOpen(false);
  };

  return (
    <>
      <Btn onClick={handleWithdraw}>탈퇴하기</Btn>
      {modalIsOpen && (
        <WithdrawModal isOpen={handleWithdraw} onClose={handleClose} onLogout={props.onLogout}/>
      )}
    </>
  );
};

export default WithdrawButton;
