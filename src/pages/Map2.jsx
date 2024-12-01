import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchResults from '../components/SearchResults';

const Map2 = () => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [isActive, setIsActive] = useState(false);
  const mapRef = useRef(null);

  const updateToCurrentPosition = (createdMap, createdMarker) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentPos = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

        createdMap.panTo(currentPos);
        createdMarker.setPosition(currentPos);
        createdMarker.setMap(createdMap);
      },
      () => alert('위치정보 가져오기 실패: 브라우저 위치 권한을 켜주세요'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      }
    );
  };

  useEffect(() => {
    const kakao = window.kakao;
    const container = mapRef.current;

    const createdMap = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    });
    const createdMarker = new kakao.maps.Marker();
    setMap(createdMap);
    setMarker(createdMarker);

    updateToCurrentPosition(createdMap, createdMarker);
  }, []);

  const getCurrentPosBtn = () => {
    if (map && marker) {
      updateToCurrentPosition(map, marker);
    }
  };

  return (
    <StContainer ref={mapRef}>
      <StSearchContainer>
        <StLogoBox>
          <StLogo>✎ FOCUS SPOT</StLogo>
          <StLoginButton>로그인</StLoginButton>
        </StLogoBox>
        <StSearchBox>
          <StSearchForm $isActive={isActive} onClick={() => setIsActive(true)} onBlur={() => setIsActive(false)}>
            <StSearchInput placeholder="장소를 검색해주세요." />
            <div style={{ marginRight: '15px' }}>🔍</div>
          </StSearchForm>
          <StButtonGroup>
            <StFilterButton>전체</StFilterButton>
            <StFilterButton>✎ 스터디카페</StFilterButton>
            <StFilterButton>📖 도서관</StFilterButton>
            <StFilterButton>🧋 카페</StFilterButton>
          </StButtonGroup>
        </StSearchBox>
      </StSearchContainer>
      <StMap ref={mapRef}></StMap>
      <SearchResults />
      {/* <CurrentLocationButton onClick={getCurrentPosBtn}>현재 위치</CurrentLocationButton> */}
    </StContainer>
  );
};

export default Map2;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const StSearchContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  background: white;
  border: 1px solid #00115e;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* padding: 20px; */
  width: 400px;
`;

const StSearchBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const StLogoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00115e;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 12px;
  height: 60px;
`;

const StLogo = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const StLoginButton = styled.button`
  border: 1px solid white;
  border-radius: 30px;
  background-color: #00115e;
  padding: 6px 18px;
  font-size: 13px;
  color: white;
  cursor: pointer;
`;

const StSearchForm = styled.form`
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: border-bottom 0.1s ease;

  border-bottom: ${(props) => (props.$isActive ? '1px solid #00115e' : '1px solid #ddd')};
`;

const StSearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 90%;
`;

const StButtonGroup = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const StFilterButton = styled.button`
  background: white;
  border-radius: 50px;
  padding: 10px 15px;
  font-size: 14px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

const StMap = styled.div`
  flex: 1;
`;

const CurrentLocationButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  background-color: tomato;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ff7043;
  }
`;
