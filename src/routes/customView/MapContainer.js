import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/colorPalette';

const StyledResultBorder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 48px;
`;

const StyledResultMap = styled.div`
  height: 400px;
  grid-columns: 1/2;
`;

const StyledResultList = styled.div`
  height: 400px;
  grid-columns: 2/3;
  overflow: auto;
  overflow-x:hidden;

  border: solid ${palette.mainColor} 2px;
  box-sizing: border-box;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-family: 'NanumSquare_acR';
`;

const StyledResultItemBtn = styled.button`
  // 버튼의 모든 속성 초기화
  all: unset; 
  cursor: pointer;
`;

const StyledResultItem = styled.div`
  padding-left: 20px;
  margin-top: 15px;
  margin-bottom : 15px;
`;

const StyledItemName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StyledItemAddr = styled.div`
  font-size: 15px;
  margin-left: 10px;
`;

const StyledItemAddrItem = styled.div`
  margin-bottom: 3px;
`;

const StyledItemLine = styled.div`
  border-bottom: solid #D9D9D9 1px;
`;

const StyledResultPageNum = styled.div`
  color: black;
  font-size: 20px;
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;


const { kakao } = window

const MapContainer = ({ searchPlace, onResultItemClick }) => {

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchPlace, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
        setPlaces(data)
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('StyledResultPageNum')
        el.style = "margin: 0 10px"
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      // 지도의 마커 눌렀을 때 뜨는 주소
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
  }, [searchPlace])

  return (
    <StyledResultBorder>
      <StyledResultMap id="myMap" />
      <StyledResultList id="result-list">
        {Places.map((item, i) => (
          <div>
            <StyledResultItemBtn onClick={() => onResultItemClick(item.road_address_name, item.address_name)}>
              <StyledResultItem key={i} >
                {/* <span>{i + 1}</span> 주소 인덱스 번호 */}
                <StyledItemName>{item.place_name}</StyledItemName> {/* 주소 이름 */}
                {item.road_address_name ? (
                  <StyledItemAddr>
                    <StyledItemAddrItem>도로명 주소 : {item.road_address_name}</StyledItemAddrItem> {/* 도로명 주소 */}
                    <StyledItemAddrItem>지번 주소 : {item.address_name}</StyledItemAddrItem> {/* 지번 주소 */}
                  </StyledItemAddr>
                ) : (
                  <StyledItemAddr>{item.address_name}</StyledItemAddr> /* 지번 주소 */
                )}
                {/* <span>{item.phone}</span> 주소지의 전화번호 */}
              </StyledResultItem>
            </StyledResultItemBtn>
            <StyledItemLine/>
          </div>
        ))}
        <StyledResultPageNum id="pagination"/>
      </StyledResultList>
    </StyledResultBorder>
  )
}

export default MapContainer