import React, { useState } from 'react';
import useKakaoLoader from '../hooks/useKakaoLoader';
import SearchSidebar from '../components/SearchSidebar';
import AddressList from '../components/AddressList';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Search from '../components/Search';
import useCurrentLocation from '../hooks/useCurrentLocation';
import useSearchCategories from '../hooks/useSearchCategories';

const Maps = () => {
  const { loading, error } = useKakaoLoader();
  const [activeFilter, setActiveFilter] = useState('전체'); // 장소 카테고리 필터
  const [map, setMap] = useState();
  const currentLocation = useCurrentLocation(); // 초기 현재 위치
  const { markers, places } = useSearchCategories(map, activeFilter, currentLocation);
  const addresses = ['경기도', '부천시 원미구', '상2동']; // NOTE : 임시 현재 주소 데이터

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  if (loading) return <p>지도를 로드 중입니다...</p>;
  if (error) return <p>지도를 로드하는 데 실패했습니다: {error.message}</p>;

  return (
    <>
      <Map
        center={currentLocation.center}
        style={{
          width: '100%',
          height: '100vh'
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`${marker.title}-${index}`}
            position={marker.position}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              size: {
                width: 24,
                height: 35
              }
            }}
            title={marker.title}
          />
        ))}
      </Map>
      <Search activeFilter={activeFilter} handleFilterClick={handleFilterClick} />
      <AddressList addresses={addresses} />
      <SearchSidebar places={places} activeFilter={activeFilter} />
    </>
  );
};

export default Maps;
