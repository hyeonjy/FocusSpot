import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchResults from '../components/SearchResults';
import Search from '../components/Search';

const Map2 = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [activeFilter, setActiveFilter] = useState('전체');
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);
  const infowindow = useRef(new window.kakao.maps.InfoWindow({ zIndex: 1 }));

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (map && currentLocation) {
      fetchPlaces();
    }
  }, [currentLocation, activeFilter]);

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

  const fetchPlaces = () => {
    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();
    const keywords = activeFilter === '전체' ? ['스터디카페', '카페', '도서관'] : [activeFilter];
    const bounds = new kakao.maps.LatLngBounds();

    clearMarkers();

    const promises = keywords.map(
      (keyword) =>
        new Promise((resolve) => {
          ps.keywordSearch(
            keyword,
            (data, status) => {
              if (status === kakao.maps.services.Status.OK) {
                resolve(data);
              } else {
                resolve([]);
              }
            },
            { location: currentLocation, radius: 5000 }
          );
        })
    );

    Promise.all(promises).then((results) => {
      const allPlaces = results.flat();
      const allMarkers = allPlaces.map((place) => createMarker(place, bounds));
      setPlaces(allPlaces);
      setMarkers(allMarkers);

      if (!bounds.isEmpty()) {
        map.setBounds(bounds);
      } else {
        alert('검색된 결과가 없습니다.');
      }
    });
  };

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
