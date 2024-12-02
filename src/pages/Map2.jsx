import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchResults from '../components/SearchResults';
import Search from '../components/Search';

const Map2 = () => {
  // 지도, 마커, 장소, 활성 필터, 현재 위치를 관리하기 위한 상태 변수
  const [map, setMap] = useState(null); // Kakao 지도 인스턴스
  const [markers, setMarkers] = useState([]); // 마커 인스턴스를 저장하는 배열
  const [places, setPlaces] = useState([]); // 장소 검색 결과를 저장하는 배열
  const [activeFilter, setActiveFilter] = useState('전체'); // 장소 카테고리 필터
  const [currentLocation, setCurrentLocation] = useState(null); // 현재 위치
  const mapRef = useRef(null);
  const infowindow = useRef(new window.kakao.maps.InfoWindow({ zIndex: 1 }));

  // 컴포넌트가 처음 렌더링될 때 지도 초기화
  useEffect(() => {
    initializeMap();
  }, []);

  // 현재 위치나 필터가 변경될 때 장소 데이터 다시 가져오기
  useEffect(() => {
    if (map && currentLocation) {
      fetchPlaces();
    }
  }, [currentLocation, activeFilter]);

  // 지도 초기화 함수
  const initializeMap = () => {
    const kakao = window.kakao;
    const container = mapRef.current;
    const defaultCenter = new kakao.maps.LatLng(37.566826, 126.9786567);
    const options = { center: defaultCenter, level: 3 };

    const createdMap = new kakao.maps.Map(container, options);
    setMap(createdMap);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPos = new kakao.maps.LatLng(latitude, longitude);
        setCurrentLocation(currentPos);
        createdMap.setCenter(currentPos);
      },
      () => {
        alert('위치정보 가져오기 실패: 위치 권한을 켜주세요.');
        setCurrentLocation(defaultCenter);
        createdMap.setCenter(defaultCenter);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // 장소 데이터를 가져오는 함수
  const fetchPlaces = () => {
    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();
    const keywords = activeFilter === '전체' ? ['스터디카페', '카페', '도서관'] : [activeFilter];
    const bounds = new kakao.maps.LatLngBounds(); // 검색 결과의 범위를 지정할 Bounds

    clearMarkers(); // 기존 마커 삭제

    // 키워드별로 검색을 실행하고 모든 결과를 병합
    const promises = keywords.map(
      (keyword) =>
        new Promise((resolve) => {
          ps.keywordSearch(
            keyword,
            (data, status) => {
              if (status === kakao.maps.services.Status.OK) {
                resolve(data); // 검색 결과를 resolve
              } else {
                resolve([]); // 결과가 없을 경우 빈 배열
              }
            },
            { location: currentLocation, radius: 5000 } // 검색 옵션: 현재 위치 기준 반경 5km
          );
        })
    );

    // 모든 키워드 검색 결과 처리
    Promise.all(promises).then((results) => {
      const allPlaces = results.flat(); // 모든 검색 결과를 하나의 배열로 병합
      const allMarkers = allPlaces.map((place) => createMarker(place, bounds)); // 검색 결과로 마커 생성
      setPlaces(allPlaces);
      setMarkers(allMarkers);

      if (!bounds.isEmpty()) {
        map.setBounds(bounds); // 검색 결과를 기준으로 지도 범위 설정
      } else {
        alert('검색된 결과가 없습니다.');
      }
    });
  };

  // 마커를 생성하는 함수
  const createMarker = (place, bounds) => {
    const kakao = window.kakao;
    const markerPosition = new kakao.maps.LatLng(place.y, place.x);
    const marker = new kakao.maps.Marker({ map, position: markerPosition });

    kakao.maps.event.addListener(marker, 'click', () => {
      infowindow.current.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
      infowindow.current.open(map, marker);
    });

    bounds.extend(markerPosition);
    return marker;
  };

  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  console.log('markers: ', markers);

  // 필터 변경 핸들러
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <StContainer>
      <StMap ref={mapRef}></StMap>
      <Search activeFilter={activeFilter} handleFilterClick={handleFilterClick} />
      <SearchResults places={places} />
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

const StMap = styled.div`
  flex: 1;
`;
