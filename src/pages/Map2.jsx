import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Map2 = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

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
    <>
      <StContainer ref={mapRef}></StContainer>
      <button style={{ backgroundColor: 'tomato' }} onClick={getCurrentPosBtn}>
        현재 위치
      </button>
    </>
  );
};

export default Map2;

const StContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
