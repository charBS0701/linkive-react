
import React, { useState } from 'react'
import MapContainer from './MapContainer'
import styled from 'styled-components'
import palette from '../../styles/colorPalette';

const StyledAddBorder = styled.div`
  width: auto;
  padding-top: 56px;
  padding-bottom: 36px;
  padding-left: 40px;
  padding-right: 40px;

  /* 점선 넣기 */
  background-image: linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(90deg, #6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%), linear-gradient(#6368E3 50%, transparent 50%);
  background-size: 20px 2px, 20px 2px, 2px 20px, 2px 20px;
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-position: 0 0, 0 100%, 0 0, 100% 0;

  align-items: center; /* 수평 중앙 정렬 */
  justify-content: start;

  /* 테두리 둥글게 */
  border-radius: 5px;
  max-height: 570px;
`;

const StyledAddrInput = styled.input`
  grid-column: 1/3;
  grid-row: 1/2;

  margin-left: 20px;
  font-size: 20px;
  border: none;
  border-bottom: solid ${palette.mainColor} 2px;
  outline: none;
  font-family: 'NanumSquare_acR';
`;

const StyledAddrButton = styled.button`
  grid-column: 1/3;
  grid-row: 1/2;
  background: none;
  border: none;
`;

const StyledAddrButtonImg = styled.img`
  width: 36px;
  height: 39px;
`;

const StyledAddrMap = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
`;

const StyledAddrForm = styled.form`
  margin-bottom: 28px;
`;

const LandingPage = ({ selectedAddress, onSelectedAddress }) => {

  const handleResultItemClick = (roadAddress, address) => {
    // 클릭한 주소 정보를 콜백으로 전달
    onSelectedAddress({ roadAddress, address });
  };


  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
  }

  return (
    <StyledAddBorder>
      <StyledAddrForm className="inputForm" onSubmit={handleSubmit}>
        <StyledAddrInput placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <StyledAddrButton type="submit">
          <StyledAddrButtonImg src='image/ic_done_search.png'/>
        </StyledAddrButton>
      </StyledAddrForm>
      <StyledAddrMap>
        <MapContainer searchPlace={Place} onResultItemClick={handleResultItemClick}/>
      </StyledAddrMap>
    </StyledAddBorder>
  )
}

export default LandingPage

// function LandingPage() {
//   const [InputText, setInputText] = useState('')
//   const [Place, setPlace] = useState('')

//   const onChange = (e) => {
//     setInputText(e.target.value)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setPlace(InputText)
//     setInputText('')
//   }

//   return (
//     <>
//       <form className="inputForm" onSubmit={handleSubmit}>
//         <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
//         <button type="submit">검색</button>
//       </form>
//       <MapContainer searchPlace={Place} />
//     </>
//   )
// }

// export default LandingPage